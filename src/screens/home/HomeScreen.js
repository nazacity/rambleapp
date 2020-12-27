import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  BackHandler,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setLoading} from '../../redux/actions/AppStateAction';

import UserDetail from '../../components/home/UserDetail';
import PromoteActivity from '../../components/home/PromoteActivity';
import UpcomingActivity from '../../components/home/UpcomingActivity';
import HistoryActivity from '../../components/home/HistoryActivity';
import MainAdvertise from '../../components/advertise/MainAdvertise';
import MinorAdvertise from '../../components/advertise/MinorAdvertise';
import {COLORS} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {post} from '../../redux/actions/request';
import TopBackground from '../../components/layout/TopBackground';
import BottomBackground from '../../components/layout/BottomBackground';
import MenuButton from '../../components/layout/MenuButton';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user_device_token = useSelector((state) => state.user.device_token);

  const updatedDeviceToken = async () => {
    const device_token = await AsyncStorage.getItem('device_token');
    if (device_token && device_token !== user_device_token) {
      await post('/api/users/updatedevicetoken', {
        device_token: device_token,
      });
    }
  };
  useEffect(() => {
    updatedDeviceToken();
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View>
      <MenuButton />
      <ScrollView
        style={{backgroundColor: COLORS.backgroundColor}}
        showsVerticalScrollIndicator={false}>
        <PromoteActivity />
        <TopBackground />
        <UserDetail marginTop={-170} editable={true} />
        <UpcomingActivity />
        <HistoryActivity />
        <MainAdvertise />
        {/* <MinorAdvertise /> */}
        <BottomBackground marginTop={-200} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
