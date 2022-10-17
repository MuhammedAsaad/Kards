import React from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MyAppText from './MyAppText';
import {Buttons} from '../constants';

const {width} = Dimensions.get('window');
const BORDER_RADIUS = 6;

const MyAppButton = ({text, icon, disabled, disableButton, onPress, theme = Buttons.primary}) => (
  <TouchableOpacity disabled={disableButton && disabled} onPress={onPress} style={styles.btn} activeOpacity={0.9}>
    <View style={{borderRadius: BORDER_RADIUS, paddingTop: disabled ? 0 : 2, backgroundColor: theme.borderTopColor}}>
      <View
        style={{
          borderRadius: BORDER_RADIUS,
          paddingBottom: disabled ? 0 : 7,
          backgroundColor: theme.borderBottomColor,
        }}>
        <View
          style={{
            justifyContent: 'center',
            height: disabled ? 49 : 40,
            borderRadius: BORDER_RADIUS,
            backgroundColor: disabled ? '#999' : theme.backgroundColor,
          }}>
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
    textShadowColor: '#fff',
    fontSize: width * 0.045,
    lineHeight: width * 0.045,
    textTransform: 'uppercase',
    textShadowOffset: {width: 0.5, height: 0.5},
  },
});

export default MyAppButton;
