import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/auth.context"
import Loader from "../components/Loader/Loader"

/**
 * Private route component that protects routes requiring authentication
 * Shows loader while checking authentication, redirects to login if not authenticated
 */
const PrivateRoute = () => {
  const { loggedUser, isFetchingUser } = useContext(AuthContext)

  if (isFetchingUser) {
    return <Loader message="Verificando autenticación..." />
  }

  if (!loggedUser) {
    return <Navigate to="/inicio-sesion" replace />
  }

  return <Outlet />
}

export default PrivateRoute