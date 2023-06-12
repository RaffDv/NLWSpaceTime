import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

console.log('entrou na rota')
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  const redirectTo = req.cookies.get('redirectTo')?.value

  const registerResponse = await api.post('/register', {
    code,
  })
  const cookiesExpiresInSeconds = 60 * 60 * 24 * 30
  const { token } = registerResponse.data
  const redirectURL = redirectTo ?? new URL('/', req.url)
  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookiesExpiresInSeconds}`,
    },
  })
}
