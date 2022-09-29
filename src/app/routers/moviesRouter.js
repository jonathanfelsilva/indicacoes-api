const express = require('express')

const moviesController = require('../controllers/moviesController')
const apiErrorHandlerMiddleware = require('../middlewares/apiErrorHandler')

const moviesRouter = new express.Router()

moviesRouter.get('/movies/genres', moviesController.getGenres, apiErrorHandlerMiddleware)
moviesRouter.get('/movies/recommendation', moviesController.getRecommendationByGenre, apiErrorHandlerMiddleware)
moviesRouter.get('/movies/top-three', moviesController.getDailyTopThree, apiErrorHandlerMiddleware)

module.exports = moviesRouter