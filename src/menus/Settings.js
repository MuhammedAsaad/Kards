import React from 'react';
import {View, StyleSheet, Dimensions, Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RadialGradient from 'react-native-radial-gradient';
import Header from '../components/Header';
import MyAppText from '../components/MyAppText';
import MyAppButton from '../components/MyAppButton';
import {Buttons, CommonStyles} from '../constants';
import settings from '../assets/settings.png';

const {width} = Dimensions.get('window');

const Info = (title, value) => (
  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <MyAppText style={styles.score}>{title}</MyAppText>
    <MyAppText style={styles.score}>{value}</MyAppText>
  </View>
);

const Settings = ({visible, onRequestClose}) => (
  <Modal animationType="fade" visible={visible} onRequestClose={onRequestClose}>
    <RadialGradient radius={width * 0.8} style={[CommonStyles.container, {padding: 25}]} colors={['#ddd', '#bbb']}>
      <Header source={settings} style={{width: '100%'}} />
      <View style={{width: '90%', borderRadius: 30, paddingBottom: 8, backgroundColor: '#44444488'}}>
        <View style={CommonStyles.content}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <MyAppButton
              icon="stats-chart"
              theme={Buttons.white}
              // disabled={!state.visibleScore}
              // onPress={() => setState(prev => ({...prev, visibleScore: !prev.visibleScore}))}
            />
            <MyAppButton
              icon="stats-chart"
              theme={Buttons.white}
              // disabled={!state.visibleScore}
              // onPress={() => setState(prev => ({...prev, visibleScore: !prev.visibleScore}))}
            />
            <MyAppButton
              icon="timer"
              theme={Buttons.white}
              // disabled={!state.visibleTimer}
              // onPress={() => setState(prev => ({...prev, visibleTimer: !prev.visibleTimer}))}
            />
          </View>
          <MyAppText>best scores</MyAppText>
          {Info('1. 1544', '15/06/2022')}
          {Info('2. 1543', '15/06/2022')}
          {Info('3. 1541', '15/06/2022')}
          <MyAppText>statistics</MyAppText>
          {Info('total games:', '5')}
          {Info('total wins:', '5')}
          {Info('win ratio:', '50%')}
          {Info('longest win streak:', '5')}
          {Info('longest lose streak:', '5')}
          {Info('current streak:', '5')}
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={onRequestClose}>
        <View style={CommonStyles.close}>
          <Icon color="#fff" size={width * 0.08} name="ios-close-circle-outline" />
        </View>
      </TouchableOpacity>
    </RadialGradient>
  </Modal>
);

const styles = StyleSheet.create({
  score: {
    color: '#bbb',
    marginBottom: 2,
    fontSize: width * 0.03,
    lineHeight: width * 0.03,
  },
});

export default Settings;
