import React from 'react';
import {View} from 'react-native';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {FONTS, SHADOW} from '../constants';

const ButtonOutline = ({label, onPress, color, width, leftIcon, textColor}) => {
  return (
    <View
      style={[
        SHADOW.default,
        {
          borderRadius: 5,
          height: 50,
          width: width ? width : 300,
        },
      ]}>
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
          {borderColor: color, borderWidth: 0.5},
          SHADOW.default,
        ]}
        {...{onPress}}>
        <View style={{marginHorizontal: 10}}>{leftIcon && leftIcon()}</View>
        <View style={{position: 'absolute', width: width ? width : 300}}>
          <Text
            style={[
              {
                color: textColor,
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

ButtonOutline.defaultProps = {variant: 'default'};

export default ButtonOutline;
