import React, {useEffect, useRef, useState} from 'react';
import {View, Dimensions, Text, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {COLORS, FONTS} from '../../constants';
import LocalizationContext from '../LocalizationContext';
import {getActivityById} from '../../redux/actions/ActivityAction';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderImage from '../../components/activity/HeaderImage';
import Description from '../../components/activity/Description';
import RegisterDate from '../../components/activity/RegisterDate';
import Courses from '../../components/activity/Courses';
import TimelineDisplay from '../../components/activity/TimelineDisplay';
import Gift from '../../components/activity/Gift';
import ShirtStyle from '../../components/activity/ShirtStyle';
import Reward from '../../components/activity/Reward';
import MoreInfomation from '../../components/activity/MoreInfomation';
import Rules from '../../components/activity/Rules';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ActualDate from '../../components/activity/ActualDate';
import ButtonSection from '../../components/activity/ButtonSection';
import Routes from '../../components/activity/Routes';
import RacePack from '../../components/activity/RacePack';

const ActivityDetailScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);
  const activity = useSelector((state) => state.activity.activity);
  const {activityId} = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userActivity, setUserActivity] = useState({
    state: 'unregister',
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
    dispatch(getActivityById(activityId, setLoading, checkUserActivities));
  }, []);

  if (loading) {
    return <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}} />;
  }

  return (
    <View style={{flex: 1}}>
      <HeaderImage
        activity={activity}
        location={true}
        buttonAction={true}
        userActivity={userActivity}>
        <ScrollView
          scrollRef={scrollRef}
          style={{paddingHorizontal: 20, marginBottom: 60}}>
          <Description activity={activity} />
          <ActualDate activity={activity} />
          <RegisterDate activity={activity} />
          <Courses activity={activity} />
          {activity.routes.length > 0 && <Routes activity={activity} />}
          <ShirtStyle activity={activity} />
          {activity.racepack.length > 0 && <RacePack activity={activity} />}
          <Gift activity={activity} />
          <TimelineDisplay activity={activity} />
          <Reward activity={activity} />
          <Rules activity={activity} />
          <MoreInfomation activity={activity} />
        </ScrollView>
      </HeaderImage>
      <View style={{position: 'absolute', bottom: 20, right: 20}}>
        <ButtonSection userActivity={userActivity} activity={activity} />
      </View>
    </View>
  );
};

export default ActivityDetailScreen;
