import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";

class Splash extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#283149', alignItems: 'center', justifyContent: 'center'}} >
        <ActivityIndicator size="large" color="#F73859" />
      </View>
    );
  }
}

export default Splash;