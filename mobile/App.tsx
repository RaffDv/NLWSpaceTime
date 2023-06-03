import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ImageBackground, Text } from 'react-native'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import BlurBg from './scr/public/assets/luz.png'

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
      className="relative flex-1 items-center bg-gray-900"
    >
      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
