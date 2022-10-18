import React from 'react';
import {View, Dimensions, Modal} from 'react-native';
import Lottie from 'lottie-react-native';
import RadialGradient from 'react-native-radial-gradient';
import Header from '../components/Header';
import MyAppText from '../components/MyAppText';
import MyAppButton from '../components/MyAppButton';
import {CommonStyles, Buttons} from '../constants';
import gameover from '../assets/gameover.png';

const {width} = Dimensions.get('window');
const victory = require('../assets/victory.json');
const fail = require('../assets/fail.json');

const Gameover = ({win, visible, navigation, onRequestClose}) => (
  <Modal transparent animationType="fade" visible={visible} onRequestClose={onRequestClose}>
    <RadialGradient radius={width * 0.8} style={CommonStyles.container} colors={['#ddddddd9', '#bbbbbbd9']}>
      <Header source={gameover} />
      <View style={CommonStyles.contentOuterShadow}>
        <View style={CommonStyles.content}>
          <Lottie loop autoPlay source={win ? victory : fail} style={{height: 200, alignSelf: 'center'}} />
          <MyAppText style={{color: '#fff', textAlign: 'center', marginBottom: 25}}>
            {win ? 'woow.., you did it' : 'lost.., try again'}
          </MyAppText>
          <View style={CommonStyles.contentInnerShadow} />
          <MyAppButton text="play again" theme={Buttons.green} onPress={onRequestClose} />
          <MyAppButton text="Back to menu" theme={Buttons.pink} onPress={() => navigation.goBack()} />
        </View>
      </View>
    </RadialGradient>
  </Modal>
);

export default Gameover;
