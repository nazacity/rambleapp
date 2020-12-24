import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack';

const BackButton = ({onPress}) => {
  const navigation = useNavigation();
  return (
    <View style={{position: 'absolute', top: 10, left: 10, zIndex: 100}}>
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
        <HeaderBackButton
          tintColor={COLORS.primary}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
