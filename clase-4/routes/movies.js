import { Router } from 'express';
import {readJSON} from './utils.js'

const movies = readJSON('./movies.json')
const router = Router()

router.get('/', (req, res) => {
    const { genre} = req.query
    if (genre){
        const filtereMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filtereMovies)
    }   
    res.json(movies)
})