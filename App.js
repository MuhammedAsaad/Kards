import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainContext from './src/contexts/Main';
// Screens
import Home from './src/screens/Home';
import Game from './src/screens/Game';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#b3b3b3',
  },
};

const DEFAULT_STATE = {
  scores: [
    {value: null, date: null},
    {value: null, date: null},
    {value: null, date: null},
  ],
  last_game: null,
  settings: {sounds: true, score: true, timer: true},
  stats: {
    wins: 0,
    games: 0,
    longest_win_streak: 0,
    longest_lose_streak: 0,
    current_streak: 0,
  },
};

const App = () => {
  const [state, setState] = useState(DEFAULT_STATE);

  useEffect(() => {
    getSavedData();
  }, []);

  const getSavedData = async () => {
    try {
      const value = await AsyncStorage.getItem('@state');
      if (value) {
        console.log(value);
      }
    } catch (e) {}
  };

  return (
    <MainContext.Provider value={{...state, setState}}>
      <View style={{flex: 1}}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Game" component={Game} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </MainContext.Provider>
  );
};

export default App;
