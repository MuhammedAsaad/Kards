import React from 'react';
import {Text} from 'react-native';
import {Fonts} from '../constants';

const MyAppText = ({style, children}) => <Text style={[{fontFamily: Fonts.bold}, style]}>{children}</Text>;

export default MyAppText;
