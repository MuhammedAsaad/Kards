import React, {useState} from 'react';
import {View, Modal, StyleSheet, Dimensions, ScrollView, BackHandler, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MyAppText from '../components/MyAppText';
import colors from '../constants';

const {width, height} = Dimensions.get('window');

const Menu = ({navigation}) => {
  const [infoVisible, toggleInfo] = useState(false);

  const Button = ({text, onPress, color}) => (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <MyAppText style={[styles.btn, {color}]}>{text}</MyAppText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MyAppText style={styles.title}>111 Kards</MyAppText>

      <Button text="Start" onPress={() => navigation.navigate('Game')} color="#F73859" />
      <Button text="How to play" onPress={() => toggleInfo(!infoVisible)} color="#27ae60" />
      <Button text="Exit" onPress={() => BackHandler.exitApp()} />

      <Modal animationType="slide" visible={infoVisible} onRequestClose={() => toggleInfo(false)}>
        <View style={[styles.container, {backgroundColor: colors.MAIN_COLOR}]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    borderRadius: 5,
    marginBottom: 35,
    color: '#F73859',
    paddingVertical: 12,
    paddingHorizontal: 30,
    fontSize: width * 0.15,
    backgroundColor: '#eee',
    fontFamily: 'Montserrat-ExtraBold',
  },
  btn: {
    padding: 15,
    marginTop: 15,
    borderRadius: 5,
    textAlign: 'center',
    minWidth: width * 0.5,
    fontSize: width * 0.05,
    backgroundColor: '#eee',
  },
  infoContainer: {
    padding: 25,
    elevation: 3,
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
    fontFamily: 'Montserrat-ExtraBold',
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
