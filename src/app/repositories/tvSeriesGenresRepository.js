const { tvSeriesGenresCollection } = require('../../database/mongodb-collections')

const insert = async (tvSeriesGenres) => {
    await tvSeriesGenresCollection.insertMany(tvSeriesGenres)
}

const removeAll = async () => {
    await tvSeriesGenresCollection.deleteMany()
}

const find = async (filters = {}) => {
    const tvSeriesGenres = await tvSeriesGenresCollection.find(filters).toArray()
    return tvSeriesGenres
}

module.exports = {
    insert,
    removeAll,
    find
}