import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import UserDetail from '../../components/home/UserDetail';

import {COLORS} from '../../constants';
import MenuButton from '../../components/layout/MenuButton';
// import TopBackground from '../../components/layout/TopBackground';
const ProfileScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <MenuButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <TopBackground /> */}
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 200,
          }}></View>
        <UserDetail marginTop={-90} editable={true} />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
