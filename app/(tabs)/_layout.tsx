import {Tabs} from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color}) => <Ionicons name="home" size={28} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    title: 'Map',
                    tabBarIcon: ({color}) => <Ionicons name="map" size={28} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="movies"
                options={{
                    title: 'Movies',
                    tabBarIcon: ({color}) => <Ionicons name="videocam" size={28} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Rooms',
                    tabBarIcon: ({color}) => <Ionicons name="paper-plane" size={28} color={color}/>,
                }}
            />
        </Tabs>
    );
}
