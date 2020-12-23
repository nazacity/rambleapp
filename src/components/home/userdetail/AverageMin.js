import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Caption} from 'react-native-paper';
import AnimatedNumbers from 'react-native-animated-numbers';
import {useSelector} from 'react-redux';
import {SIZES, FONTS, COLORS, SHADOW} from '../../../constants';

const Average = () => {
  const user = useSelector((state) => state.user);
  const [averageMin, setAverageMin] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      increateAverageMin();
    }, 1500);
  }, []);

  const increateAverageMin = () => {
    setAverageMin(parseInt(user.user_recode.speed_average));
  };

  return (
    <AnimatedNumbers
      animateToNumber={averageMin}
      fontStyle={[FONTS.h2]}
      animationDuration={700}
    />
  );
};

export default Average;

const styles = StyleSheet.create({});
