import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => navigation.navigate('Menu'), 2000);
  }, [navigation]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="#F73859" />
    </View>
  );
};

export default Splash;
