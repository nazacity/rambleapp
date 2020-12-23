import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Caption} from 'react-native-paper';
import AnimatedNumbers from 'react-native-animated-numbers';
import {useSelector} from 'react-redux';
import {SIZES, FONTS, COLORS, SHADOW} from '../../../constants';

const Average = () => {
  const user = useSelector((state) => state.user);
  const [time, setTimeHour] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      increateTimeHour();
    }, 1500);
  }, []);

  const increateTimeHour = () => {
    setTimeHour(user.user_recode.time_hr);
  };
  return (
    <AnimatedNumbers
      animateToNumber={time}
      fontStyle={[FONTS.h2]}
      animationDuration={900}
    />
  );
};

export default Average;

const styles = StyleSheet.create({});
