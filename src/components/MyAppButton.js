import React from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import MyAppText from './MyAppText';
import {Fonts, Buttons} from '../constants';

const {width} = Dimensions.get('window');

const MyAppButton = ({text, onPress, theme = Buttons.primary}) => (
  <TouchableOpacity onPress={onPress} style={styles.btn} activeOpacity={0.9}>
    <View style={{backgroundColor: theme.borderTopColor, paddingTop: 2, borderRadius: 6}}>
      <View style={[styles.btnTextWrapper, {backgroundColor: theme.borderBottomColor}]}>
        <MyAppText style={[styles.btnText, theme]}>{text}</MyAppText>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    borderRadius: 6,
    marginBottom: 10,
    paddingBottom: 6,
    backgroundColor: '#313f4bee',
  },
  btnTextWrapper: {
    borderRadius: 6,
    paddingBottom: 7,
  },
  btnText: {
    borderRadius: 6,
    color: '#222222cc',
    textAlign: 'center',
    textShadowRadius: 1,
    paddingVertical: 10,
    ...Buttons.yellow,
    fontFamily: Fonts.bold,
    textShadowColor: '#fff',
    fontSize: width * 0.045,
    lineHeight: width * 0.045,
    textTransform: 'uppercase',
    textShadowOffset: {width: 0.5, height: 0.5},
  },
});

export default MyAppButton;
