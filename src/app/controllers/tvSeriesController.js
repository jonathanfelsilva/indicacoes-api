const seriesService = require('../services/tvSeriesService')
const apiResponses = require('../utils/apiResponses')

const getGenres = async (req, res, next) => {
    try {
        const genres = await seriesService.findGenres()
        const response = apiResponses.getResponse(genres)
        
        return res.status(200).send(response)
    } catch (error) {
        next(error)
    } 
}

const getRecommendationByGenre = async (req, res, next) => {
    try {
        const genre = req.query.genre
        const recommendation = await seriesService.findRecomendationByGenre(genre)
        const response = apiResponses.getResponse(recommendation)

        return res.status(200).send(response)
    } catch (error) {
        next(error)
    } 
}

module.exports = {
    getGenres,
    getRecommendationByGenre
}