import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { FastifyInstance } from 'fastify'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
/*

                            ** ATENÇÃO **

    Esse é um dos piores geitos de se fazer upload de arquivos, o mais indicado
    é usar um serviço especializado para esse fim
    
    EXEMPLO: Amazon S3, Gooogle GCS, Cloudflare R2 (Diego3g recomenda)



*/
const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (req, res) => {
    const upload = await req.file({
      limits: {
        fileSize: 5_242_880, // 5MB
      },
    })
    if (!upload) {
      return res.status(400).send()
    }
    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)
    if (!isValidFileFormat) {
      return res.status(400).send()
    }
    const fileID = randomUUID()
    const extension = extname(upload.filename)

    const fileName = fileID.concat(extension)
    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads/', fileName),
    )

    await pump(upload.file, writeStream)

    const fullURL = req.protocol.concat('://').concat(req.hostname)
    const fileURL = new URL(`/uploads/${fileName}`, fullURL).toString()

    return { fileURL }
  })
}
