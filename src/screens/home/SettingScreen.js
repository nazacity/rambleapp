import React from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import ChangePasswordDisplay from '../../components/editprofile/ChangePasswordDisplay';
// import LineConnectDisplay from '../../components/editprofile/LineConnectDisplay';
// import VerifyIdentifyDisplay from '../../components/editprofile/VerifyIdentifyDisplay';
// import VerifyVaccineDisplay from '../../components/editprofile/VerifyVaccineDisplay';

import {COLORS, SIZES} from '../../constants';

const SettingScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <ChangePasswordDisplay />
      <View style={styles.line} />
      {/* <LineConnectDisplay />
      <View style={styles.line} />
      <VerifyIdentifyDisplay />
      <View style={styles.line} />
      <VerifyVaccineDisplay />
      <View style={styles.line} /> */}
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    width: SIZES.width - 60,
    alignSelf: 'center',
  },
});
