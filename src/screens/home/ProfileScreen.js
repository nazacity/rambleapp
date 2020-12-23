import React from 'react';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native';
import {Title, Caption, Text} from 'react-native-paper';
import {Avatar, Icon} from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UserDetail from '../../components/home/UserDetail';

import {useSelector} from 'react-redux';
import LocalizationContext from '../LocalizationContext';

import {SIZES, FONTS, COLORS, SHADOW} from '../../constants';
const ProfileScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 100,
          }}></View>
        <UserDetail marginTop={-90} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
