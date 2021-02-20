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
      textStyle={{
        color: '#FFF',
      }}
      color={COLORS.pinkPastel}
      // customIndicator={
      //   <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
      //     <Text
      //       style={{
      //         fontFamily: theme.fontFamily.default,
      //         fontSize: 18,
      //         padding: 10,
      //       }}>
      //       Loading...
      //     </Text>
      //     <ActivityIndicator
      //       style={{padding: 10}}
      //       size="small"
      //       color={theme.colors.primary}
      //     />
      //   </View>
      // }
    />
  );
};

export default LoadingPage;
