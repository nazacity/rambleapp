import React from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import {FONTS} from '../../constants';
import Animated from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

export const SLIDE_HEIGHT = 0.5 * height;

const Slide = ({title, right, opacity}) => {
  const transform = [
    {translateY: (SLIDE_HEIGHT - 100) / 2},
    {translateX: right ? width / 2 - 30 : -width / 2 + 30},
    {rotate: right ? '-90deg' : '90deg'},
  ];
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.titleContainer,
          {
            transform: transform,
            opacity,
          },
        ]}>
        <Text style={[FONTS.onboardinghero]}>{title}</Text>
      </Animated.View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    width,
  },
  titleContainer: {
    height: 100,
    justifyContent: 'center',
  },
});
