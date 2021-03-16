import React from 'react';
import {View, TouchableOpacity, StatusBar, Image, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../../constants';

const ShareButton = ({onPress, top, right}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: top ? top : Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
        right: right ? right : 10,
        zIndex: 100,
        borderRadius: 5,
        backgroundColor: COLORS.greenLine,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <Image
          source={require('../../../assets/line/linebutton.png')}
          style={{width: 30, height: 30}}
        />
        <Text style={[FONTS.h4, {color: COLORS.white}]}>แชร์</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareButton;
