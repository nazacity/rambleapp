import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS, SHADOW} from '../../../../constants';
import {OutlinedHeartIcon, HeartIcon} from '../../../Icon';

const LoveButton = ({
  top,
  right,
  size,
  likers,
  handleLike,
  handleUnlike,
  id,
}) => {
  const user = useSelector((state) => state.user);
  const [loved, setLoved] = useState(false);
  const [disable, setDisable] = useState(false);
  const onPress = async () => {
    setDisable(true);
    if (loved) {
      setLoved(false);
      await handleUnlike(id);
    } else {
      setLoved(true);
      await handleLike(id);
    }
    setTimeout(() => {
      setDisable(false);
    }, 1200);
  };
  useEffect(() => {
    if (likers.includes(user._id)) {
      setLoved(true);
    }
  }, [likers]);
  return (
    <View
      disabled={disable}
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
