import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import {FONTS, COLORS} from '../../constants';
import ForgotPasswordForm from '../../components/authorizing/ForgotPasswordForm';

const ForgotPasswordScreen = ({navigation}) => {
  const SLIDE_HEIGHT = 100;

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          {
            height: SLIDE_HEIGHT,
            borderBottomRightRadius: 75,
            backgroundColor: COLORS.pinkPastel,
          },
        ]}></View>
      <View style={{flex: 1}}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: COLORS.pinkPastel,
          }}></View>
        <ForgotPasswordForm />
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
