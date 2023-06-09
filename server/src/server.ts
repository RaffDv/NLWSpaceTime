import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(memoriesRoutes)

// inicia o servidor, recebe um {}, necessário passar(obrigatorio*): port*,
app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log('running server on http://localhost:3000')
  })
  .catch((err) => console.error(err))
