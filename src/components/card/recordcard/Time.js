import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Caption} from 'react-native-paper';
import AnimatedNumbers from 'react-native-animated-numbers';
import {useSelector} from 'react-redux';
import {SIZES, FONTS, COLORS, SHADOW} from '../../../constants';
import LocalizationContext from '../../../screens/LocalizationContext';
import TimeMin from './TimeMin';
import TimeHour from './TimeHour';

const Average = () => {
  const {t} = React.useContext(LocalizationContext);

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'white',
          borderRadius: 15,
          width: 120,
        },
      ]}>
      <Caption style={[FONTS.h3]}>{t('profile.time')}</Caption>
      <View style={{height: 30, flexDirection: 'row'}}>
        <TimeHour />
        <Text style={[FONTS.h2]}>:</Text>
        <TimeMin />
      </View>
      <Caption style={[FONTS.h5]}>Hr</Caption>
    </View>
  );
};

export default Average;

const styles = StyleSheet.create({});
