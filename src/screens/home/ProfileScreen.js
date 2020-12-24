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
import TopBackground from '../../components/layout/TopBackground';
const ProfileScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopBackground />
        <UserDetail marginTop={-180} />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
