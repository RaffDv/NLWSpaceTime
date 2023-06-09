import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { styled } from 'nativewind'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

// default imports
import BlurBg from './scr/public/assets/luz.png'
import Stripes from './scr/public/assets/stripes.svg'
import Logo from './scr/public/assets/logo.svg'

// To use Native-wind in non-global components
const StyledStripes = styled(Stripes)

export default function App() {
  const [hasLoadedFonts] = useFonts({
    BaiJamjuree_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (!hasLoadedFonts) {
    return null
  }
  return (
    <ImageBackground
      source={BlurBg}
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
    >
      <StyledStripes className="absolute left-1" />

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
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar Lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>

      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
