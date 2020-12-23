import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Caption} from 'react-native-paper';
import AnimatedNumbers from 'react-native-animated-numbers';
import {useSelector} from 'react-redux';
import {SIZES, FONTS, COLORS, SHADOW} from '../../../constants';
import LocalizationContext from '../../../screens/LocalizationContext';
import AverageMin from './AverageMin';
import AverageSecond from './AverageSecond';

const Average = () => {
  const {t} = React.useContext(LocalizationContext);

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 20,
          borderRightColor: '#dddddd',
          borderRightWidth: 1,
          flex: 1,
          marginTop: -20,
          paddingVertical: 30,
        },
        SHADOW.default,
      ]}>
      <Caption style={[FONTS.h3]}>{t('profile.average')}</Caption>
      <View style={{height: 30, flexDirection: 'row'}}>
        <AverageMin />
        <Text style={[FONTS.h2]}>:</Text>
        <AverageSecond />
      </View>
      <Caption style={[FONTS.h5]}>Min/Kr</Caption>
    </View>
  );
};

export default Average;

const styles = StyleSheet.create({});
