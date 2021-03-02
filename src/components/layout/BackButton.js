import React from 'react';
import {View, Text, TouchableOpacity, Platform, StatusBar} from 'react-native';
import {COLORS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack';

const BackButton = ({backTo, top}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: 'absolute',
        top: top ? top : Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
        left: 10,
        zIndex: 100,
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: '#fff',
          borderRadius: 50,
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          if (backTo) {
            navigation.replace(backTo);
          } else {
            navigation.goBack();
          }
        }}>
        {Platform.OS === 'ios' ? (
          <Ionicons
            name="ios-chevron-back"
            size={30}
            color={COLORS.primary}
            style={{marginLeft: -3, marginTop: -1}}
            onPress={() => {
              if (backTo) {
                navigation.push(backTo);
              } else {
                navigation.goBack();
              }
            }}
          />
        ) : (
          <HeaderBackButton
            tintColor={COLORS.primary}
            labelVisible={false}
            onPress={() => {
              if (backTo) {
                navigation.push(backTo);
              } else {
                navigation.goBack();
              }
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
