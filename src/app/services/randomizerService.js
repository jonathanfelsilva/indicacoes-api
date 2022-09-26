const moviesRepository = require('../repositories/moviesRepository')
const tvSeriesRepository = require('../repositories/tvSeriesRepository')

const moviesService = require('./moviesService')
const tvSeriesService = require('./tvSeriesService')

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

    return { type, recommendation }
}

module.exports = {
    getRandomMovieOrTvSerie
}