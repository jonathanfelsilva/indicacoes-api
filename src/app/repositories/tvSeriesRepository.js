const { tvSeriesCollection } = require('../../database/mongodb-collections')

const insert = async (tvSeries) => {
    await tvSeriesCollection.insertMany(tvSeries)
}

const removeAll = async () => {
    await tvSeriesCollection.deleteMany()
}

const find = async (filters = {}) => {
    const tvSeries = await tvSeriesCollection.find(filters).toArray()
    return tvSeries
}

module.exports = {
    insert,
    removeAll,
    find
}