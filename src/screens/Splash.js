import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {CommonStyles} from '../constants';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => navigation.navigate('Menu'), 2000);
  }, [navigation]);

  return (
    <View style={CommonStyles.container}>
      <ActivityIndicator size="large" color="#F73859" />
    </View>
  );
};

export default Splash;
