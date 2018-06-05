import React, { Component } from "react";
import { View, BackHandler } from "react-native";
// Fonts
import { Fonts } from '../../assets/Fonts';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
// Components
import Menu from './Menu';
import Game from './Game';

class Main extends Component {
  constructor(props) {
    super(props);
    this.switchMenu = this.switchMenu.bind(this);
    this.state = { gameStarted: false }
  }

  switchMenu() { this.setState({ gameStarted: !this.state.gameStarted }) }

  render() {
    return (
      <View style={{flex: 1}} >
        { this.state.gameStarted ? 
          <Game switchMenu={this.switchMenu} />
          :
          <Menu switchMenu={this.switchMenu} />
        }
      </View>
    );
  }
}

export default Main;