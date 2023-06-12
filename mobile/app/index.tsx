import { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

// default imports
import Logo from '../scr/public/assets/logo.svg'
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import { api } from '../scr/lib/api'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/a77a14385ef884a95a13',
}

export default function App() {
  const router = useRouter()

  const [, response, sigInWhitGithub] = useAuthRequest(
    {
      clientId: 'a77a14385ef884a95a13',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'Spacetime',
      }),
    },
    discovery,
  )
  async function handleGithubOAuthCide(code: string) {
    const response = await api.post('register', {
      code,
    })
    const { token } = response.data

    await SecureStore.setItemAsync('token', token)
    router.push('/memories')
  }

  useEffect(() => {
    // console.log( descobrir URL DEV
    //   makeRedirectUri({
    //     scheme: 'Spacetime',
    //   }),
    // )
    if (response?.type === 'success') {
      const { code } = response.params
      handleGithubOAuthCide(code)
    }
  }, [response])

  return (
    <View className="flex-1 items-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <Logo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo!
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => sigInWhitGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar Lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </View>
  )
}
