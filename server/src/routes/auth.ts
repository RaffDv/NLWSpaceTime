import { FastifyInstance } from 'fastify'
import axios from 'axios'
import { z } from 'zod'
import { prisma } from './lib/prisma'
export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (req) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(req.body)

    const accessTokenResponse = await axios.post(
      'http://github.com/login/oauth/access_token',
      null,
      {
        params: {
          code,
          client_id: process.env.CLIENT_ID_GIT,
          client_secret: process.env.CLIENT_SECRET_GIT,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token } = accessTokenResponse.data

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`, // Default request to authorize a get user data
      },
    })
    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const userInfo = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          avatarURL: userInfo.avatar_url,
          githubId: userInfo.id,
          name: userInfo.name,
          login: userInfo.login,
        },
      })
    }
    // jwt create token
    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarURL,
      },
      {
        sub: user.id,
        expiresIn: '30 days',
      },
    )

    return { token }
  })
}
