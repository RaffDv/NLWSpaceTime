import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async (req, res) => {
    const memories = await prisma.memory.findMany({
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
        userId: '12329192-c71c-462d-a1c5-f6d800dfc64e',
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
    const memory = await prisma.memory.update({
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

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
