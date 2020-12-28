import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';

import BackButton from '../../components/layout/BackButton';
import UserHeader from '../../components/editprofile/UserHeader';
import {COLORS} from '../../constants';

const EditProfileScreen = () => {
  const user = useSelector((state) => state.user);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <BackButton />
      <ScrollView>
        <UserHeader user={user} />
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({});
