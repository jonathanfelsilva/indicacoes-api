const randomizerService = require('../services/randomizerService')
const apiResponses = require('../utils/apiResponses')

const getRandomMovieOrTvSerie = async (req, res, next) => {
    try {
        const randomMovieOrTvSerie = await randomizerService.getRandomMovieOrTvSerie()
        const response = apiResponses.getResponse(randomMovieOrTvSerie)

        return res.status(200).send(response)
    } catch (error) {
        next(error)
    } 
}

module.exports = {
    getRandomMovieOrTvSerie
}