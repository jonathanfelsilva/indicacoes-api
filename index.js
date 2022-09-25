const app = require('./app')

const movieService = require('./src/app/services/moviesService')
const tvSeriesService = require('./src/app/services/tvSeriesService')


const porta = 3730

app.listen(porta, async () => {
    // movieService.updateMoviesDatabase('pt-BR')
    // tvSeriesService.updateTvSeriesDatabase('pt-BR')
    console.log('Aplicação rodando na porta 3730!')
})