const express = require('express')

const seriesController = require('../controllers/tvSeriesController')
const apiErrorHandlerMiddleware = require('../middlewares/apiErrorHandler')

const seriesRouter = new express.Router()

seriesRouter.get('/tv-series/findById/:id', seriesController.getTvSeriesById, apiErrorHandlerMiddleware)
seriesRouter.get('/tv-series/genres', seriesController.getGenres, apiErrorHandlerMiddleware)
seriesRouter.get('/tv-series/recommendation', seriesController.getRecommendationByGenre, apiErrorHandlerMiddleware)
seriesRouter.get('/tv-series/top-three', seriesController.getDailyTopThree, apiErrorHandlerMiddleware)
seriesRouter.get('/tv-series/findByName', seriesController.getTvSeriesByName, apiErrorHandlerMiddleware)

module.exports = seriesRouter