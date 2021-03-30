import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SHADOW} from '../../constants';
import Announcement2 from '../activity/Announcement2';

const NotificationButton2 = ({value, top, right, activity}) => {
  const [annoucementModalOpen, setAnnoucementModalOpen] = useState(false);
  const handleAnnoucementModalClose = () => {
    setAnnoucementModalOpen(false);
  };
  return (
    <View
      style={[
        {
          position: 'absolute',
          top: top ? top : 0,
          right: right ? right : 0,
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: COLORS.white,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
        },
        SHADOW.default,
      ]}>
      <Announcement2
        open1={annoucementModalOpen}
        handleClose={handleAnnoucementModalClose}
        activity={activity}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          setAnnoucementModalOpen(true);
        }}>
        <Ionicons name="notifications" color={COLORS.primary} size={20} />
        {value > 0 && (
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
                {
                  color: COLORS.white,
                  marginBottom: 2,
                  marginLeft: Platform.OS === 'ios' ? 1 : 0,
                },
              ]}>
              {value}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NotificationButton2;