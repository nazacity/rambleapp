import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import UserDetail from '../../components/home/UserDetail';

import {COLORS, FONTS, SHADOW} from '../../constants';
import MenuButton from '../../components/layout/MenuButton';
import LocalizationContext from '../LocalizationContext';
import {EmergencyIcon, LocationIcon} from '../../components/Icon';
import {useNavigation} from '@react-navigation/native';
// import TopBackground from '../../components/layout/TopBackground';
const ProfileScreen = () => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <MenuButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <TopBackground /> */}
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 100,
          }}></View>
        <UserDetail marginTop={-30} editable={true} />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            marginBottom: 20,
          }}>
          <View
            style={[
              {
                flex: 1,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                height: 50,
                alignItems: 'center',
                flexDirection: 'row',
                padding: 20,
              },
              SHADOW.default,
            ]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('Address');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                flex: 1,
              }}>
              <LocationIcon color={COLORS.opcaityBlack} size={24} />
              <Text
                style={[
                  FONTS.h4,
                  {color: COLORS.opcaityBlack, marginLeft: 20},
                ]}>
                {t('drawer.address')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{margin: 5}} />
          <View
            style={[
              {
                flex: 1,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                height: 50,
                alignItems: 'center',
                flexDirection: 'row',
                padding: 20,
              },
              SHADOW.default,
            ]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('EmergencyContact');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                flex: 1,
              }}>
              <EmergencyIcon color={COLORS.opcaityBlack} size={20} />
              <Text
                style={[
                  FONTS.h4,
                  {color: COLORS.opcaityBlack, marginLeft: 20},
                ]}>
                {t('drawer.emergencycontact')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
