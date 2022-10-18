import React from 'react';
import {View, Image, StyleSheet, Dimensions, Modal} from 'react-native';
import Lottie from 'lottie-react-native';
import RadialGradient from 'react-native-radial-gradient';
import LinearGradient from 'react-native-linear-gradient';
import MyAppText from './MyAppText';
import MyAppButton from './MyAppButton';
import {CommonStyles, Buttons} from '../constants';
import gameover from '../assets/gameover.png';

const {width} = Dimensions.get('window');
const victory = require('../assets/victory.json');
const fail = require('../assets/fail.json');

const Gameover = ({win, visible, navigation, onRequestClose}) => (
  <Modal transparent animationType="fade" visible={visible} onRequestClose={onRequestClose}>
    <RadialGradient radius={width * 0.8} style={CommonStyles.container} colors={['#ddddddd9', '#bbbbbbd9']}>
      <View style={styles.titleWrapper}>
        <LinearGradient
          style={{paddingTop: 2, paddingBottom: 4}}
          colors={[Buttons.primary.borderTopColor, Buttons.primary.borderBottomColor]}>
          <View style={{backgroundColor: Buttons.primary.backgroundColor}}>
            <Image source={gameover} resizeMode="contain" style={{width: '100%', height: 36, marginVertical: 5}} />
          </View>
        </LinearGradient>
      </View>
      <View style={{width: '60%', borderRadius: 30, paddingBottom: 8, backgroundColor: '#44444488'}}>
        <View style={styles.btnsWrapper}>
          <Lottie loop autoPlay source={win ? victory : fail} style={{height: 200, alignSelf: 'center'}} />
          <MyAppText style={{color: '#fff', textAlign: 'center', marginBottom: 25}}>
            {win ? 'woow.., you did it' : 'lost.., try again'}
          </MyAppText>
          <View style={{height: 6, position: 'absolute', left: 0, right: 0, top: 0, backgroundColor: '#313f4bee'}} />
          <MyAppButton text="play again" theme={Buttons.green} onPress={onRequestClose} />
          <MyAppButton text="Back to menu" theme={Buttons.pink} onPress={() => navigation.goBack()} />
        </View>
      </View>
    </RadialGradient>
  </Modal>
);

const styles = StyleSheet.create({
  titleWrapper: {
    width: '65%',
    borderWidth: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },
  btnsWrapper: {
    paddingTop: 25,
    paddingBottom: 15,
    borderEndWidth: 4,
    borderStartWidth: 4,
    borderBottomWidth: 4,
    paddingHorizontal: 25,
    backgroundColor: '#3e5167',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});

export default Gameover;
