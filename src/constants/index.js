import {StyleSheet} from 'react-native';

module.exports = {
  Fonts: {
    bold: 'Bungee-Regular',
    regular: 'Montserrat-Regular',
    extra_bold: 'Montserrat-ExtraBold',
  },
  CommonStyles: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
  Buttons: {
    primary: {
      borderTopColor: '#b3ceef',
      backgroundColor: '#497eb5',
      borderBottomColor: '#25506f',
    },
    yellow: {
      borderTopColor: '#fdeab2',
      backgroundColor: '#f9b642',
      borderBottomColor: '#bd721c',
    },
    pink: {
      borderTopColor: '#f6c0eb',
      backgroundColor: '#ed6bd0',
      borderBottomColor: '#b2459f',
    },
    green: {
      borderTopColor: '#91dfd4',
      backgroundColor: '#19ad90',
      borderBottomColor: '#166b5c',
    },
    white: {
      borderTopColor: '#dcf1fb',
      backgroundColor: '#9ed1e9',
      borderBottomColor: '#6793a6',
    },
  },
};
