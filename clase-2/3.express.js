const esxpress = require('express')
const app = esxpress()

const PORT = process.env.PORT ?? 1234

app.get('/', (req, res) => {
    res.status(200).send('<h1>Mi pagina</h1>')
})

app.post('/pokemon', (req, res) => {
    let body = ''

    // Evento de lectura de datos
    req.on('data', chunk => {
        body += chunk.toString()
    })

    // Evento de fin de lectura de datos
    req.on('end', () => {
        const data = JSON.parse(body)
        data.timestamp = Date.now()
        res.status(201).json(data)
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})