import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {FONTS, COLORS} from '../../constants';
import {getActivityById} from '../../redux/actions/ActivityAction';

import Spinner from 'react-native-loading-spinner-overlay';
import CouponCard from '../../components/card/CouponCard';
import RecordCard from '../../components/card/RecordCard';
import HeaderImage from '../../components/activity/HeaderImage';
import TimelineDisplay from '../../components/activity/TimelineDisplay';
import MoreInfomation from '../../components/activity/MoreInfomation';
import Course from '../../components/activity/Course';
import BackButton from '../../components/layout/BackButton';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ContestNo from '../../components/activity/ContestNo';
import ActualDate from '../../components/activity/ActualDate';
import Transaction from '../../components/activity/Transaction';
import ButtonSection from '../../components/activity/ButtonSection';
import LocalizationContext from '../LocalizationContext';
import Routes from '../../components/activity/Routes';
import RacePack from '../../components/activity/RacePack';
import Rules from '../../components/activity/Rules';
import ShirtStyle from '../../components/activity/ShirtStyle';
import Courses from '../../components/activity/Courses';
import Gift from '../../components/activity/Gift';
import Reward from '../../components/activity/Reward';
import TitleHeader from '../../components/layout/TitleHeader';
import AddressCard from '../../components/card/AddressCard';
import EmergencyCard from '../../components/card/EmergencyCard';

const ActivityDetailScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);
  const activity = useSelector((state) => state.activity.activity);
  const {activityId, state} = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userActivity, setUserActivity] = useState({
    announcement: [],
    state: 'unregister',
    transaction: [],
  });
  const scrollRef = useRef();

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

  const [scrollable, setScrollable] = useState(true);

  if (loading) {
    return <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}} />;
  }

  if (userActivity.state === 'finished') {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollable}>
        <BackButton backTo={'Home'} />
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
                setScrollable={setScrollable}
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
      <HeaderImage
        activity={activity}
        location={true}
        buttonAction={true}
        userActivity={userActivity}
        setUserActivity={setUserActivity}>
        <ScrollView
          scrollRef={scrollRef}
          style={{paddingHorizontal: 20, marginBottom: 60}}>
          <ContestNo contest_no={userActivity.contest_no} />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TitleHeader title={t('payment.course')} noDot={true} />
              <Text style={[FONTS.body4, {marginBottom: 10}]}>
                {userActivity.activity.course.title}
              </Text>
            </View>
            <View style={{flex: 0.5}}>
              <TitleHeader title={t('payment.size')} noDot={true} />
              <Text style={[FONTS.body4, {marginBottom: 10}]}>
                {userActivity.size.size.toUpperCase()}
              </Text>
            </View>
          </View>
          <ActualDate activity={activity} />
          <TimelineDisplay activity={activity} />
          <View>
            <TitleHeader title={t('payment.address')} />
            <Text style={[FONTS.body4, {marginLeft: 10}]}>
              {userActivity.address._id !== '5ff6600d20ed83388ab4ccbd' &&
                t('payment.postzip')}
              {userActivity.address._id === '5ff6600d20ed83388ab4ccbd' &&
                t('activity.atevent')}
            </Text>
            {userActivity.address._id !== '5ff6600d20ed83388ab4ccbd' && (
              <View style={{padding: 5}}>
                <AddressCard
                  item={
                    userActivity.address._id === '5ff6600d20ed83388ab4ccbd'
                      ? {
                          _id: '5ff6600d20ed83388ab4ccbd',
                          address: t('activity.atevent'),
                        }
                      : userActivity.address
                  }
                  editable={false}
                />
              </View>
            )}
          </View>
          <View>
            <TitleHeader title={t('payment.emergency')} />
            <View style={{padding: 5}}>
              <EmergencyCard
                item={userActivity.emergency_contact}
                editable={false}
              />
            </View>
          </View>
          <MoreInfomation activity={activity} />
          <Transaction userActivity={userActivity} />
          {activity.routes.length > 0 && <Routes activity={activity} />}
          <ShirtStyle activity={activity} />
          {activity.racepack.length > 0 && <RacePack activity={activity} />}
          <Gift activity={activity} />
          <Reward activity={activity} />
          <Rules activity={activity} />
        </ScrollView>
      </HeaderImage>
      <View style={{position: 'absolute', bottom: 20, right: 20}}>
        <ButtonSection userActivity={userActivity} activity={activity} />
      </View>
    </View>
  );
};

export default ActivityDetailScreen;

const styles = StyleSheet.create({});
