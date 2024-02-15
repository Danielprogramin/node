const http = require('node:http');


const server = http.createServer((req, res) => {
    console.log('request received')
    res.end('hello world')
})

server.listen(3000, () => {
    console.log('listening on port 3000')   
})