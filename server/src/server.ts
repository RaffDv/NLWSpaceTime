import fastify from 'fastify'
import { PrismaClient } from '@prisma/client' // DB connection

const app = fastify()
const prisma = new PrismaClient() // connection object

// Criação de rotas pelo festify
app.get('/hello', async (req, res) => {
  const users = await prisma.user.findMany()
  return users
})

// inicia o servidor, recebe um {}, necessário passar(obrigatorio*): port,
app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log('running server on http://localhost:3000')
  })
  .catch((err) => console.error(err))
