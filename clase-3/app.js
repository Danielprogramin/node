const esxpress = require('express')
const app = esxpress()

app.get('/', (req, res) => {
    res.json({ message: 'Hello'})
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => { 
    console.log(`server listening on port http://localhost:${PORT}`)
})