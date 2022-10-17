import React from 'react';
import {View, Image, StyleSheet, Dimensions, Modal} from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import LinearGradient from 'react-native-linear-gradient';
import {CommonStyles, Buttons} from '../constants';
import MyAppButton from './MyAppButton';
import pausedImage from '../assets/paused.png';

const {width} = Dimensions.get('window');

const Gameover = ({visible, onRequestClose}) => (
  <Modal animationType="fade" visible={visible} onRequestClose={onRequestClose}>
    <RadialGradient radius={width * 0.8} style={CommonStyles.container} colors={['#ddd', '#bbb']}>
      <View style={styles.titleWrapper}>
        <LinearGradient
          style={{paddingTop: 2, paddingBottom: 4}}
          colors={[Buttons.primary.borderTopColor, Buttons.primary.borderBottomColor]}>
          <View style={{backgroundColor: Buttons.primary.backgroundColor}}>
            <Image source={pausedImage} resizeMode="contain" style={{width: '100%', height: 36, marginVertical: 5}} />
          </View>
        </LinearGradient>
      </View>
      <View style={{width: '60%', borderRadius: 30, paddingBottom: 8, backgroundColor: '#44444488'}}>
        <View style={styles.btnsWrapper}>
          <View style={{height: 6, position: 'absolute', left: 0, right: 0, top: 0, backgroundColor: '#313f4bee'}} />
          <MyAppButton text="play again" theme={Buttons.green} onPress={onRequestClose} />
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
