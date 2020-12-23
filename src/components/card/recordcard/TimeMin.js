import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Caption} from 'react-native-paper';
import AnimatedNumbers from 'react-native-animated-numbers';
import {useSelector} from 'react-redux';
import {SIZES, FONTS, COLORS, SHADOW} from '../../../constants';

const Average = () => {
  const user = useSelector((state) => state.user);
  const [time, setTimeMin] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      increateTimeMin();
    }, 1500);
  }, []);

  const increateTimeMin = () => {
    setTimeMin(user.user_recode.time_min);
  };
  return (
    <AnimatedNumbers
      animateToNumber={time}
      fontStyle={[FONTS.h2]}
      animationDuration={1500}
    />
  );
};

export default Average;

const styles = StyleSheet.create({});
