const axios = require('axios')

const moviesRepository = require('../repositories/moviesRepository')
const moviesGenresRepository = require('../repositories/moviesGenresRepository')

const { MOVIE_DB_URL, MOVIE_DB_API_KEY } = process.env

const findGenres = async () => {
    const genres = await moviesGenresRepository.find();
    const genresNames = genres.map((genre) => genre?.name)
    return genresNames
}

const findGenresByIds = async (ids) => {
    const genres = await moviesGenresRepository.find({id: {$in: ids}});
    const genresNames = genres.map((genre) => genre.name);
    return genresNames.join(', ')
}

const findRecomendationByGenre = async (genreName) => {
    const genre = await moviesGenresRepository.find({name: genreName})
    const movies = await moviesRepository.find({genre_ids: genre[0]?.id})
    
    const totalNumberOfResults = movies.length
    const randomNumber = (Math.random() * totalNumberOfResults).toFixed(0)

    const recommendation = movies[randomNumber]

    const genres = await findGenresByIds(recommendation.genre_ids)
    recommendation.genres = genres

    return recommendation
}

const updateMoviesDatabase = async (language) => {
    const movies = await _getMovies(language)
    await moviesRepository.removeAll()
    await moviesRepository.insert(movies)

    const moviesGenres = await _getMoviesGenres(language)
    await moviesGenresRepository.removeAll()
    await moviesGenresRepository.insert(moviesGenres)
}


const _getMoviesGenres = async (language) => {
    const path = '/genre/movie/list'
    const completePath = `${MOVIE_DB_URL}${path}?api_key=${MOVIE_DB_API_KEY}&language=${language}`
    const response = await axios.get(completePath)
    return response.data.genres

}

const _getMovies = async (language) => {
    const path = '/movie/top_rated'
    const completePath = `${MOVIE_DB_URL}${path}?api_key=${MOVIE_DB_API_KEY}&language=${language}`

    let movies = []

    let page = 1

    while (movies.length < 600) {
        const response = await axios.get(`${completePath}&page=${page}`)
        const returnedMovies = response.data.results

        const validMovies = []
        
        // Only consider movies with an image. It's a way to see if it's worth it showing them.
        for (let i = 0; i < returnedMovies.length; i++) {
            if(returnedMovies[i].poster_path) {
                validMovies.push(returnedMovies[i])
            }
        }

        movies = movies.concat(validMovies)
        
        page++
    }

    return movies
}

module.exports = {
    findGenres,
    updateMoviesDatabase,
    findRecomendationByGenre,
    findGenresByIds
}