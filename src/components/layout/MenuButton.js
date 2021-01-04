import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const MenuButton = ({top}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: 'absolute',
        top: top ? top : 40,
        left: 10,
        zIndex: 100,
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.openDrawer()}
        style={{
          backgroundColor: '#fff',
          borderRadius: 50,
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Ionicons
          name="ios-menu"
          size={25}
          borderRadius={50}
          color={COLORS.pinkPastel}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MenuButton;