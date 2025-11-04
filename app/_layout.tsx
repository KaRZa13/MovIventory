import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {SplashScreen, Stack} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import {useFonts} from "expo-font";
import {useEffect} from "react";

export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const [fontLoaded] = useFonts({
      'LuckiestGuy': require('@/assets/fonts/LuckiestGuy-Regular.ttf'),
      'Poppins': require('@/assets/fonts/Poppins-Regular.ttf'),
      'PoppinsBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
  })

  useEffect(() => {
    if (fontLoaded) {
        SplashScreen.hideAsync()
    }
  }, [fontLoaded])

  if (!fontLoaded) {
    return null
  }

  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
  );
}
