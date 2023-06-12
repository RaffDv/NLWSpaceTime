import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { memoriesRoutes } from './routes/memories'
import 'dotenv/config'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'spacetime', // jwt token signature Byf*4@M5iTq&1%&djig@QxA^!75q^2fn^ERULys7$1I6kQRjyo
})
// other modules register
app.register(multipart)
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})
// routes
app.register(memoriesRoutes)
app.register(authRoutes)
app.register(uploadRoutes)

// inicia o servidor, recebe um {}, necessário passar(obrigatorio*): port*,host*
app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('running server on http://localhost:3333')
  })
  .catch((err) => console.error(err))
