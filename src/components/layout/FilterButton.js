import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const FilterButton = ({onPress, top}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: 'absolute',
        top: top ? top : 40,
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
        <Ionicons
          name="ios-options-sharp"
          size={25}
          borderRadius={50}
          color={COLORS.pinkPastel}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FilterButton;
