import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {COLORS, SHADOW} from '../../../constants';
import {OutlinedHeartIcon, HeartIcon} from '../../Icon';

const LoveButton = ({top, right, size}) => {
  const [loved, setLoved] = useState(false);
  const onPress = () => {
    setLoved(!loved);
  };
  return (
    <View
      style={[
        {
          position: 'absolute',
          top: top ? top : 10,
          right: right ? right : 20,
          width: size ? size : 24,
          height: size ? size : 24,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5000,
        },
        SHADOW.default,
      ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          {
            width: size ? size : 24,
            height: size ? size : 24,
            borderRadius: 15,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          },
          SHADOW.default,
        ]}
        onPress={onPress}>
        {loved ? (
          <HeartIcon color="red" size={size ? size - 12 : 14} />
        ) : (
          <OutlinedHeartIcon color="red" size={size ? size - 12 : 14} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoveButton;
