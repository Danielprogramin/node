const esxpress = require('express')

const movies = require('./movies.json')

const app = esxpress()

app.get('/', (req, res) => {
    res.json({ message: 'Hello'})
})

app.get('/movies', (req, res) => {
    const { genre} = req.query
    if (genre){
        const filtereMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filtereMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => id === movie.id)
    if (movie) return res.json(movie)

        res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
    
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => { 
    console.log(`server listening on port http://localhost:${PORT}`)
})