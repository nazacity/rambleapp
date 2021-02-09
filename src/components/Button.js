import React from 'react';
import {View} from 'react-native';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {FONTS} from '../constants';

const Button = ({label, onPress, color, width, leftIcon}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        {
          borderRadius: 5,
          height: 50,
          width: width ? width : 300,
          alignItems: 'center',
          flexDirection: 'row',
        },
        {backgroundColor: color},
      ]}
      {...{onPress}}>
      <View style={{marginHorizontal: 10}}>{leftIcon && leftIcon()}</View>
      <View style={{position: 'absolute', width: width ? width : 300}}>
        <Text
          style={[
            {
              color: '#fff',
              textAlign: 'center',
            },
            FONTS.button,
          ]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Button.defaultProps = {variant: 'default'};

export default Button;
