import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingButton = ({onPress, icon}) => (
  <TouchableOpacity onPress={onPress} style={styles.wrapper}>
    <Icon size={20} name={icon} color="#fff" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default SettingButton;
