import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Buttons} from '../constants';

const Header = ({source, style}) => (
  <View style={[styles.wrapper, style]}>
    <LinearGradient style={styles.shadow} colors={[Buttons.primary.borderTopColor, Buttons.primary.borderBottomColor]}>
      <View style={{backgroundColor: Buttons.primary.backgroundColor}}>
        <Image source={source} style={styles.image} resizeMode="contain" />
      </View>
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    width: '65%',
    borderWidth: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },
  shadow: {
    paddingTop: 2,
    paddingBottom: 4,
  },
  image: {
    width: '100%',
    height: 36,
    marginVertical: 5,
  },
});

export default Header;
