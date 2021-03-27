import React from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../../constants';

const NotificationBadge = ({value, top, right}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: top ? top : 0,
        right: right ? right : 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.error,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Ionicons name="notifications" color={COLORS.white} size={20} />
      <View
        style={{
          position: 'absolute',
          width: 30,
          height: 30,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={[
            FONTS.body5,
            {color: COLORS.notificationText, marginBottom: 2},
          ]}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default NotificationBadge;
