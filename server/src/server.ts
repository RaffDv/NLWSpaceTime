import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import 'dotenv/config'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'spacetime', // jwt token signature Byf*4@M5iTq&1%&djig@QxA^!75q^2fn^ERULys7$1I6kQRjyo
})

// routes
app.register(memoriesRoutes)
app.register(authRoutes)

// inicia o servidor, recebe um {}, necessário passar(obrigatorio*): port*,
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('running server on http://localhost:3333')
  })
  .catch((err) => console.error(err))
