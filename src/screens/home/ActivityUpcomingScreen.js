import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import 'moment/locale/th';
moment.locale('th');

import MinorAdvertise from '../../components/advertise/MinorAdvertise';
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
import Announcement from '../../components/activity/Announcement';
import ActualDate from '../../components/activity/ActualDate';

const initialLayout = {width: Dimensions.get('window').width};

const ActivityDetailScreen = ({navigation, route}) => {
  const user = useSelector((state) => state.user);
  const activity = useSelector((state) => state.activity.activity);
  const {activityId, state} = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userActivity, setUserActivity] = useState({
    announcement: [],
    state: 'unregister',
  });

  const FirstRoute = () => (
    <View style={{padding: 20}}>
      <Course course={userActivity.activity.course} />
      <ActualDate activity={activity} />
      <ContestNo contest_no={userActivity.contest_no} />
      <MoreInfomation activity={activity} />
    </View>
  );

  const SecondRoute = () => (
    <View style={{padding: 20}}>
      <TimelineDisplay activity={activity} />
    </View>
  );

  const ThirdRoute = () => (
    <View style={{padding: 20}}>
      <Announcement
        userActivity={userActivity}
        setUserActivity={setUserActivity}
      />
    </View>
  );

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

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Info'},
    {key: 'second', title: 'Timeline'},
    {key: 'third', title: 'Announcement'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

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
        <BackButton backTo={'Home'} />
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 200,
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
      <HeaderImage
        activity={activity}
        location={true}
        buttonAction={true}
        userActivity={userActivity}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: 'white'}}
              style={{backgroundColor: COLORS.primary}}
              renderLabel={({route, focused, color}) => (
                <Text style={[FONTS.h3, {color}]}>{route.title}</Text>
              )}
            />
          )}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />

        {/* <MinorAdvertise /> */}

        <View style={{marginBottom: 50}}></View>
      </HeaderImage>
    </View>
  );
};

export default ActivityDetailScreen;

const styles = StyleSheet.create({});
