const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2] ?? '.'

async function ls(folder) {
  let files
  try {
      files = await fs.readdir(folder)
  } catch (err) {
      console.error(`No se pudo leer, ${folder}`)
      process.exit(1)
  }

    const filesPromises = files.map(async file => {
      const filePath = path.join(folder, file)
      let stats

      try {
        stats = await fs.stat(filePath) // imformacion
      } catch (err) {
        console.error(`No se pudo leer, ${filePath}`)
      process.exit(1)
      }

      const isDirectory = stats.isDirectory()
      const fileType = isDirectory ? 'd' : 'f'
      const filesize = stats.size.toString()
      const fileModified = stats.mtime.toLocaleString()

      return `${fileType} ${file.padEnd(20)} ${filesize.padStart(10)} ${fileModified}`
    })

    const filesInfo = await Promise.all(filesPromises)

    filesInfo.forEach(fileInfo => console.log(fileInfo))
}



ls(folder)