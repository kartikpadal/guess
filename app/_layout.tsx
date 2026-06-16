import { SplashScreen, Stack } from "expo-router";

import '@/global.css';
import {useFonts} from 'expo-font';
import {useEffect} from 'react';

export default function RootLayout() {
  // Using '@/' path alias for assets:
  // - '@/' = configured path alias pointing to project root (WORKS - recommended)
  // - '//' = interpreted as network path syntax (DOESN'T WORK)
  // - '../' = relative path from current file location (DOESN'T WORK reliably in require())
  // - './' = current directory relative path (DOESN'T WORK reliably in require())
  // '@/' is the standard in Expo/React Native projects for absolute asset imports
  const [fontsLoaded] = useFonts({
    'sans-regular': require('@/assets/fonts/PlusJakartaSans-Regular.ttf'),
    'sans-bold': require('@/assets/fonts/PlusJakartaSans-Bold.ttf'),
    'sans-medium': require('@/assets/fonts/PlusJakartaSans-Medium.ttf'),
    'sans-semibold': require('@/assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'sans-extrabold': require('@/assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    'sans-light': require('@/assets/fonts/PlusJakartaSans-Light.ttf')
  })

  useEffect( () => {
    if(fontsLoaded){
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]
  )
  
  if(!fontsLoaded) return null;
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}
