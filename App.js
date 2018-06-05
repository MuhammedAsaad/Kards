import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
// Fonts
import { Fonts } from './assets/Fonts';
// Components
import Splash from './src/components/Splash';
import Main from './src/components/Main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { appLoaded: false }
  }
  componentDidMount() {
    let that = this;
    setTimeout(() => that.setState({appLoaded: true}), 1000);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#283149" />
        { this.state.appLoaded
          ?
            <Main />
          :
            <Splash />
        }
      </View>
    );
  }
}

export default App;