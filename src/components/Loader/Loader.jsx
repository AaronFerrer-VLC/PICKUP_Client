import { Spinner } from "react-bootstrap"

/**
 * Loading component with optional message
 * @param {string} message - Optional message to display below the spinner
 */
const Loader = ({ message }) => {
  return (
    <div className="Loader d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <Spinner animation="border" role="status" className="mb-3">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
      {message && <p className="text-muted">{message}</p>}
    </div>
  )
}

export default Loader