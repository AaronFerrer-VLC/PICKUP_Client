import ApiService from './api.service'

class UploadServices {
  constructor() {
    const apiService = new ApiService(`${import.meta.env.VITE_APP_API_URL}/api/upload`)
    this.api = apiService.getInstance()
  }

    uploadimage(imageForm) {
        return this.api.post('/image', imageForm)
    }
}

export default new UploadServices()