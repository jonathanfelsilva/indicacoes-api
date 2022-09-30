const tvSeriesService = require('../services/tvSeriesService')
const apiResponses = require('../utils/apiResponses')

const getTvSeriesById = async (req, res, next) => {
    try {
        const tvSeries = await tvSeriesService.findById(req.params.id)
        const response = apiResponses.getResponse(tvSeries)

        return res.status(200).send(response)
    } catch (error) {
        next(error)
    } 
}


const getGenres = async (req, res, next) => {
    try {
        const genres = await tvSeriesService.findGenres()
        const response = apiResponses.getResponse(genres)
        
        return res.status(200).send(response)
    } catch (error) {
        next(error)
    } 
}

const getRecommendationByGenre = async (req, res, next) => {
    try {
        const genre = req.query.genre
        const recommendation = await tvSeriesService.findRecomendationByGenre(genre)
        const response = apiResponses.getResponse(recommendation)

        return res.status(200).send(response)
    } catch (error) {
        next(error)
    } 
}

const getDailyTopThree = async (req, res, next) => {
    try {
        const topThree = await tvSeriesService.getDailyTopThree('pt-BR')
        const response = apiResponses.getResponse(topThree)

        return res.status(200).send(response)
    } catch (error) {
        next(error)
    } 
}

const getTvSeriesByName = async (req, res, next) => {
    try {
        const name = req.query?.name
        const tvSeries = await tvSeriesService.findTvSeriesByName(name)
        const response = apiResponses.getResponse(tvSeries)

        return res.status(200).send(response)
    } catch (error) {
        next(error)
    } 
}

module.exports = {
    getTvSeriesById,
    getGenres,
    getRecommendationByGenre,
    getDailyTopThree,
    getTvSeriesByName
}