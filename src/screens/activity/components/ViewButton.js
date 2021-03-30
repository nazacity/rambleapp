import React from 'react';
import {View, TouchableOpacity, Platform, StatusBar} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS, SHADOW} from '../../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ViewButton = ({top, setView, view, loadAll, setState}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.white,
          marginHorizontal: 10,
          borderRadius: 3,
        },
        SHADOW.default,
      ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={async () => {
          setState('0');
          await loadAll();
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
        onPress={async () => {
          setState('0');
          await loadAll();
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
