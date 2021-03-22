import React from 'react';
import {View, TouchableOpacity, Platform, StatusBar} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS, SHADOW} from '../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ViewButton = ({top, setView, view}) => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          top: top ? top : Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
          right: 50,
          zIndex: 100,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderRadius: 5,
          overflow: 'hidden',
          backgroundColor: COLORS.backgroundColor,
        },
        SHADOW.default,
      ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setView(0);
        }}
        style={{
          backgroundColor:
            view === 0 ? COLORS.backgroundColor : COLORS.inputPlaceholderColor,
          padding: 5,
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MaterialIcons
          name="view-agenda"
          size={16}
          backgroundColor="transparent"
          color={view === 0 ? COLORS.primary : COLORS.opcaityBlack}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setView(1);
        }}
        style={{
          backgroundColor:
            view === 1 ? COLORS.backgroundColor : COLORS.inputPlaceholderColor,
          padding: 5,
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesome5
          name="map-marked-alt"
          size={16}
          backgroundColor="transparent"
          color={view === 1 ? COLORS.primary : COLORS.opcaityBlack}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ViewButton;
