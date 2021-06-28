import React from 'react';
import {View} from 'react-native';
import {Text, TouchableOpacity} from 'react-native';

import {COLORS, FONTS, SHADOW} from '../constants';

const Button = ({label, onPress, color, width, leftIcon, disabled, height}) => {
  return (
    <View
      style={[
        SHADOW.default,
        {
          borderRadius: 5,
          height: height ? height : 50,
          width: width ? width : 300,
          backgroundColor: COLORS.backgroundColor,
        },
      ]}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.9}
        style={[
          {
            borderRadius: 5,
            height: height ? height : 50,
            width: width ? width : 300,
            alignItems: 'center',
            flexDirection: 'row',
          },
          {backgroundColor: color},
          SHADOW.default,
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
    </View>
  );
};

Button.defaultProps = {variant: 'default'};

export default Button;
