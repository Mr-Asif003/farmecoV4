import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name='Subsplan' options={{headerShown:false}} />
        <Stack.Screen name='SubsVeg' options={{headerShown:false}} />
        <Stack.Screen name='SubsFruit' options={{headerShown:false}} />
        <Stack.Screen name="Subsweekly" options={{headerShown:false}}/>
        <Stack.Screen name="Subsplandaily" options={{headerShown:false}}/>
    </Stack>
  )
}

export default _layout