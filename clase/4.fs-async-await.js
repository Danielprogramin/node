// Esto solo en los modulos nativos
// que no tienen promesas nativas

//const { promisify} = require('node:util')
//const readFile = promisify(fs.readFile)

const { readFile } = require('node:fs/promises')



// IIFE - Inmediattly Invoked Function Expression
;(
async () =>{
console.log('leyendo texto 1')
const text = await readFile('./archivo2.txt', 'utf8')
console.log('primer text:', text)


console.log('mamando gallo mientras eso carga')

console.log('leyendo texto 2')
const secondText = await readFile('./archivo2.txt', 'utf8')
console.log('segundo texto:', secondText)
})








