const fs = require("node:fs/promises");

// fs.readdir(".", (err, files) => {
//   if (err) {
//     console.error("Error en el directorio", err);
//     return;
//   }

//   files.forEach((file) => {
//     console.log(file);
//   });
// });

fs.readdir(".")
    .then(files => {
        files.forEach((file) => {
            console.log(file);
        })
    })

    .cath(err => {
        if (err) {
            console.error("Error al leer el directorio", err);
        }
    })