const http = require('node:http');

const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
    const {method, url} = req

    switch (method) {
        case 'GET':
            switch (url){
                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    return res.end(JSON.stringify(dittoJSON))
                default:
                    res.statusCode = 404
                    rest.setHeader('Content-Type', 'text/plain; charset=utf-8')
                    return res.end('<h1>404 Not Found</h1>')
            }

            case'POST': 
            switch(url){
                case '/pokemon': {
                    let body = ''

            // Evento de lectura de datos
            req.on('data', chunk => {
                body += chunk.toString()
            })

            // Evento de fin de lectura de datos
            req.on('end', () => {
                const data = JSON.parse(body)
                res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify(data))

            })
            break
        }
            }
            default:
                res.statusCode = 405
                res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                return res.end('<h1>405 Method Not Allowed</h1>')
    }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
    console.log('server listening on port http://localhost:1234')
})