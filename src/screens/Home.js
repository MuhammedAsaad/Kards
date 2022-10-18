import React, {useEffect, useState} from 'react';
import {View, Dimensions, BackHandler} from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import Header from '../components/Header';
import MyAppButton from '../components/MyAppButton';
import Settings from '../menus/Settings';
import HowToPlay from '../menus/HowToPlay';
import {Buttons, CommonStyles} from '../constants';
import menu from '../assets/menu.png';

const {width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [state, setState] = useState({settings: false, info: false});

  useEffect(() => {
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <RadialGradient radius={width * 0.8} style={CommonStyles.container} colors={['#ddd', '#bbb']}>
      <Header source={menu} />
      <View style={CommonStyles.contentOuterShadow}>
        <View style={CommonStyles.content}>
          <View style={CommonStyles.contentInnerShadow} />
          <MyAppButton text="start" onPress={() => navigation.navigate('Game')} theme={Buttons.yellow} />
          <MyAppButton
            text="settings"
            theme={Buttons.white}
            onPress={() => setState(prev => ({...prev, settings: true}))}
          />
          <MyAppButton
            text="How to play"
            theme={Buttons.green}
            onPress={() => setState(prev => ({...prev, info: true}))}
          />
          <MyAppButton text="Exit" onPress={() => BackHandler.exitApp()} theme={Buttons.pink} />
        </View>
      </View>

      <Settings visible={state.settings} onRequestClose={() => setState(prev => ({...prev, settings: false}))} />
      <HowToPlay visible={state.info} onRequestClose={() => setState(prev => ({...prev, info: false}))} />
    </RadialGradient>
  );
};

export default Home;
