import React from 'react';
import {View, Image, Platform} from 'react-native';
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
          {Platform.OS === 'android' ? (
            <LottieView
              autoPlay={true}
              loop={true}
              source={require('../../assets/loader/Loader.json')}
              style={{width: 100, height: 100}}
            />
          ) : (
            <Image
              source={require('../../assets/loader/ramble640.gif')}
              style={{width: 100, height: 100, resizeMode: 'contain'}}
            />
          )}
        </View>
      }
    />
  );
};

export default LoadingPage;
