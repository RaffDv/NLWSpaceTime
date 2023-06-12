import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (req) => {
    await req.jwtVerify()
  })

  app.get('/memories', async (req, res) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: req.user.sub,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
    return memories.map((memory) => {
      return {
        id: memory.id,
        coverURL: memory.coverURL,
        except: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })
    if (!memory.isPublic && memory.userId !== req.user.sub) {
      return res.status(401).send()
    }

    return memory
  })

  app.post('/memories', async (req, res) => {
    const bodySchema = z.object({
      content: z.string(),
      coverURL: z.string(),
      // coerce verify if velue is trufy or falsy
      isPublic: z.coerce.boolean().default(false),
    })
    const { content, isPublic, coverURL } = bodySchema.parse(req.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        isPublic,
        coverURL,
        userId: req.user.sub,
      },
    })
    return memory
  })

  app.put('/memories/:id', async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      content: z.string().optional(),
      coverURL: z.string().optional(),
      isPublic: z.coerce.boolean().optional(),
    })

    const { content, isPublic, coverURL } = bodySchema.parse(req.body)
    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (memory.userId !== req.user.sub) {
      return res.status(401).send()
    }
    memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        isPublic,
        coverURL,
      },
    })
    return memory
  })

  app.delete('/memories/:id', async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (memory.userId !== req.user.sub) {
      return res.status(401).send()
    }

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
