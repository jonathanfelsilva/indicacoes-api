const axios = require('axios')

const moviesRepository = require('../repositories/moviesRepository')
const moviesGenresRepository = require('../repositories/moviesGenresRepository')

const { MOVIE_DB_URL, MOVIE_DB_API_KEY } = process.env

const findById = async(id) => {
    const result = await moviesRepository.find({id: parseInt(id)})
    const movie = result[0]

    const genres = await findGenresByIds(movie.genre_ids)
    movie.genres = genres

    const placesToWatch = await _getListWhereToWatch(id)
    movie.placesToWatch = placesToWatch

    return movie
}

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
    const movies = await moviesRepository.find({genre_ids: genre[0]?.id, vote_average: {$gte: 7.5}})
    
    const totalNumberOfResults = movies.length
    const randomNumber = (Math.random() * totalNumberOfResults).toFixed(0)

    const recommendation = movies[randomNumber]

    const genres = await findGenresByIds(recommendation.genre_ids)
    recommendation.genres = genres

    const placesToWatch = await _getListWhereToWatch(recommendation.id)
    recommendation.placesToWatch = placesToWatch

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

const getDailyTopThree = async (language) => {
    const path = `/movie/popular`
    const completePath = `${MOVIE_DB_URL}${path}?api_key=${MOVIE_DB_API_KEY}&language=${language}`
    const response = await axios.get(completePath)

    const list = response.data.results
    
    const topThree = [list[0], list[1], list[2]]
    

    for (let i = 0; i < topThree.length; i++) {
        const indicacao = await moviesRepository.find({id: topThree[i].id})

        if(indicacao.length === 0) {
            await moviesRepository.insert([topThree[i]])
        }

        const genres = await findGenresByIds(topThree[i].genre_ids)
        topThree[i].genres = genres
    }

    return topThree
}

const findMoviesByTitle = async (title) => {
    const filter = title ? {title: {$regex: new RegExp(title, 'i')}} : {}
    const movies = await moviesRepository.find(filter)

    for (let i = 0; i < movies.length; i++) {
        const genres = await findGenresByIds(movies[i].genre_ids)
        movies[i].genres = genres
    }

    return movies
}

const _getListWhereToWatch = async (movieId) => {
    const path = `/movie/${movieId}/watch/providers`
    const completePath = `${MOVIE_DB_URL}${path}?api_key=${MOVIE_DB_API_KEY}`
    const response = await axios.get(completePath)

    const list = 
        response.data.results.BR?.flatrate ||
        response.data.results.US?.flatrate ||
        response.data.results.BR?.rent ||
        response.data.results.US?.rent ||
        response.data.results.BR?.buy ||
        response.data.results.US?.buy

    return list
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

    while (page <= 300) {
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
        
        console.log(`Buscando filmes. Página atual: ${page}`)

        page++
    }

    return movies
}

module.exports = {
    findById,
    findGenres,
    updateMoviesDatabase,
    findRecomendationByGenre,
    findGenresByIds,
    getDailyTopThree,
    findMoviesByTitle
}