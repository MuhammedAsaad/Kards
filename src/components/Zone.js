import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Fonts, Buttons} from '../constants';
import MyAppText from './MyAppText';

const {width, height} = Dimensions.get('window');
const ICON_SIZE = height * 0.025;

const Zone = ({onLayout, icon, value}) => (
  <View onLayout={onLayout} style={styles.shadow}>
    <View style={styles.wrapper}>
      <Icon
        size={ICON_SIZE}
        name={`caret-${icon}`}
        color={icon === 'up' ? Buttons.green.backgroundColor : Buttons.pink.backgroundColor}
      />
      <View style={styles.card}>{value ? <MyAppText style={styles.text}>{value}</MyAppText> : null}</View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 15,
    paddingBottom: 6,
    backgroundColor: '#44444466',
  },
  wrapper: {
    borderWidth: 2,
    borderRadius: 15,
    paddingBottom: 8,
    width: width * 0.27,
    paddingHorizontal: 8,
    height: height * 0.27,
    maxHeight: width * 0.37,
    backgroundColor: '#3e5167',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    padding: 4,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  text: {
    color: '#fff',
    width: '100%',
    height: '100%',
    paddingTop: 5,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: width * 0.06,
    backgroundColor: '#341f97',
    fontFamily: Fonts.extra_bold,
  },
});

export default Zone;
