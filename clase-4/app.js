import express, { json } from 'express'
import { randomUUID } from 'node:crypto'


import movies from './movies.json'
import { validateMovie, validatePartialMovie } from './schemas/movies'

const app = express()
app.use(json())
app.disable('x-powered-by')

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'https://movies.com',
    'https://Daniel.dev'
]

app.get('/', (req, res) => {
    res.json({ message: 'Hello'})
})

app.get('/movies', (req, res) => {
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin)
    }



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
        id: randomUUID(), // uuid v4
        ...result.data // data
    }

    //esto no es REST, porque estamos guardadrdo
    //el estadoo de la aplicacion en memoria 

    movies.push(newMovie)

    res.status(201).json(newMovie)
})

app.delete('/movies/:id', (req, res) => {
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin)
    }
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found'})
    }

    movies.splice(movieIndex, 1)

    return res.json({ message: 'Movie deleted'})
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

app.options('/movies/:id', (req, res) => {
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin)
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Max-Age', '86400')
    res.status(204).send()
})


const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => { 
    console.log(`server listening on port http://localhost:${PORT}`)
})