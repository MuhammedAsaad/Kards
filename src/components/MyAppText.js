import React from 'react';
import {Text} from 'react-native';
import {Fonts} from '../constants';

const MyAppText = ({style, children}) => <Text style={[{fontFamily: Fonts.regular}, style]}>{children}</Text>;

export default MyAppText;
