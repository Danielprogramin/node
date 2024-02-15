const os = require('node:os');

console.log('informacion del sistema operativo');
console.log('---------------------------------');

console.log('Nombre del sistema operativo', os.platform());
console.log('version del sistema operativo', os.release());
console.log('Arquitectura', os.arch());
console.log('CPUs', os.cpus());
console.log('Memoria libre', os.freemem()/ 1024 / 1024);
console.log('Memoria libre', os.totalmem()/ 1024 / 1024);

