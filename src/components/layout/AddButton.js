import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants';

const AddButton = ({onPress}) => {
  return (
    <View style={{position: 'absolute', top: 30, right: 10, zIndex: 100}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          backgroundColor: '#fff',
          borderRadius: 50,
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
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
