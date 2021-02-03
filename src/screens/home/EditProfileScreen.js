import React from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';

import BackButton from '../../components/layout/BackButton';
import UserHeader from '../../components/editprofile/UserHeader';
import FirstNameDisplay from '../../components/editprofile/FirstNameDisplay';
import {COLORS} from '../../constants';
import LastNameDisplay from '../../components/editprofile/LastNameDisplay';
import DisplayNameDisplay from '../../components/editprofile/DisplayNameDisplay';
import PhoneDisplay from '../../components/editprofile/PhoneDisplay';
import ChangePasswordDisplay from '../../components/editprofile/ChangePasswordDisplay';
import LineConnectDisplay from '../../components/editprofile/LineConnectDisplay';

const EditProfileScreen = () => {
  const user = useSelector((state) => state.user);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <BackButton />
      <ScrollView>
        <UserHeader user={user} />
        <View style={{padding: 20}}>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <FirstNameDisplay user={user} />
            <LastNameDisplay user={user} />
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <DisplayNameDisplay user={user} />
            <View style={{width: '55%'}} />
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <PhoneDisplay user={user} />
            <View style={{width: '55%'}} />
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: 'rgba(0,0,0,0.6)',
          }}
        />
        <ChangePasswordDisplay />
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: 'rgba(0,0,0,0.6)',
          }}
        />
        <LineConnectDisplay />
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: 'rgba(0,0,0,0.6)',
          }}
        />
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
