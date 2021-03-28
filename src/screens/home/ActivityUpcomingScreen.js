import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
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

const initialLayout = {width: Dimensions.get('window').width};

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

  const FirstRoute = () => (
    <View style={{padding: 20}}>
      <ContestNo contest_no={userActivity.contest_no} />
      <Course course={userActivity.activity.course} />
      <ActualDate activity={activity} />
      <MoreInfomation activity={activity} />
      <ButtonSection userActivity={userActivity} activity={activity} />
    </View>
  );

  const SecondRoute = () => (
    <View style={{padding: 20}}>
      <TimelineDisplay activity={activity} />
    </View>
  );

  const ThirdRoute = () => (
    <View style={{padding: 20}}>
      <Transaction userActivity={userActivity} />
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
    {key: 'first', title: t('activity.info')},
    {key: 'second', title: t('activity.timeline')},
    {key: 'third', title: 'Receive'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  const [scrollable, setScrollable] = useState(true);

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
