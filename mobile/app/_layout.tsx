import { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import BlurBg from '../scr/public/assets/luz.png'
import Stripes from '../scr/public/assets/stripes.svg'
import { styled } from 'nativewind'
import { SplashScreen, Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
// fonts
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { StatusBar } from 'expo-status-bar'
const StyledStripes = styled(Stripes)

export default function Layout() {
  const [IsUserAuthenticated, setIsUserAuthenticated] = useState<
    null | boolean
  >(null)

  const [hasLoadedFonts] = useFonts({
    BaiJamjuree_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsUserAuthenticated(!!token)
    })
  }, [])

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={BlurBg}
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
      className="relative flex-1 bg-gray-900"
    >
      <StyledStripes className="absolute left-1" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="index" redirect={IsUserAuthenticated} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>

      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
