import { createContext, useEffect, useState, useCallback } from "react"
import authServices from "../services/auth.services"

const AuthContext = createContext()

function AuthProviderWrapper(props) {
  const [loggedUser, setLoggedUser] = useState(null)
  const [isFetchingUser, setIsFetchingUser] = useState(true)

  const loginUser = useCallback((userData) => {
    setLoggedUser(userData)
    setIsFetchingUser(false)
  }, [])

  const logoutUser = useCallback(() => {
    setLoggedUser(null)
    setIsFetchingUser(false)
    localStorage.removeItem('authToken')
    // Remove userId if it exists (security: don't store user data in localStorage)
    localStorage.removeItem('userId')
  }, [])

  const authenticateUser = useCallback(() => {
    const token = localStorage.getItem('authToken')

    if (!token) {
      setIsFetchingUser(false)
      return
    }

    authServices
      .verifyUser(token)
      .then(({ data }) => {
        if (data?.loggedUserData) {
          loginUser(data.loggedUserData)
        } else {
          logoutUser()
        }
      })
      .catch(() => {
        logoutUser()
      })
  }, [loginUser, logoutUser])

  useEffect(() => {
    authenticateUser()
  }, [authenticateUser])

  return (
    <AuthContext.Provider value={{ loggedUser, loginUser, logoutUser, authenticateUser, isFetchingUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProviderWrapper }