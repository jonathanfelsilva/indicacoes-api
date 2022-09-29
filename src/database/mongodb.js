const { MongoClient } = require('mongodb')

const MongoDbIndexes = require('./mongodb-indexes')

const client = new MongoClient(process.env.MONGODB_URL)

client.connect()
    .then(() => {
        MongoDbIndexes.createIndexes(client)
        console.log('Conexão com o MongoDB realizada com sucesso!')
    })
    .catch((erro) => { console.log('Erro - MongoDB: ' + erro) })

module.exports = client