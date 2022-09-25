const express = require('express')
const cors = require('cors')

const moviesRouter = require('./src/app/routers/moviesRouter')
const seriesRouter = require('./src/app/routers/tvSeriesRouter')
const randomizerRouter = require('./src/app/routers/randomizerRouter')

const app = express()

app.use(express.json())
app.use(cors())

app.use(moviesRouter)
app.use(seriesRouter)
app.use(randomizerRouter)

module.exports = app