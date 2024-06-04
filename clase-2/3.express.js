const esxpress = require('express')
const app = esxpress()
const ditto = require('./pokemon/ditto.json')



app.disable('x-powered-by')

app.use((res, req, next) => {
    if(req.method === 'POST') return next()

   if(res.setHeader['Content-Type'] === 'application/json; charset=utf-8') return next()

   let body = ''

   // Evento de lectura de datos
   req.on('data', chunk => {
       body += chunk.toString()
   })

   req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    //mutar el body
   req.body = data
})

    next()
})

app.get('/pokemon/ditto', (req, res) => {
    res.json(ditto)
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

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})