import React from 'react'

import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Loading from './src/pages/Loading'
import AddTimer from './src/pages/AddTimer'

const Stack = createStackNavigator();

const App = () => {

  const deepLinking ={
    prefixes: ['http://hereos.dev.br', 'timework://'],
    config:{
      Loading: 'Loading',
      AddTimer:'AddTimer',
    }
  }

  return (
    <NavigationContainer linking={deepLinking}>
      <Stack.Navigator 
        initialRouteName={Loading}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="AddTimer" component={AddTimer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App