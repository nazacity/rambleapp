import React from 'react';
import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
// import {useSelector} from 'react-redux';
import {FONTS, COLORS} from '../../constants';
// import LocalizationContext from '../LocalizationContext';
import SignupForm from '../../components/authorizing/SignupForm';

const SigninScreen = () => {
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
        <SignupForm />
      </View>
    </ScrollView>
  );
};

export default SigninScreen;
