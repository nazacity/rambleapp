import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SIZES, COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TopBackground = ({menu, marginBottom}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: 20,
        backgroundColor: COLORS.primary,
        marginBottom: marginBottom ? marginBottom : 0,
      }}>
      {menu && (
        <View style={{position: 'absolute', top: 10, left: 10, zIndex: 100}}>
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
      )}
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 200,
          width: SIZES.width / 2,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 200,
            width: SIZES.width / 2,
            borderTopLeftRadius: 500,
          }}></View>
      </View>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 200,
          width: SIZES.width / 2,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 200,
            width: SIZES.width / 2,
            borderTopRightRadius: 500,
          }}></View>
      </View>
    </View>
  );
};

export default TopBackground;
