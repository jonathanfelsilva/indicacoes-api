const MongoClient = require('./mongodb')

const database = MongoClient.db('indicacoes')

module.exports.tvSeriesCollection = database.collection('tvseries')
module.exports.moviesCollection = database.collection('movies')
module.exports.moviesGenresCollection = database.collection('movies-genres')
module.exports.tvSeriesGenresCollection = database.collection('tvseries-genres')
