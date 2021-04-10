import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {COLORS, FONTS, SIZES} from '../constants';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';

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
            justifyContent: 'center',
            alignItems: 'center',
            width: SIZES.width,
          }}>
          <Text style={[FONTS.body3]}>Loading...</Text>
          <ActivityIndicator
            style={{padding: 10}}
            size="small"
            color={COLORS.primary}
          />
        </View>
      }
    />
  );
};

export default LoadingPage;
