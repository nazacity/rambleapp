import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {FONTS} from '../constants';

const Button = ({label, onPress, color, width}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        {
          borderRadius: 10,
          height: 50,
          width: width ? width : 300,
          justifyContent: 'center',
          alignItems: 'center',
        },
        {backgroundColor: color},
      ]}
      {...{onPress}}>
      <Text
        style={[
          {
            color: '#fff',
            textAlign: 'center',
          },
          FONTS.h3,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {variant: 'default'};

export default Button;
