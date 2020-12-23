import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Caption} from 'react-native-paper';
import AnimatedNumbers from 'react-native-animated-numbers';
import {useSelector} from 'react-redux';
import {SIZES, FONTS, COLORS, SHADOW} from '../../../constants';

const Average = () => {
  const user = useSelector((state) => state.user);
  const [averageSecond, setAverageSecond] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      increateAverageSecond();
    }, 1500);
  }, []);

  const increateAverageSecond = () => {
    setAverageSecond((0.39 * 100) % 100);
  };
  return (
    <AnimatedNumbers
      animateToNumber={averageSecond}
      fontStyle={[FONTS.h2]}
      animationDuration={1200}
    />
  );
};

export default Average;

const styles = StyleSheet.create({});
