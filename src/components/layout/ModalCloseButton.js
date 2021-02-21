import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../constants';
const ModalCloseButton = ({onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        position: 'absolute',
        zIndex: 100,
        top: 10,
        right: 10,
      }}
      onPress={onPress}>
      <MaterialIcons name="cancel" color={COLORS.buttonBlue} size={24} />
    </TouchableOpacity>
  );
};

export default ModalCloseButton;
