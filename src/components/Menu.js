import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableNativeFeedback, BackHandler, Modal, Dimensions, ScrollView } from "react-native";
// Fonts
import { Fonts } from '../../assets/Fonts';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window')

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { isInfo : false }
  }
  render() {
    return (
      <View style={styles.container} >

        <Text style={styles.title} >111 Kards</Text>
        <TouchableNativeFeedback onPress={() => this.props.switchMenu()} >
          <View style={styles.btn} > 
            <Text style={[styles.btnTxt, {color: '#F73859'}]} >Start</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => this.setState({isInfo: !this.state.isInfo})} >
          <View style={styles.btn} > 
            <Text style={[styles.btnTxt, {color: '#27ae60'}]} >How to play</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => BackHandler.exitApp()} >
          <View style={styles.btn} > 
            <Text style={styles.btnTxt} >Exit</Text>
          </View>
        </TouchableNativeFeedback>

        <Modal
          animationType="slide"
          visible={this.state.isInfo}
          onRequestClose={() => this.setState({isInfo: false}) }>
          <View style={styles.container}>
            <View style={styles.infoContainer} >
              <ScrollView showsVerticalScrollIndicator={false} >
                <Text style={styles.infoTxtHeading} >How to play !</Text>
                <Text style={[styles.infoTxt, {color: '#255883'}]} >1- You got 111 cards, get ride of them.</Text>
                <Text style={[styles.infoTxt, {color: '#F73859'}]} >2- Slot with Red Down arrow accepts cards in descending order.</Text>
                <Text style={[styles.infoTxt, {color: '#27ae60'}]} >3- Slot with Green Up arrow accepts cards in ascending order.</Text>
                <Text style={[styles.infoTxt, {color: '#255883'}]} >4- Middle Slot is Hyperslot as it turned up and down during game (4 Times).</Text>
                <Text style={[styles.infoTxt, {color: '#255883', textAlign: 'center', marginTop: 20}]} >Best Luck.</Text>
              </ScrollView>
            </View>
            <TouchableNativeFeedback onPress={() => this.setState({isInfo: false})} >
              <View style={styles.closeBtn} >
                <Icon size={width * .08} name={'ios-close-circle-outline'} color={'#fff'} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#283149'
  },
  title: {
    paddingHorizontal: 30, 
    paddingVertical: 12, 
    backgroundColor: '#eee', 
    fontFamily: Fonts.MontserratB, 
    fontSize: width * .15, 
    color: '#F73859', 
    marginBottom: 35,
    borderRadius: 5
  },
  btn: {
    padding: 15,
    marginTop: 15,
    backgroundColor: '#eee', 
    minWidth: width * .5,
    borderRadius: 5
  },
  btnTxt: {
    textAlign: 'center', 
    fontFamily: Fonts.Montserrat, 
    fontSize: width * .05
  },
  infoContainer: {
    backgroundColor: '#fff', 
    padding: 25, 
    width: width * .9,
    maxHeight: height - 100,
    borderRadius: 5,
    elevation: 3
  },
  infoTxtHeading: {
    fontFamily: Fonts.MontserratB, 
    fontSize: width * .08, 
    color: '#255883',
    textAlign: 'center', 
    marginBottom: 30
  },
  infoTxt: {
    fontFamily: Fonts.Montserrat, 
    fontSize: width * .06,
    marginBottom: 5
  },
  closeBtn: {
    width: width * .12, 
    height: width * .12, 
    backgroundColor: '#F73859', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  }
});

export default Menu;