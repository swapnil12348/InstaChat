import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function tabs_layout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.onSurfaceVariant,
      tabBarStyle:{
        backgroundColor: Colors.primary,
        borderTopColor:Colors.surfaceHigh,
        borderTopWidth: 1,
        height: 80,
        paddingBottom: 12,
        paddingTop: 8,

      },
      tabBarLabelStyle:{
        fontSize: 14,
        fontWeight: "600",
      }
    }}>
      <Tabs.Screen name='index'/>
      <Tabs.Screen name='search'/>
      <Tabs.Screen name='profile'/>
    </Tabs>
  )
}