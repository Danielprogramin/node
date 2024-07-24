import express, { json } from 'express'
import { randomUUID } from 'node:crypto'

import { moviesRouter } from './routes/movies.js'

//como leer un json en ESModules 
//import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// como leer json en ESModules recomendado por ahora
const movies = readJSON('./movies.json')


const app = express()
app.use(json())
app.disable('x-powered-by')

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'https://movies.com',
    'https://Daniel.dev'
]

app.use('/movies' , moviesRouter)

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