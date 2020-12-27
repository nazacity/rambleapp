import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Title, Caption, Text} from 'react-native-paper';
import {Avatar, Icon} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import AnimatedNumbers from 'react-native-animated-numbers';

import {SIZES, FONTS, COLORS, SHADOW} from '../../constants';
import Distance from './userdetail/Distance';
import Average from './userdetail/Average';
import Time from './userdetail/Time';

const UserDetail = ({marginTop, editable}) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);

  return (
    <View
      style={[
        {
          backgroundColor: 'white',
          marginBottom: 10,
          marginHorizontal: 20,
          borderRadius: 15,
          overflow: 'hidden',
          marginTop: marginTop ? marginTop : 0,
        },
        SHADOW.default,
      ]}>
      <ImageBackground
        source={{uri: user.user_picture_url}}
        style={{
          flex: 1,
          resizeMode: 'cover',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 25,
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}>
          <Avatar
            rounded
            source={{uri: user.user_picture_url}}
            size={80}
            containerStyle={{
              borderColor: COLORS.primary,
              borderWidth: 2,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: editable ? 30 : 0,
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FONTS.default,
                  fontSize: 16,
                  paddingTop: 4,
                  color: '#fff',
                }}>
                {user.first_name} {user.last_name}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.default,
                  color: 'grey',
                  fontSize: 14,
                }}>
                {user.display_name}
              </Text>
            </View>
            {editable && (
              <TouchableOpacity activeOpacity={0.8} style={{marginLeft: 10}}>
                <MaterialCommunityIcons
                  name="account-edit"
                  color={COLORS.inputPlaceholderColor}
                  size={25}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
      <View style={{flexDirection: 'row', paddingBottom: 20}}>
        <Distance />
        <Average />
        <Time />
      </View>
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({});
