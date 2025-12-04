import { Container, Row, Col, Button } from 'react-bootstrap'
import { homeCover } from '../../const/image-paths'
import { Link } from 'react-router-dom'
import { useEffect, useState, useContext } from "react"
import { AuthContext } from '../../contexts/auth.context'

import TopCommunitiesList from '../../components/CommunitiesComponents/TopCommunitiesList/TopCommunitiesList'
import MoviesPostersList from '../../components/MovieComponentes/MoviesPostersList/MoviesPostersList'
import CommunitiesList from '../../components/CommunitiesComponents/CommunitiesList/CommunitiesList'
import Loader from '../../components/Loader/Loader'
import CommunityServices from '../../services/community.services'
import ReviewServices from '../../services/review.services'

import "./HomePage.css"

const HomePage = () => {

  const [communities, setCommunities] = useState([])
  const [topCommunities, setTopCommunities] = useState([])
  const [lastReviewedMovies, setLastReviewedMovies] = useState([])
  const [mostReviewedMovies, setMostReviewedMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { loggedUser } = useContext(AuthContext)

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = () => {
    setIsLoading(true)
    setError(null)

    const promises = [
      CommunityServices.fetchCommunities(),
      CommunityServices.fetchMostFollowedCommunities(),
      ReviewServices.getLastReviewedMovies(),
      ReviewServices.getMostReviewedMovies()
    ]

    Promise
      .all(promises)
      .then(([communitiesRes, topCommunitiesRes, lastReviewedMoviesRes, mostReviewedMoviesRes]) => {
        setCommunities(communitiesRes.data || [])
        setTopCommunities(topCommunitiesRes.data || [])
        setLastReviewedMovies(lastReviewedMoviesRes.data || [])
        setMostReviewedMovies(mostReviewedMoviesRes.data || [])
      })
      .catch(err => {
        console.error('Error fetching home page data:', err)
        setError('Error al cargar los datos. Por favor, recarga la página.')
      })
      .finally(() => setIsLoading(false))
  }


  if (isLoading) {
    return <Loader message="Cargando contenido..." />
  }

  if (error) {
    return (
      <div className="HomePage">
        <Container>
          <div className="alert alert-danger mt-4" role="alert">
            {error}
            <Button variant="outline-danger" className="ms-3" onClick={fetchAllData}>
              Reintentar
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="HomePage">
                <Row>
                    <Col className="position-relative" style={{ height: "30rem" }}>
                        <img className="w-100 h-100 object-fit-cover opacity-100" src={homeCover} alt="Home Cover" />
                        <div className="w-100 backgroud-faded-down position-absolute top-0" style={{ height: "30%" }} />
                        <div className="w-100 backgroud-faded-up position-absolute bottom-0" style={{ height: "30%" }} />
                        <div className="p-5 w-100 top-50 start-50 translate-middle position-absolute text-center">
                            <h1 className="text-center fw-bold">Conecta, comparte y crea con cinéfilos de todo el mundo</h1>
                            <p className="text-center fs-5"> La web de cinéfilos para cinéfilos que estábais esperando </p>
                            {
                                !loggedUser && (
                                    <Button className="btn-style-2 border-0 btn-sm fw-bold me-3" as={Link} to="/registro">EMPEZAR</Button>
                                )}
                        </div>
                    </Col>
                </Row>
                <Container>
                    <Row className="mt-3">
                        <Col>
                            <p className="ms-2 mb-4 fs-5 fw-bold">Últimas películas comentadas</p>
                            <MoviesPostersList movies={lastReviewedMovies} />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <p className="ms-2 mb-4 fs-5 fw-bold">Las comunidades más seguidas</p>
                            <TopCommunitiesList communities={topCommunities} />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <p className="ms-2 mb-4 fs-5 fw-bold">Películas más comentadas</p>
                            <MoviesPostersList movies={mostReviewedMovies} />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <p className="ms-2 mb-4 fs-5 fw-bold">Nuestras comunidades de cinéfilos</p>
                            <CommunitiesList communities={communities} />
                        </Col>
                    </Row>
                </Container>
            </div>
    )
}

export default HomePage