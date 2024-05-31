const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie } = require('./movies')
const { error } = require('node:console')

const app = express()
app.use(express.json())
app.disable('x-powered-by')


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

    const result = validateMovie(req.body)

    if (!result.success) {
        return res.status(404).json({ error: JSON.parse(result.error.message)})
    }

    // en base de datos 
    const newMovie = {
        id: crypto.randomUUID(), // uuid v4
        ...result.data // data
    }

    //esto no es REST, porque estamos guardadrdo
    //el estadoo de la aplicacion en memoria 

    movies.push(newMovie)

    res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {

    const result = validatePartialMovie(req.body)
    
    if (!result.success) {
        return res.status(404).json({ error: JSON.parse(result.error.message)})
    }

    const {id} = req.params
    const movieIndex = movies.findIndex(movie = movie.id === id )

    if (movieIndex === -1){
        return res.status(404).json({ message: 'Movie not found'})
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    
    movies[movieIndex] = updateMovie

    return res.json(updateMovie)
})


const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => { 
    console.log(`server listening on port http://localhost:${PORT}`)
})