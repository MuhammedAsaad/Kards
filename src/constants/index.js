import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

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
    content: {
      paddingTop: 25,
      paddingBottom: 15,
      borderEndWidth: 4,
      borderStartWidth: 4,
      borderBottomWidth: 4,
      paddingHorizontal: 25,
      backgroundColor: '#3e5167',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    contentOuterShadow: {
      width: '60%',
      borderRadius: 30,
      paddingBottom: 8,
      backgroundColor: '#44444488',
    },
    contentInnerShadow: {
      top: 0,
      left: 0,
      right: 0,
      height: 6,
      position: 'absolute',
      backgroundColor: '#313f4bee',
    },
    close: {
      marginTop: -8,
      width: width * 0.12,
      height: width * 0.12,
      alignItems: 'center',
      backgroundColor: '#666',
      justifyContent: 'center',
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
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
