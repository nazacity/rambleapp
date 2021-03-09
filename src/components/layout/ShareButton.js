import React from 'react';
import {View, TouchableOpacity, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants';

const ShareButton = ({onPress, top, right}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: top ? top : Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
        right: right ? right : 10,
        zIndex: 100,
        borderRadius: 50,
        width: 30,
        height: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Ionicons name="share-social" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default ShareButton;
