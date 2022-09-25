const express = require('express')

const randomizerController = require('../controllers/randomizerController')
const apiErrorHandlerMiddleware = require('../middlewares/apiErrorHandler')

const randomizerRouter = new express.Router()

randomizerRouter.get('/randomizer', randomizerController.getRandomMovieOrTvSerie, apiErrorHandlerMiddleware)

module.exports = randomizerRouter