const { moviesCollection } = require('../../database/mongodb-collections')

const insert = async (movies) => {
    await moviesCollection.insertMany(movies)
}

const removeAll = async () => {
    await moviesCollection.deleteMany()
}

const find = async (filters = {}) => {
    const movies = await moviesCollection.find(filters).toArray()
    return movies
}

module.exports = {
    insert,
    removeAll,
    find
}