import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  BackHandler,
  Alert,
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
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
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
    <ScrollView
      style={{backgroundColor: COLORS.background}}
      showsVerticalScrollIndicator={false}>
      <PromoteActivity />
      <UserDetail />
      <UpcomingActivity />
      <MainAdvertise />
      <HistoryActivity />
      <MinorAdvertise />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
