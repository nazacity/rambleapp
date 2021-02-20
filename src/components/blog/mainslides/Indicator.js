import React from 'react';
import {Animated} from 'react-native';
import {SIZES, FONTS, COLORS, SHADOW} from '../../../constants';
const Indicator = ({measures, scrollX, data}) => {
  const inputRange = data.map((_, i) => i * SIZES.width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: 4,
        width: indicatorWidth,
        backgroundColor: 'white',
        bottom: -10,
        left: 0,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

export default Indicator;
