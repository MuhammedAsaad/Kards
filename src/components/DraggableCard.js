import React, {Component} from 'react';
import {Text, Animated, Dimensions, StyleSheet, PanResponder} from 'react-native';

const {width} = Dimensions.get('window');

export default class DraggableCard extends Component {
  constructor(props) {
    super(props);
    this.state = {pan: new Animated.ValueXY()};
    // Add a listener for the delta value change
    this._val = {x: 0, y: 0};
    this.state.pan.addListener(value => (this._val = value));
    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([null, {dx: this.state.pan.x, dy: this.state.pan.y}]),
      onPanResponderRelease: (e, gesture) => this.isDropZone(gesture),
    });
  }

  isDropZone(gesture) {
    var dz = this.props.dropZones,
      value = this.props.number,
      areaTwoRole = dz.areaTwo.role;

    if (
      gesture.moveY > dz.areaOne.coordinate.y + 100 &&
      gesture.moveY < dz.areaOne.coordinate.y + dz.areaOne.coordinate.height + 100
    ) {
      if (
        gesture.moveX > dz.areaOne.coordinate.x &&
        gesture.moveX < dz.areaOne.coordinate.x + dz.areaOne.coordinate.width &&
        (dz.areaOne.value === null || dz.areaOne.value > value || dz.areaOne.value === value - 10)
      ) {
        this.props.updateValue('areaOne', value);
      } else if (
        gesture.moveX > dz.areaTwo.coordinate.x &&
        gesture.moveX < dz.areaTwo.coordinate.x + dz.areaTwo.coordinate.width &&
        areaTwoRole === true &&
        (dz.areaTwo.value === null || dz.areaTwo.value < value || dz.areaTwo.value === value + 10)
      ) {
        this.props.updateValue('areaTwo', value);
      } else if (
        gesture.moveX > dz.areaTwo.coordinate.x &&
        gesture.moveX < dz.areaTwo.coordinate.x + dz.areaTwo.coordinate.width &&
        areaTwoRole === false &&
        (dz.areaTwo.value === null || dz.areaTwo.value > value || dz.areaTwo.value === value - 10)
      ) {
        this.props.updateValue('areaTwo', value);
      } else if (
        gesture.moveX > dz.areaThree.coordinate.x &&
        gesture.moveX < dz.areaThree.coordinate.x + dz.areaThree.coordinate.width &&
        (dz.areaThree.value === null || dz.areaThree.value < value || dz.areaThree.value === value + 10)
      ) {
        this.props.updateValue('areaThree', value);
      } else {
        Animated.spring(this.state.pan, {
          toValue: {x: 0, y: 0},
          friction: 10,
        }).start();
      }
    } else {
      Animated.spring(this.state.pan, {
        toValue: {x: 0, y: 0},
        friction: 10,
      }).start();
    }
  }

  render() {
    const panStyle = {transform: this.state.pan.getTranslateTransform()};
    return (
      <Animated.View {...this.panResponder.panHandlers} style={[panStyle, styles.card]}>
        <Text style={styles.cardTxt}>{this.props.number}</Text>
      </Animated.View>
    );
  }
}

let styles = StyleSheet.create({
  card: {
    backgroundColor: '#283149',
    flex: 1,
    width: '100%',
    padding: 7,
    elevation: 3,
    borderRadius: 5,
  },
  cardTxt: {
    color: '#fff',
    fontSize: width * 0.05,
  },
});
