import React from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {SIZES} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';

const CardSize = SIZES.width - 80;
const CardHeight = ((SIZES.width - 80) * 2) / 3;

const ActivityCard = ({item, children, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        width: CardSize,
        height: CardHeight,
        borderRadius: 20,
        overflow: 'hidden',
      }}>
      <ImageBackground
        source={{uri: item.activity.id.activity_picture_url}}
        style={{
          width: CardSize,
          height: CardHeight,
          resizeMode: 'cover',
        }}>
        <LinearGradient
          colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,1)']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          useAngle
          angle={180}
          style={{
            flex: 1,

            left: 0,
            top: 0,
            width: CardSize,
            height: CardHeight,
          }}
        />
        {children}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ActivityCard;
