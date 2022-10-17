import React from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MyAppText from './MyAppText';
import {Fonts, Buttons} from '../constants';

const {width} = Dimensions.get('window');
const BORDER_RADIUS = 6;

const MyAppButton = ({text, icon, onPress, theme = Buttons.primary}) => (
  <TouchableOpacity onPress={onPress} style={styles.btn} activeOpacity={0.9}>
    <View style={{backgroundColor: theme.borderTopColor, borderRadius: BORDER_RADIUS, paddingTop: 2}}>
      <View style={{backgroundColor: theme.borderBottomColor, borderRadius: BORDER_RADIUS, paddingBottom: 7}}>
        <View style={{paddingVertical: 10, borderRadius: BORDER_RADIUS, backgroundColor: theme.backgroundColor}}>
          {icon ? <Icon name={icon} style={styles.text} /> : <MyAppText style={styles.text}>{text}</MyAppText>}
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    minWidth: 50,
    marginBottom: 10,
    paddingBottom: 6,
    borderRadius: BORDER_RADIUS,
    backgroundColor: '#313f4bee',
  },
  text: {
    color: '#222222cc',
    textAlign: 'center',
    textShadowRadius: 1,
    fontFamily: Fonts.bold,
    textShadowColor: '#fff',
    fontSize: width * 0.045,
    lineHeight: width * 0.045,
    textTransform: 'uppercase',
    textShadowOffset: {width: 0.5, height: 0.5},
  },
});

export default MyAppButton;
