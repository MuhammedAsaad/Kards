import React from 'react';
import {View} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from './src/constants';
// Screens
import Splash from './src/screens/Splash';
import Menu from './src/screens/Menu';
import Game from './src/screens/Game';

const Stack = createNativeStackNavigator();

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.MAIN_COLOR,
  },
};

const App = () => (
  <View style={{flex: 1}}>
    <NavigationContainer theme={Theme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false, statusBarColor: colors.MAIN_COLOR}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  </View>
);

export default App;
