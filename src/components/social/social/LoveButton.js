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
          width: 30,
          height: 30,
          borderRadius: 15,
          zIndex: 5000,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          {
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
        onPress={onPress}>
        {loved ? (
          <HeartIcon color="red" size={20} />
        ) : (
          <OutlinedHeartIcon color="red" size={20} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoveButton;
