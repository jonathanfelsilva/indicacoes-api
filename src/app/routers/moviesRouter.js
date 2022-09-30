const express = require('express')

const moviesController = require('../controllers/moviesController')
const apiErrorHandlerMiddleware = require('../middlewares/apiErrorHandler')

const moviesRouter = new express.Router()

moviesRouter.get('/movies/findById/:id', moviesController.getMovieById, apiErrorHandlerMiddleware)
moviesRouter.get('/movies/genres', moviesController.getGenres, apiErrorHandlerMiddleware)
moviesRouter.get('/movies/recommendation', moviesController.getRecommendationByGenre, apiErrorHandlerMiddleware)
moviesRouter.get('/movies/top-three', moviesController.getDailyTopThree, apiErrorHandlerMiddleware)
moviesRouter.get('/movies/findByTitle', moviesController.getMoviesByTitle, apiErrorHandlerMiddleware)

module.exports = moviesRouter