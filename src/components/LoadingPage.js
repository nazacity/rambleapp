import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {COLORS, FONTS, SIZES} from '../constants';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingPage = () => {
  const isLoading = useSelector((state) => state.appState.isLoading);
  return (
    <Spinner
      visible={isLoading}
      animation="fade"
      customIndicator={
        <View
          style={{
            backgroundColor: COLORS.backgroundColor,
            padding: 20,
            borderRadius: 10,
            flex: 1,
            width: SIZES.width,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            autoPlay={true}
            loop={true}
            source={require('../../assets/loader/Loader.json')}
            style={{width: 100, height: 100}}
          />
        </View>
      }
    />
  );
};

export default LoadingPage;
