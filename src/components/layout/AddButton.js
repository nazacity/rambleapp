import React from 'react';
import {View, TouchableOpacity, StatusBar, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants';

const AddButton = ({onPress, top}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: top ? top : Platform.OS === 'ios' ? 40 : 20,
        right: 10,
        zIndex: 100,
        backgroundColor: '#fff',
        borderRadius: 50,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Ionicons
          name="add"
          size={25}
          backgroundColor="transparent"
          color={COLORS.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddButton;
