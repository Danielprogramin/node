const path = require('node:path');

// barra separadora de carpetas segun SO
console.log(path.sep)

//unir rutas con path.join 
const filePath = path.join('.', 'content' , 'subfolder', 'test.txt')
console.log(filePath)

const base  = path.basename('/tmp/midu-secret-file/password.txt')
console.log(base)

const filename  = path.basename('/tmp/midu-secret-file/password.txt', '.txt')
console.log(filename)

const extension = path.extname('my.primer.image.jpg')
console.log(extension)