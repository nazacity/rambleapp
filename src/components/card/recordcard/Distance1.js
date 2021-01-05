import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Caption} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {SIZES, FONTS, COLORS, SHADOW} from '../../../constants';
import LocalizationContext from '../../../screens/LocalizationContext';

const Distance = ({distance}) => {
  const {t} = React.useContext(LocalizationContext);

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'white',
          borderRadius: 15,
          margin: 20,
        },
      ]}>
      <Caption style={[FONTS.h4]}>{t('profile.distance')}</Caption>
      <View style={{height: 30, flexDirection: 'row'}}>
        <Text style={[FONTS.h2]}>{distance}</Text>
      </View>
      <Caption style={[FONTS.h5]}>Km</Caption>
    </View>
  );
};

export default Distance;

const styles = StyleSheet.create({});
