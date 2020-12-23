import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {FONTS} from '../constants';

const Button = ({label, onPress, color}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        {
          borderRadius: 10,
          height: 50,
          width: 300,
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
