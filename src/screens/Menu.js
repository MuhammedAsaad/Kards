import React, {useState} from 'react';
import {View, Image, Modal, StyleSheet, Dimensions, ScrollView, BackHandler, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import MyAppText from '../components/MyAppText';
import MyAppButton from '../components/MyAppButton';
import {Fonts, Buttons, CommonStyles} from '../constants';
import nameImage from '../assets/name.png';

const {width, height} = Dimensions.get('window');

const Menu = ({navigation}) => {
  const [infoVisible, toggleInfo] = useState(false);

  return (
    <RadialGradient radius={width * 0.8} style={CommonStyles.container} colors={['#ddd', '#bbb']}>
      <View style={styles.titleWrapper}>
        <LinearGradient
          style={{paddingTop: 2, paddingBottom: 4}}
          colors={[Buttons.primary.borderTopColor, Buttons.primary.borderBottomColor]}>
          <View style={{backgroundColor: Buttons.primary.backgroundColor}}>
            <Image source={nameImage} resizeMode="contain" style={{width: '100%', height: 36, marginVertical: 5}} />
          </View>
        </LinearGradient>
      </View>
      <View style={{width: '60%', borderRadius: 30, paddingBottom: 8, backgroundColor: '#44444488'}}>
        <View style={styles.btnsWrapper}>
          <View style={{height: 6, position: 'absolute', left: 0, right: 0, top: 0, backgroundColor: '#313f4bee'}} />
          <MyAppButton text="Start" onPress={() => navigation.navigate('Game')} theme={Buttons.yellow} />
          <MyAppButton text="How to play" onPress={() => toggleInfo(!infoVisible)} theme={Buttons.green} />
          <MyAppButton text="Exit" onPress={() => BackHandler.exitApp()} theme={Buttons.pink} />
        </View>
      </View>

      <Modal animationType="slide" visible={infoVisible} onRequestClose={() => toggleInfo(false)}>
        <View style={CommonStyles.container}>
          <View style={styles.infoContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <MyAppText style={styles.infoHeading}>How to play !</MyAppText>
              <MyAppText style={styles.info}>1- You got 111 cards, get ride of them.</MyAppText>
              <MyAppText style={[styles.info, {color: '#F73859'}]}>
                2- Slot with Red Down arrow accepts cards in descending order.
              </MyAppText>
              <MyAppText style={[styles.info, {color: '#27ae60'}]}>
                3- Slot with Green Up arrow accepts cards in ascending order.
              </MyAppText>
              <MyAppText style={styles.info}>
                4- Middle Slot is Hyperslot as it turned up and down during game (4 Times).
              </MyAppText>
              <MyAppText style={[styles.info, {textAlign: 'center', marginTop: 20}]}>Best Luck.</MyAppText>
            </ScrollView>
          </View>
          <TouchableOpacity onPress={() => toggleInfo(false)}>
            <View style={styles.closeBtn}>
              <Icon color="#fff" size={width * 0.08} name="ios-close-circle-outline" />
            </View>
          </TouchableOpacity>
        </View>
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
  infoHeading: {
    color: '#255883',
    marginBottom: 30,
    textAlign: 'center',
    fontSize: width * 0.08,
    fontFamily: Fonts.extra_bold,
  },
  info: {
    marginBottom: 5,
    color: '#255883',
    fontSize: width * 0.06,
  },
  closeBtn: {
    width: width * 0.12,
    height: width * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#F73859',
  },
});

export default Menu;
