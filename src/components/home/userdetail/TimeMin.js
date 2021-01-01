import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {FONTS} from '../../../constants';

const Average = () => {
  const user = useSelector((state) => state.user);

  return <Text style={[FONTS.h2]}>{user.user_recode.time_min}</Text>;
};

export default Average;

const styles = StyleSheet.create({});
