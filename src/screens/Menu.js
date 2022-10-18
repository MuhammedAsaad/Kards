import React, {useEffect, useState} from 'react';
import {View, Image, Modal, StyleSheet, Dimensions, BackHandler, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import MyAppText from '../components/MyAppText';
import MyAppButton from '../components/MyAppButton';
import {Buttons, CommonStyles} from '../constants';
import menu from '../assets/menu.png';
import how_to_play from '../assets/how_to_play.png';

const {width, height} = Dimensions.get('window');

const Menu = ({navigation}) => {
  const [infoVisible, toggleInfo] = useState(false);

  useEffect(() => {
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <RadialGradient radius={width * 0.8} style={CommonStyles.container} colors={['#ddd', '#bbb']}>
      <View style={styles.titleWrapper}>
        <LinearGradient
          style={{paddingTop: 2, paddingBottom: 4}}
          colors={[Buttons.primary.borderTopColor, Buttons.primary.borderBottomColor]}>
          <View style={{backgroundColor: Buttons.primary.backgroundColor}}>
            <Image source={menu} resizeMode="contain" style={{width: '100%', height: 36, marginVertical: 5}} />
          </View>
        </LinearGradient>
      </View>
      <View style={{width: '60%', borderRadius: 30, paddingBottom: 8, backgroundColor: '#44444488'}}>
        <View style={styles.btnsWrapper}>
          <View style={{height: 6, position: 'absolute', left: 0, right: 0, top: 0, backgroundColor: '#313f4bee'}} />
          <MyAppButton text="start" onPress={() => navigation.navigate('Game')} theme={Buttons.yellow} />
          <MyAppButton text="settings" onPress={() => toggleInfo(!infoVisible)} theme={Buttons.white} />
          <MyAppButton text="How to play" onPress={() => toggleInfo(!infoVisible)} theme={Buttons.green} />
          <MyAppButton text="Exit" onPress={() => BackHandler.exitApp()} theme={Buttons.pink} />
        </View>
      </View>

      <Modal animationType="fade" visible={infoVisible} onRequestClose={() => toggleInfo(false)}>
        <RadialGradient radius={width * 0.8} style={[CommonStyles.container, {padding: 25}]} colors={['#ddd', '#bbb']}>
          <View style={[styles.titleWrapper, {width: '100%'}]}>
            <LinearGradient
              style={{paddingTop: 2, paddingBottom: 4}}
              colors={[Buttons.primary.borderTopColor, Buttons.primary.borderBottomColor]}>
              <View style={{backgroundColor: Buttons.primary.backgroundColor}}>
                <Image
                  source={how_to_play}
                  resizeMode="contain"
                  style={{width: '100%', height: 36, marginVertical: 5}}
                />
              </View>
            </LinearGradient>
          </View>
          <View style={{width: '90%', borderRadius: 30, paddingBottom: 8, backgroundColor: '#44444488'}}>
            <View style={styles.btnsWrapper}>
              <MyAppText style={styles.info}>👉 You got 111 cards, get ride of them.</MyAppText>
              <MyAppText style={[styles.info, {color: Buttons.green.backgroundColor}]}>
                👆 Slot with Green Up arrow accepts cards in ascending order.
              </MyAppText>
              <MyAppText style={[styles.info, {color: Buttons.pink.backgroundColor}]}>
                👇 Slot with red down arrow accepts cards in descending order.
              </MyAppText>
              <MyAppText style={styles.info}>
                💡 Middle slot is hyperslot as it turned up and down during game (once every 11 rounds).
              </MyAppText>
              <MyAppText style={[styles.info, {textAlign: 'center', marginTop: 20}]}>Best Luck...</MyAppText>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => toggleInfo(false)}>
            <View style={styles.closeBtn}>
              <Icon color="#fff" size={width * 0.08} name="ios-close-circle-outline" />
            </View>
          </TouchableOpacity>
        </RadialGradient>
      </Modal>
    </RadialGradient>
  );
};

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
  infoContainer: {
    padding: 25,
    elevation: 2,
    borderRadius: 5,
    width: width * 0.9,
    backgroundColor: '#fff',
    maxHeight: height - 100,
  },
  info: {
    color: '#fff',
    marginBottom: 5,
    fontSize: width * 0.04,
  },
  closeBtn: {
    marginTop: -8,
    width: width * 0.12,
    height: width * 0.12,
    alignItems: 'center',
    backgroundColor: '#666',
    justifyContent: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default Menu;
