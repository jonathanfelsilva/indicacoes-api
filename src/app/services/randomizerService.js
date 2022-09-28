const moviesRepository = require('../repositories/moviesRepository')
const tvSeriesRepository = require('../repositories/tvSeriesRepository')

const moviesService = require('./moviesService')
const tvSeriesService = require('./tvSeriesService')

const axios = require('axios')

const { MOVIE_DB_URL, MOVIE_DB_API_KEY } = process.env

const getRandomMovieOrTvSerie = async () => {
    const movies = await moviesRepository.find()
    const tvSeries = await tvSeriesRepository.find()

    const allResults = movies.concat(tvSeries)
    const totalNumberOfResults = allResults.length

    const randomNumber = (Math.random() * totalNumberOfResults).toFixed(0)

    const recommendation = allResults[randomNumber]
    const type = recommendation.title ? "Filme" : "Série"

    const genres = type === "Filme" 
        ? await moviesService.findGenresByIds(recommendation.genre_ids) 
        : await tvSeriesService.findGenresByIds(recommendation.genre_ids)

    recommendation.genres = genres

    const placesToWatch = await _getListWhereToWatch(recommendation.id, type)
    recommendation.placesToWatch = placesToWatch

    return { type, recommendation }
}

const _getListWhereToWatch = async (id, type) => {
    const path = type === "Filme" ? `/movie/${id}/watch/providers` : `/tv/${id}/watch/providers`
    const completePath = `${MOVIE_DB_URL}${path}?api_key=${MOVIE_DB_API_KEY}`
    const response = await axios.get(completePath)

    const list = response.data.results.BR?.flatrate ? response.data.results.BR?.flatrate : response.data.results.US?.flatrate
    return list
}


module.exports = {
    getRandomMovieOrTvSerie
}