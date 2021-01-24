import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import UserDetail from '../../components/home/UserDetail';

import {COLORS} from '../../constants';
// import TopBackground from '../../components/layout/TopBackground';
const ProfileScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <TopBackground /> */}
        <UserDetail marginTop={30} editable={true} />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
