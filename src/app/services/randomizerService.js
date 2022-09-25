const moviesRepository = require('../repositories/moviesRepository')
const tvSeriesRepository = require('../repositories/tvSeriesRepository')

const getRandomMovieOrTvSerie = async () => {
    const movies = await moviesRepository.find()
    const tvSeries = await tvSeriesRepository.find()

    const allResults = movies.concat(tvSeries)
    const totalNumberOfResults = allResults.length

    const randomNumber = (Math.random() * totalNumberOfResults).toFixed(0)

    return allResults[randomNumber]
}

module.exports = {
    getRandomMovieOrTvSerie
}