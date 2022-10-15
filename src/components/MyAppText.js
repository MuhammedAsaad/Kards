import React from 'react';
import {StyleSheet, Text} from 'react-native';

const MyAppText = ({style, children}) => <Text style={[styles.text, style]}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Regular',
  },
});

export default MyAppText;
