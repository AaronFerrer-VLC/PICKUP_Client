import ApiService from './api.service'

class ReviewServices {
  constructor() {
    const apiService = new ApiService(`${import.meta.env.VITE_APP_API_URL}/api/reviews`)
    this.axiosApp = apiService.getInstance()
  }

    filterReviews = (query) => {
        return this.axiosApp.get(`/search/${query}`)
    }


    saveReview(reviewData) {
        return this.axiosApp.post('/', reviewData)
    }


    editReview(id, reviewData) {
        return this.axiosApp.put(`/${id}`, reviewData)
    }

    getReviewsDetails(id) {
        return this.axiosApp.get(`/${id}`)
    }

    getAllReviews() {
        return this.axiosApp.get('/')
    }

    getAllReviewsFromMovie(id) {
        return this.axiosApp.get(`/movies/${id}`)
    }

    getLastReviewedMovies() {
        return this.axiosApp.get('/movies')
    }

    getMostReviewedMovies() {
        return this.axiosApp.get('/top/movies')
    }

    getReviewsFromMovie(movieId) {
        return this.axiosApp.get(`/movies/${movieId}`)
    }

    getReviewsFromAuthor(author) {
        return this.axiosApp.get(`/users/${author}`)
    }


    getMostLikedReviews() {
        return this.axiosApp.get('/top')
    }


    deleteReview(id) {
        return this.axiosApp.delete(`/${id}`)
    }


    getOneReview(id) {
        return this.axiosApp.get(`/${id}`)
    }

    likeReview(id, user) {
        return this.axiosApp.put(`/like/${id}`, user)
    }

    dislikeReview(id, reviewData) {
        return this.axiosApp.put(`/dislike/${id}`, reviewData)
    }

    getOneReviewFullData(id) {
        return this.axiosApp.get(`/details/${id}`)
    }

}

export default new ReviewServices()