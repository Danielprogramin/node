// Esto solo en los modulos nativos
// que no tienen promesas nativas

//const { promisify} = require('node:util')
//const readFile = promisify(fs.readFile)

const fs = require('node:fs/promises')

console.log('leyendo texto 1')
fs.readFile('./archivo.txt', 'utf8')
.then(text => {
    console.log(text)
})

console.log('mamando gallo mientras eso carga')

console.log('leyendo texto 2')
fs.readFile('./archivo2.txt', 'utf8')
.then(text => {
    console.log(text)
})



