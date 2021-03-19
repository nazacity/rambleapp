import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  BackHandler,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setLoading} from '../../redux/actions/AppStateAction';

import UserDetail from '../../components/home/UserDetail';
import PromoteActivity from '../../components/home/PromoteActivity';
import UpcomingActivity from '../../components/home/UpcomingActivity';
import HistoryActivity from '../../components/home/HistoryActivity';
import MainAdvertise from '../../components/advertise/MainAdvertise';
import {COLORS} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {post} from '../../redux/actions/request';
import MenuButton from '../../components/layout/MenuButton';
import {refresh} from '../../redux/actions/UserAction';
import LocalizationContext from '../LocalizationContext';
// import RatingBar from '../../components/layout/RatingBar';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user_device_token = useSelector((state) => state.user.device_token);
  const {t} = React.useContext(LocalizationContext);
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
        Alert.alert(t('home.exit'), t('home.sure'), [
          {
            text: t('home.no'),
            onPress: () => null,
            style: 'cancel',
          },
          {text: t('home.yes'), onPress: () => BackHandler.exitApp()},
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(refresh());
    });

    return unsubscribe;
  }, []);

  // const [rate, setRate] = useState(3);

  return (
    <View>
      <MenuButton />
      <ScrollView
        style={{backgroundColor: COLORS.backgroundColor}}
        showsVerticalScrollIndicator={false}>
        {/* <RatingBar size={20} value={rate} onPress={(item) => setRate(item)} /> */}
        <PromoteActivity />
        <UserDetail marginTop={30} editable={true} />
        <UpcomingActivity />
        <HistoryActivity />
        <View style={{margin: 20}} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
