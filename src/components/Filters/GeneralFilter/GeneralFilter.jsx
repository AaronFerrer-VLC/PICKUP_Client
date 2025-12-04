import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Modal, Form, Spinner, Row, Col, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import communityServices from '../../../services/community.services'
import userServices from '../../../services/user.services'
import reviewServices from '../../../services/review.services'
import debounce from 'lodash.debounce'

const GeneralFilter = ({ onResultsFound, setShowFilter }) => {
  const [searchValue, setSearchValue] = useState('')
  const [results, setResults] = useState({
    communities: [],
    users: [],
    reviews: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const fetchData = useCallback(
    debounce(async (query) => {
      if (!query || query.trim().length < 3) {
        setResults({ communities: [], users: [], reviews: [] })
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const [communityResults, userResults, reviewResults] = await Promise.all([
          communityServices.filterCommunities(query),
          userServices.filterUsers(query),
          reviewServices.filterReviews(query),
        ])

        setResults({
          communities: communityResults.data || [],
          users: userResults.data || [],
          reviews: reviewResults.data || [],
        })
      } catch (err) {
        console.error('Search error:', err)
        setError('Error al realizar la búsqueda. Por favor, intenta nuevamente.')
        setResults({ communities: [], users: [], reviews: [] })
      } finally {
        setIsLoading(false)
      }
    }, 300),
    []
  )

  useEffect(() => {
    if (searchValue.length >= 3) {
      fetchData(searchValue)
    } else {
      setResults({ communities: [], users: [], reviews: [] })
    }

    return () => {
      fetchData.cancel?.()
    }
  }, [searchValue, fetchData])

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }

  const handleClick = useCallback((type, id) => {
    const routes = {
      community: `/comunidades/detalles/${id}`,
      user: `/usuarios/${id}`,
      review: `/reviews/${id}`
    }

    const route = routes[type]
    if (route) {
      navigate(route)
      setShowFilter(false)
    }
  }, [navigate, setShowFilter])

  const highlightedResult = useMemo(() => {
    const { communities, users, reviews } = results
    if (communities.length > 0) return { type: 'community', data: communities[0] }
    if (users.length > 0) return { type: 'user', data: users[0] }
    if (reviews.length > 0) return { type: 'review', data: reviews[0] }
    return null
  }, [results])

  return (
    <Modal show={true} onHide={() => setShowFilter(false)} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Buscar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            type="text"
            placeholder="Buscar comunidades, usuarios o reseñas..."
            value={searchValue}
            onChange={handleSearchChange}
            autoFocus
          />
        </Form>
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
        {isLoading ? (
          <div className="d-flex justify-content-center mt-3">
            <Spinner animation="border" />
          </div>
        ) : (
                    <Row className="mt-3">
                        {highlightedResult && (
                            <Col md={6}>
                                <h5>Resultado destacado</h5>
                                <div
                                    className="highlighted-result"
                                    onClick={() =>
                                        handleClick(highlightedResult.type, highlightedResult.data._id)
                                    }
                                    style={{ cursor: 'pointer' }}
                                >
                                    {highlightedResult.type === 'community' && (
                                        <div>
                                            <img
                                                src={highlightedResult.data.cover}
                                                alt={highlightedResult.data.title}
                                                width="100%"
                                                className="mb-2"
                                            />
                                            <h6>{highlightedResult.data.title}</h6>
                                            <p>{highlightedResult.data.description}</p>
                                        </div>
                                    )}
                                    {highlightedResult.type === 'user' && (
                                        <div>
                                            <img
                                                src={highlightedResult.data.avatar || 'default-avatar.png'}
                                                alt={highlightedResult.data.username}
                                                width="100%"
                                                className="mb-2"
                                            />
                                            <h6>{highlightedResult.data.username}</h6>
                                            <p>{highlightedResult.data.bio}</p>
                                        </div>
                                    )}
                                    {highlightedResult.type === 'review' && (
                                        <div>
                                            <h6>{highlightedResult.data.content}</h6>
                                        </div>
                                    )}
                                </div>
                            </Col>
                        )}
                        <Col md={6}>
                            <h5>Otros resultados</h5>
                            <ListGroup>
                                {results.communities.length > 0 && (
                                    <div>
                                        <h6>Comunidades</h6>
                                        {results.communities.slice(1).map((community) => (
                                            <ListGroup.Item
                                                key={community._id}
                                                action
                                                onClick={() => handleClick('community', community._id)}
                                            >
                                                {community.title}
                                            </ListGroup.Item>
                                        ))}
                                    </div>
                                )}
                                {results.users.length > 0 && (
                                    <div>
                                        <h6>Usuarios</h6>
                                        {results.users.slice(1).map((user) => (
                                            <ListGroup.Item
                                                key={user._id}
                                                action
                                                onClick={() => handleClick('user', user._id)}
                                            >
                                                {user.username}
                                            </ListGroup.Item>
                                        ))}
                                    </div>
                                )}
                                {results.reviews.length > 0 && (
                                    <div>
                                        <h6>Reseñas</h6>
                                        {results.reviews.slice(1).map((review) => (
                                            <ListGroup.Item
                                                key={review._id}
                                                action
                                                onClick={() => handleClick('review', review._id)}
                                            >
                                                {review.content}
                                            </ListGroup.Item>
                                        ))}
                                    </div>
                                )}
                            </ListGroup>
                        </Col>
        </Row>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default GeneralFilter

