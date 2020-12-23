import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {COLORS} from '../constants';
import {useSelector} from 'react-redux';

const LoadingPage = () => {
  const isLoading = useSelector((state) => state.appState.isLoading);
  return (
    <Spinner
      visible={isLoading}
      textContent={'Loading...'}
      textStyle={{
        color: '#FFF',
      }}
      color={COLORS.pinkPastel}
    />
  );
};

export default LoadingPage;
