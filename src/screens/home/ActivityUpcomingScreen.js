import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
// import {activity} from '../../config/data';
import {useSelector, useDispatch} from 'react-redux';
import ImageModal from 'react-native-image-modal';
import moment from 'moment';
import 'moment/locale/th';
moment.locale('th');
import Timeline from 'react-native-timeline-flatlist';

import MinorAdvertise from '../../components/advertise/MinorAdvertise';
import Button from '../../components/Button';
import {FONTS, COLORS, SIZES} from '../../constants';
import LocalizationContext from '../LocalizationContext';
import {getActivityById} from '../../redux/actions/ActivityAction';

import Spinner from 'react-native-loading-spinner-overlay';
import CouponCard from '../../components/card/CouponCard';
import RecordCard from '../../components/card/RecordCard';
import HeaderImage from '../../components/activity/HeaderImage';
import ButtonSection from '../../components/activity/ButtonSection';
import TimelineDisplay from '../../components/activity/TimelineDisplay';
import Gift from '../../components/activity/Gift';
import ShirtStyle from '../../components/activity/ShirtStyle';
import Reward from '../../components/activity/Reward';
import MoreInfomation from '../../components/activity/MoreInfomation';

const ActivityDetailScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);
  const activity = useSelector((state) => state.activity.activity);
  const {activityId, state} = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userActivity, setUserActivity] = useState({
    state: 'unregister',
  });

  const checkUserActivities = () => {
    const checkActivity = user.user_activities.find(
      (item) => item.activity.id._id === activityId,
    );
    if (checkActivity) {
      setUserActivity(checkActivity);
    }
  };

  useEffect(() => {
    if (userActivity.state === 'history') {
      navigation.replace('ActivityHistory', {
        userActivity: userActivity,
      });
    }
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getActivityById(activityId, setLoading, checkUserActivities));
    });

    return unsubscribe;
  }, [user, userActivity]);

  if (loading) {
    return (
      <Spinner
        visible={true}
        textContent={'Loading...'}
        textStyle={{
          color: '#FFF',
        }}
        color={COLORS.pinkPastel}
      />
    );
  }

  if (userActivity.state === 'finished') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 100,
          }}></View>
        <RecordCard item={userActivity} />
        {userActivity.coupons.map((item, index) => {
          if (item.state) {
            return <View key={index} />;
          }
          return (
            <View
              key={index}
              style={{
                alignItems: 'center',
                marginVertical: 20,
                borderRadius: 10,
              }}>
              <CouponCard
                item={item}
                userActivityId={userActivity._id}
                setUserActivity={setUserActivity}
              />
            </View>
          );
        })}
      </ScrollView>
    );
  }

  return (
    <View style={{flex: 1}}>
      <HeaderImage activity={activity} location={true}>
        <View style={{padding: 20}}>
          <TimelineDisplay activity={activity} />
          <Gift activity={activity} />
          <ShirtStyle activity={activity} />
          <Reward activity={activity} />
          <MoreInfomation activity={activity} />
          <MinorAdvertise />
          <ButtonSection userActivity={userActivity} activity={activity} />
        </View>
        <View style={{marginBottom: 50}}></View>
      </HeaderImage>
    </View>
  );
};

export default ActivityDetailScreen;

const styles = StyleSheet.create({});
