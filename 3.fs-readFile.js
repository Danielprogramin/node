const fs = require('node:fs')

console.log('leyendo texto 1')
fs.readFile('./archivo.txt', 'utf8', (err, text) => {
    console.log(text)
})

console.log('mamando gallo mientras eso carga')

console.log('leyendo texto 2')
fs.readFile('./archivo2.txt', 'utf8' , (err, text) => {
    console.log(text)
})




