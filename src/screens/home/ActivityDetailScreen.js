import React, {useEffect, useState, useRef, Fragment} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import MinorAdvertise from '../../components/advertise/MinorAdvertise';
import {COLORS} from '../../constants';
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
import ButtonSection from '../../components/activity/ButtonSection';

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

  const checkUserActivities = () => {
    const checkActivity = user.user_activities.find(
      (item) => item.activity.id._id === activityId,
    );

    if (checkActivity) {
      setUserActivity(checkActivity);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getActivityById(activityId, setLoading, checkUserActivities));
    });

    return unsubscribe;
  }, [activity]);

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

  return (
    <View style={{flex: 1}}>
      <HeaderImage activity={activity} location={true}>
        <View style={{padding: 20}}>
          <Description activity={activity} />
          <RegisterDate activity={activity} />
          <Courses activity={activity} />
          <TimelineDisplay activity={activity} />
          <Gift activity={activity} />
          <ShirtStyle activity={activity} />
          <Reward activity={activity} />
          <Rules activity={activity} />
          <MoreInfomation activity={activity} />
          {/* <MinorAdvertise /> */}
          <ButtonSection userActivity={userActivity} activity={activity} />
        </View>
      </HeaderImage>
    </View>
  );
};

export default ActivityDetailScreen;
