const moviesService = require('../services/moviesService')
const apiResponses = require('../utils/apiResponses')

const getMovieById = async (req, res, next) => {
    try {
        const movie = await moviesService.findById(req.params.id)
        const response = apiResponses.getResponse(movie)

        return res.status(200).send(response)
    } catch (error) {
        next(error)
    } 
}

const getGenres = async (req, res, next) => {
    try {
        const genres = await moviesService.findGenres()
        const response = apiResponses.getResponse(genres)

        return res.status(200).send(response)
    } catch (error) {
        next(error)
    } 
}

const getRecommendationByGenre = async (req, res, next) => {
    try {
        const genre = req.query?.genre
        const recommendation = await moviesService.findRecomendationByGenre(genre)
        const response = apiResponses.getResponse(recommendation)

        return res.status(200).send(response)
    } catch (error) {
        next(error)
    } 
}

const getDailyTopThree = async (req, res, next) => {
    try {
        const topThree = await moviesService.getDailyTopThree('pt-BR')
        const response = apiResponses.getResponse(topThree)

        return res.status(200).send(response)
    } catch (error) {
        next(error)
    } 
}

const getMoviesByTitle = async (req, res, next) => {
    try {
        const title = req.query?.title
        const movies = await moviesService.findMoviesByTitle(title)
        const response = apiResponses.getResponse(movies)

        return res.status(200).send(response)
    } catch (error) {
        next(error)
    } 
}


module.exports = {
    getMovieById,
    getGenres,
    getRecommendationByGenre,
    getDailyTopThree,
    getMoviesByTitle
}