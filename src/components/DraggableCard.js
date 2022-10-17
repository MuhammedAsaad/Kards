import React, {useRef} from 'react';
import {View, Animated, Dimensions, StyleSheet, PanResponder} from 'react-native';
import MyAppText from '../components/MyAppText';
import {Fonts, Buttons} from '../constants';

const {width} = Dimensions.get('window');

const DraggableCard = ({number, dropZones, updateValue, theme = Buttons.white}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (e, gesture) => isDropZone(gesture),
      onPanResponderGrant: () => pan.setOffset({x: pan.x._value, y: pan.y._value}),
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false}),
    }),
  ).current;

  const isDropZone = gesture => {
    if (
      gesture.moveY > dropZones.areaOne.coordinate.y + 100 &&
      gesture.moveY < dropZones.areaOne.coordinate.y + dropZones.areaOne.coordinate.height + 100
    ) {
      if (
        gesture.moveX > dropZones.areaOne.coordinate.x &&
        gesture.moveX < dropZones.areaOne.coordinate.x + dropZones.areaOne.coordinate.width &&
        (dropZones.areaOne.value === null ||
          dropZones.areaOne.value > number ||
          dropZones.areaOne.value === number - 10)
      ) {
        updateValue('areaOne', number);
      } else if (
        (gesture.moveX > dropZones.areaTwo.coordinate.x &&
          gesture.moveX < dropZones.areaTwo.coordinate.x + dropZones.areaTwo.coordinate.width &&
          dropZones.areaTwo.role === false &&
          (dropZones.areaTwo.value === null ||
            dropZones.areaTwo.value > number ||
            dropZones.areaTwo.value === number - 10)) ||
        (gesture.moveX > dropZones.areaTwo.coordinate.x &&
          gesture.moveX < dropZones.areaTwo.coordinate.x + dropZones.areaTwo.coordinate.width &&
          dropZones.areaTwo.role === true &&
          (dropZones.areaTwo.value === null ||
            dropZones.areaTwo.value < number ||
            dropZones.areaTwo.value === number + 10))
      ) {
        updateValue('areaTwo', number);
      } else if (
        gesture.moveX > dropZones.areaThree.coordinate.x &&
        gesture.moveX < dropZones.areaThree.coordinate.x + dropZones.areaThree.coordinate.width &&
        (dropZones.areaThree.value === null ||
          dropZones.areaThree.value < number ||
          dropZones.areaThree.value === number + 10)
      ) {
        updateValue('areaThree', number);
      } else {
        resetPosition();
      }
    } else {
      resetPosition();
    }
  };

  const resetPosition = () =>
    Animated.spring(pan, {friction: 10, toValue: {x: 0, y: 0}, useNativeDriver: false}).start();

  return (
    <Animated.View
      style={{transform: [{translateX: pan.x}, {translateY: pan.y}], ...styles.wrapper}}
      {...panResponder.panHandlers}>
      <View style={{flex: 1, backgroundColor: theme.borderTopColor, paddingTop: 2, borderRadius: 6}}>
        <View style={{flex: 1, borderRadius: 6, paddingBottom: 4, backgroundColor: theme.borderBottomColor}}>
          <MyAppText style={[styles.text, {backgroundColor: theme.backgroundColor}]}>{number}</MyAppText>
        </View>
      </View>
    </Animated.View>
  );
};

let styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    borderRadius: 6,
    paddingBottom: 2,
    backgroundColor: '#55555555',
  },
  text: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    color: '#222222cc',
    textShadowRadius: 1,
    fontFamily: Fonts.bold,
    textShadowColor: '#fff',
    fontSize: width * 0.045,
    lineHeight: width * 0.045,
    textTransform: 'uppercase',
    textShadowOffset: {width: 0.5, height: 0.5},
  },
});

export default DraggableCard;
