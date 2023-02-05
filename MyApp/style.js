'use strict';
import { StyleSheet } from 'react-native';

const page = StyleSheet.create({
    title: {
      marginTop: 8,
      color: '$gray',
      textAlign: 'left',
      fontSize: 20,
      fontWeight: 'bold',
      font: 'Helvetica',
    },
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '$fakeWhite',
    },
  });

export{page}

export const COLORS = {
  grey: '#595959',
  main: '#541388',
  pink: '#d90368',
  blue: '#2e294e',
  yellowColor: '#ffd400',
  fakeWhite: '#E7E4DF',
}