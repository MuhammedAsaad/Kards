import React from 'react';
import {View, StyleSheet, Dimensions, Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RadialGradient from 'react-native-radial-gradient';
import Header from '../components/Header';
import MyAppText from '../components/MyAppText';
import {Buttons, CommonStyles} from '../constants';
import how_to_play from '../assets/how_to_play.png';

const {width} = Dimensions.get('window');

const HowToPlay = ({visible, onRequestClose}) => (
  <Modal animationType="fade" visible={visible} onRequestClose={onRequestClose}>
    <RadialGradient radius={width * 0.8} style={[CommonStyles.container, {padding: 25}]} colors={['#ddd', '#bbb']}>
      <Header source={how_to_play} style={{width: '100%'}} />
      <View style={{width: '90%', borderRadius: 30, paddingBottom: 8, backgroundColor: '#44444488'}}>
        <View style={CommonStyles.content}>
          <MyAppText style={styles.text}>👉 You got 111 cards, get ride of them.</MyAppText>
          <MyAppText style={[styles.text, {color: Buttons.green.backgroundColor}]}>
            👆 Slot with Green Up arrow accepts cards in ascending order.
          </MyAppText>
          <MyAppText style={[styles.text, {color: Buttons.pink.backgroundColor}]}>
            👇 Slot with red down arrow accepts cards in descending order.
          </MyAppText>
          <MyAppText style={styles.text}>
            💡 Middle slot is hyperslot as it turned up and down during game (once every 11 rounds).
          </MyAppText>
          <MyAppText style={[styles.text, {textAlign: 'center', marginTop: 20}]}>Best Luck...</MyAppText>
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
  text: {
    color: '#fff',
    marginBottom: 5,
    fontSize: width * 0.04,
  },
});

export default HowToPlay;
