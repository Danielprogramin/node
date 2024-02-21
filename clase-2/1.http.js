const http = require('node:http');

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
   

  if (req.url === '/') {
    res.statusCode = 200
    res.end('Bienvenido a la página principal')
  }else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('Contacto')
  }else {
    res.statusCode = 404
    res.end('Página no encontrada')
  }
}


const server = http.createServer(processRequest)


server.listen(desiredPort, () => {
    console.log(`server listening on port http://localhost:${desiredPort}`)
})
