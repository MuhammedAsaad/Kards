import React from 'react';
import {View} from 'react-native';
import MyAppButton from '../components/MyAppButton';
import MainContext from '../contexts/Main';
import {Buttons} from '../constants';

const SettingsOptions = () => (
  <MainContext.Consumer>
    {({settings, setState}) => (
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <MyAppButton
          theme={Buttons.white}
          disabled={!settings.sounds}
          icon={settings.sounds ? 'volume-high' : 'volume-mute'}
          onPress={() => setState(prev => ({...prev, settings: {...prev.settings, sounds: !prev.settings.sounds}}))}
        />
        <MyAppButton
          icon="stats-chart"
          theme={Buttons.white}
          disabled={!settings.score}
          onPress={() => setState(prev => ({...prev, settings: {...prev.settings, score: !prev.settings.score}}))}
        />
        <MyAppButton
          icon="timer"
          theme={Buttons.white}
          disabled={!settings.timer}
          onPress={() => setState(prev => ({...prev, settings: {...prev.settings, timer: !prev.settings.timer}}))}
        />
      </View>
    )}
  </MainContext.Consumer>
);

export default SettingsOptions;
