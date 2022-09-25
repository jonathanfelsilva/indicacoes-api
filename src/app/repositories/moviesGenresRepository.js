const { moviesGenresCollection } = require('../../database/mongodb-collections')

const insert = async (moviesGenres) => {
    await moviesGenresCollection.insertMany(moviesGenres)
}

const removeAll = async () => {
    await moviesGenresCollection.deleteMany()
}

const find = async (filters = {}) => {
    const moviesGenres = await moviesGenresCollection.find(filters).toArray()
    return moviesGenres
}

module.exports = {
    insert,
    removeAll,
    find
}