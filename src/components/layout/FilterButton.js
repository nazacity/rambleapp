import React from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import {COLORS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {FilterIcon} from '../Icon';

const FilterButton = ({onPress, top}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: 'absolute',
        top: top ? top : StatusBar.currentHeight,
        right: 10,
        zIndex: 100,
      }}>
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
        <FilterIcon size={18} borderRadius={50} color={COLORS.pinkPastel} />
      </TouchableOpacity>
    </View>
  );
};

export default FilterButton;
