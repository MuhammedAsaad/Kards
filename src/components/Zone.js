import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Fonts, Buttons} from '../constants';
import MyAppText from './MyAppText';

const {width, height} = Dimensions.get('window');
const ICON_SIZE = height * 0.025;
const BORDER_RADIUS = 6;

const Zone = ({onLayout, icon, value}) => (
  <View onLayout={onLayout} style={styles.shadow}>
    <View style={styles.wrapper}>
      <Icon
        size={ICON_SIZE}
        name={`caret-${icon}`}
        color={icon === 'up' ? Buttons.green.backgroundColor : Buttons.pink.backgroundColor}
      />
      <View style={styles.card}>
        {value ? (
          <View style={styles.cardTopShadow}>
            <View style={styles.cardBottomShadow}>
              <View style={{flex: 1, backgroundColor: Buttons.white.backgroundColor}}>
                {value ? <MyAppText style={styles.text}>{value}</MyAppText> : null}
              </View>
            </View>
          </View>
        ) : null}
      </View>
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
    width: '100%',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    backgroundColor: '#f7f7f7',
  },
  cardTopShadow: {
    flex: 1,
    paddingTop: 2,
    overflow: 'hidden',
    borderRadius: BORDER_RADIUS,
    backgroundColor: Buttons.white.borderTopColor,
  },
  cardBottomShadow: {
    flex: 1,
    paddingBottom: 4,
    borderRadius: BORDER_RADIUS,
    backgroundColor: Buttons.white.borderBottomColor,
  },
  text: {
    padding: 10,
    width: '100%',
    height: '100%',
    color: '#222222cc',
    textShadowRadius: 1,
    fontFamily: Fonts.bold,
    textShadowColor: '#fff',
    fontSize: width * 0.055,
    lineHeight: width * 0.055,
    borderRadius: BORDER_RADIUS,
    textShadowOffset: {width: 0.5, height: 0.5},
  },
});

export default Zone;
