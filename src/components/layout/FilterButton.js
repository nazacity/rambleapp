import React from 'react';
import {View, Text, TouchableOpacity, StatusBar, Platform} from 'react-native';
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
        top: top ? top : Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
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
        <FilterIcon size={14} borderRadius={50} color={COLORS.pinkPastel} />
      </TouchableOpacity>
    </View>
  );
};

export default FilterButton;
