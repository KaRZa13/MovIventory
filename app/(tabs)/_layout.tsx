import { Tabs } from 'expo-router'
import React from 'react'
import { HapticTab } from '@/components/haptic-tab'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from "@expo/vector-icons"
import { AuthProvider, useAuth } from '@/contexts/auth-context'
import {useTranslation} from "react-i18next"
import '@/language/index'

function TabsContent() {
  const {t, i18n} = useTranslation()
  const colorScheme = useColorScheme()
  const { isAuthenticated } = useAuth()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Protected guard={isAuthenticated}>
        <Tabs.Screen
          name="index"
          options={{
            title: t('navbar.home'),
            tabBarIcon: ({ color }) =>
              <Ionicons name="home" size={28} color={color} />,
          }}
        />
      </Tabs.Protected>
      <Tabs.Protected guard={isAuthenticated}>
        <Tabs.Screen
          name="map"
          options={{
            title: t('navbar.map'),
            tabBarIcon: ({ color }) =>
              <Ionicons name="map" size={28} color={color} />,
          }}
        />
      </Tabs.Protected>
      <Tabs.Protected guard={isAuthenticated}>
        <Tabs.Screen
          name="movies"
          options={{
            title: t('navbar.movies'),
            tabBarIcon: ({ color }) => (
              <Ionicons name="videocam" size={28} color={color} />
            ),
          }}
        />
      </Tabs.Protected>
      <Tabs.Screen
        name="profile"
        options={{
          title: t('navbar.profile'),
          tabBarIcon: ({ color }) => (
            <Ionicons name={"person"} size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default function TabLayout() {
  return (
    <AuthProvider>
      <TabsContent />
    </AuthProvider>
  )
}
