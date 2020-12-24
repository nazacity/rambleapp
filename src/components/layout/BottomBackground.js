import React from 'react';
import {View, Text} from 'react-native';
import {SIZES, COLORS} from '../../constants';

const BottomBackground = ({marginTop}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        zIndex: -1,
        marginTop: marginTop ? marginTop : 0,
        paddingBottom: 20,
        backgroundColor: COLORS.primary,
      }}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 200,
          width: SIZES.width / 2,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 200,
            width: SIZES.width / 2,
            borderBottomLeftRadius: 500,
          }}></View>
      </View>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 200,
          width: SIZES.width / 2,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 200,
            width: SIZES.width / 2,
            borderBottomRightRadius: 500,
          }}></View>
      </View>
    </View>
  );
};

export default BottomBackground;
