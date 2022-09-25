const axios = require('axios')

const tvSeriesRepository = require('../repositories/tvSeriesRepository')
const tvSeriesGenresRepository = require('../repositories/tvSeriesGenresRepository')

const { MOVIE_DB_URL, MOVIE_DB_API_KEY } = process.env

const getGenres = async () => {
    const genres = await tvSeriesGenresRepository.find();
    const genresNames = genres.map((genre) => genre.name)
    return genresNames
}

const findRecomendationByGenre = async (genreName) => {
    const genre = await tvSeriesGenresRepository.find({name: genreName})
    const tvSeries = await tvSeriesRepository.find({genre_ids: genre[0]?.id})
    
    const totalNumberOfResults = tvSeries.length
    const randomNumber = (Math.random() * totalNumberOfResults).toFixed(0)

    return tvSeries[randomNumber]
}

const updateTvSeriesDatabase = async (language) => {
    const tvSeries = await _findTvSeries(language)
    await tvSeriesRepository.removeAll()
    await tvSeriesRepository.insert(tvSeries)

    const genres = await _findTvSeriesGenres(language)
    await tvSeriesGenresRepository.removeAll()
    await tvSeriesGenresRepository.insert(genres)
}

const _findTvSeriesGenres = async (language) => {
    const path = '/genre/tv/list'
    const completePath = `${MOVIE_DB_URL}${path}?api_key=${MOVIE_DB_API_KEY}&language=${language}`
    const response = await axios.get(completePath)
    let genres = response.data.genres

    if (language === "pt-BR") {
        genres = _translateTvSeriesGenres(response.data.genres)
    }

    return  genres
}

const _translateTvSeriesGenres = (genres) => {

    for (let i = 0; i < genres.length; i++) {
        if (genres[i].name === "Action & Adventure") {
            genres[i].name = "Ação e aventura"
        }

        if (genres[i].name === "Kids") {
            genres[i].name = "Infantil"
        }

        if (genres[i].name === "News") {
            genres[i].name = "Notícias"
        }

        if (genres[i].name === "Reality") {
            genres[i].name = "Reality show"
        }

        if (genres[i].name === "Sci-Fi & Fantasy") {
            genres[i].name = "Ficção científica e fantasia"
        }
        
        if (genres[i].name === "Soap") {
            genres[i].name = "Novelas"
        }

        if (genres[i].name === "Talk") {
            genres[i].name = "Talk show"
        }

        if (genres[i].name === "War & Politics") {
            genres[i].name = "Guerras e política"
        }
    }

    return genres
}

const _findTvSeries = async (language) => {
    const path = '/tv/top_rated'
    const completePath = `${MOVIE_DB_URL}${path}?api_key=${MOVIE_DB_API_KEY}&language=${language}`

    let tvSeries = []

    let page = 1

    while (tvSeries.length < 600) {
        const response = await axios.get(`${completePath}&page=${page}`)
        const returnedTvSeries = response.data.results

        const validTvSeries = []
        
        // Only consider tv series with an image. It's a way to see if it's worth it showing them.
        for (let i = 0; i < returnedTvSeries.length; i++) {
            if(returnedTvSeries[i].poster_path) {
                validTvSeries.push(returnedTvSeries[i])
            }
        }

        tvSeries = tvSeries.concat(validTvSeries)
        
        page++
    }

    return tvSeries
}


module.exports = {
    getGenres,
    updateTvSeriesDatabase,
    findRecomendationByGenre
}