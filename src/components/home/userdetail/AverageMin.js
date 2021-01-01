import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Caption} from 'react-native-paper';
import AnimatedNumbers from 'react-native-animated-numbers';
import {useSelector} from 'react-redux';
import {SIZES, FONTS, COLORS, SHADOW} from '../../../constants';

const Average = () => {
  const user = useSelector((state) => state.user);

  return <Text style={[FONTS.h2]}>{user.user_recode.speed_average}</Text>;
};

export default Average;

const styles = StyleSheet.create({});
