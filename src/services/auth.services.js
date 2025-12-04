import ApiService from './api.service'

class AuthServices {
  constructor() {
    const apiService = new ApiService(`${import.meta.env.VITE_APP_API_URL}/api`)
    this.axiosApp = apiService.getInstance()
  }

    signupUser(userData) {
        return this.axiosApp.post('/signup', userData)
    }

    loginUser(userData) {
        return this.axiosApp.post('/login', userData)
    }

    verifyUser(token) {
        return this.axiosApp.get('/verify', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}

export default new AuthServices()