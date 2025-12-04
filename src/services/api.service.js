import axios from 'axios'

/**
 * Base API service with authentication interceptor
 * Centralizes axios configuration to avoid code duplication
 */
class ApiService {
  constructor(baseURL) {
    this.axiosApp = axios.create({
      baseURL: baseURL || `${import.meta.env.VITE_APP_API_URL}/api`
    })

    // Add authentication interceptor
    this.axiosApp.interceptors.request.use(
      (config) => {
        const storedToken = localStorage.getItem('authToken')
        if (storedToken) {
          config.headers.Authorization = `Bearer ${storedToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add response interceptor for error handling
    this.axiosApp.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle 401 unauthorized - clear token and redirect to login
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken')
          // Optionally redirect to login page
          if (window.location.pathname !== '/login' && window.location.pathname !== '/registro') {
            window.location.href = '/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  getInstance() {
    return this.axiosApp
  }
}

export default ApiService

