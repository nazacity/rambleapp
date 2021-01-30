import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useSelector, useDispatch} from 'react-redux';

import {FONTS, COLORS, SHADOW} from '../../constants';
import {Badge} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {setUpcomeActivities} from '../../redux/actions/ActivityAction';
import TitleHeader from '../layout/TitleHeader';

const UpcomingActivity = () => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const user_activities = useSelector((state) => state.user.user_activities);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [upcomingActivities, setUpcomingActivities] = useState([]);

  const checkUpcomingActivityState = () => {
    const upcomingActivities = user_activities.filter(
      (item) =>
        item.state === 'waiting_payment' ||
        item.state === 'upcoming' ||
        item.state === 'actual_date' ||
        item.state === 'checked_in' ||
        item.state === 'finished',
    );
    if (upcomingActivities) {
      dispatch(setUpcomeActivities(upcomingActivities));
      setUpcomingActivities(upcomingActivities.slice(0, 5));
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkUpcomingActivityState();
    });

    return unsubscribe;
  }, [user_activities]);

  const UpcomingActivityCard = ({item, index}) => {
    const badgeNumber = item.announcement.filter(
      (item1) => item1.state === 'not_read',
    );

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('ActivityUpcoming', {
            activityId: item.activity.id._id,
          });
        }}
        style={{
          padding: 10,
          marginRight: upcomingActivities.length === index + 1 ? 40 : 0,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: COLORS.backgroundColor,
        }}>
        <View style={[SHADOW.image]}>
          <Image
            source={{uri: item.activity.id.activity_picture_url}}
            style={{width: 150, height: 150, borderRadius: 5}}
          />
          {badgeNumber.length > 0 && (
            <Badge
              value={badgeNumber.length}
              status="error"
              containerStyle={{
                position: 'absolute',
                top: -10,
                right: -10,
                zIndex: 500,
              }}
              badgeStyle={[
                {
                  borderRadius: 15,
                  width: 30,
                  height: 30,
                },
                SHADOW.default,
              ]}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TitleHeader
        title={t('home.upcomingactivity')}
        seeAll={() => {
          navigation.jumpTo('home', {
            screen: 'UpcomingActivity',
          });
        }}
        paddingHorizontal={20}
      />
      {loading ? (
        <View
          style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      ) : !loading && upcomingActivities.length === 0 ? (
        <View
          style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[FONTS.body4, {color: COLORS.black}]}>
            {t('upcoming.noactivity')}
          </Text>
        </View>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={upcomingActivities}
          keyExtractor={(item) => `${item._id}`}
          renderItem={({item, index}) => {
            return <UpcomingActivityCard item={item} index={index} />;
          }}
          // ItemSeparatorComponent={() => <View style={{padding: 10}} />}
          style={{paddingHorizontal: 20}}
        />
      )}
    </View>
  );
};

export default UpcomingActivity;

const styles = StyleSheet.create({});
