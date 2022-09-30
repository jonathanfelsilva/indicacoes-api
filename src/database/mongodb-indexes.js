class MongoDbIndexes {
    static createIndexes(client) {
        client.db(process.env.NOME_BANCO_MONGODB).createIndex('movies', {genre_ids: 1})
        client.db(process.env.NOME_BANCO_MONGODB).createIndex('tvseries', {genre_ids: 1})
        client.db(process.env.NOME_BANCO_MONGODB).createIndex('movies', {title: 1})
        client.db(process.env.NOME_BANCO_MONGODB).createIndex('tvseries', {name: 1})
    }
}

module.exports = MongoDbIndexes