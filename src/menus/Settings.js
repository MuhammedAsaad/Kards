import React from 'react';
import {View, StyleSheet, Dimensions, Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RadialGradient from 'react-native-radial-gradient';
import Header from '../components/Header';
import MyAppText from '../components/MyAppText';
import MyAppButton from '../components/MyAppButton';
import MainContext from '../contexts/Main';
import {Buttons, CommonStyles} from '../constants';
import settingsImage from '../assets/settings.png';

const {width} = Dimensions.get('window');

const Info = (title, value) => (
  <View key={title} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <MyAppText style={styles.score}>{title}</MyAppText>
    <MyAppText style={styles.score}>{value || '-'}</MyAppText>
  </View>
);

const Settings = ({visible, onRequestClose}) => (
  <Modal animationType="fade" visible={visible} onRequestClose={onRequestClose}>
    <RadialGradient radius={width * 0.8} style={[CommonStyles.container, {padding: 25}]} colors={['#ddd', '#bbb']}>
      <Header source={settingsImage} style={{width: '100%'}} />
      <View style={{width: '90%', borderRadius: 30, paddingBottom: 8, backgroundColor: '#44444488'}}>
        <View style={CommonStyles.content}>
          <MainContext.Consumer>
            {({scores, settings, stats, setState}) => (
              <>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                  <MyAppButton
                    theme={Buttons.white}
                    disabled={!settings.sounds}
                    icon={settings.sounds ? 'volume-high' : 'volume-mute'}
                    onPress={() =>
                      setState(prev => ({...prev, settings: {...prev.settings, sounds: !prev.settings.sounds}}))
                    }
                  />
                  <MyAppButton
                    icon="stats-chart"
                    theme={Buttons.white}
                    disabled={!settings.score}
                    onPress={() =>
                      setState(prev => ({...prev, settings: {...prev.settings, score: !prev.settings.score}}))
                    }
                  />
                  <MyAppButton
                    icon="timer"
                    theme={Buttons.white}
                    disabled={!settings.timer}
                    onPress={() =>
                      setState(prev => ({...prev, settings: {...prev.settings, timer: !prev.settings.timer}}))
                    }
                  />
                </View>

                <MyAppText>best scores</MyAppText>
                {scores.map((score, index) => Info(`${index + 1}. ${score.value || 'empty'}`, score.date))}
                <MyAppText>statistics</MyAppText>
                {Info('total games:', stats.games)}
                {Info('total wins:', stats.wins)}
                {Info('win ratio:', stats.games ? ((stats.wins / stats.games) * 100).toFixed(0) : null)}
                {Info('longest win streak:', stats.longest_win_streak)}
                {Info('longest lose streak:', stats.longest_lose_streak)}
                {Info('current streak:', stats.current_streak)}
              </>
            )}
          </MainContext.Consumer>
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
