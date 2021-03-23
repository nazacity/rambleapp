import React from 'react';
import {View, TouchableOpacity, Platform, StatusBar} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS, SHADOW} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ViewButton = ({top, setDark, dark}) => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          top: 140,
          right: 10,
          zIndex: 100,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          overflow: 'hidden',
          backgroundColor: COLORS.backgroundColor,
        },
        SHADOW.default,
      ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setDark(false);
        }}
        style={{
          backgroundColor: !dark
            ? COLORS.backgroundColor
            : COLORS.inputPlaceholderColor,
          padding: 5,
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Ionicons
          name="md-sunny-outline"
          size={16}
          backgroundColor="transparent"
          color={!dark ? COLORS.primary : COLORS.opcaityBlack}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setDark(true);
        }}
        style={{
          backgroundColor: dark
            ? COLORS.backgroundColor
            : COLORS.inputPlaceholderColor,
          padding: 5,
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesome5
          name="moon"
          size={12}
          backgroundColor="transparent"
          color={dark ? COLORS.primary : COLORS.opcaityBlack}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ViewButton;
