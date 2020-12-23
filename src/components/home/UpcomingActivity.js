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

import {FONTS, COLORS} from '../../constants';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {setUpcomeActivities} from '../../redux/actions/ActivityAction';

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
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('ActivityUpcoming', {
            activityId: item.activity.id._id,
          });
        }}
        style={{
          width: 150,
          height: 150,
          marginRight: upcomingActivities.length === index + 1 ? 40 : 0,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: 'black',
        }}>
        <Image
          source={{uri: item.activity.id.activity_picture_url}}
          style={{width: 150, height: 150, borderRadius: 5}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={{paddingHorizontal: 20}}>
        <Text style={[FONTS.h2_en]}>Up Coming Activity</Text>
      </View>
      {loading ? (
        <View
          style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      ) : !loading && upcomingActivities.length === 0 ? (
        <View
          style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
          <Text>ยังไม่มีกิจกรรม</Text>
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
          ItemSeparatorComponent={() => <View style={{padding: 10}} />}
          style={{padding: 20}}
        />
      )}
    </View>
  );
};

export default UpcomingActivity;

const styles = StyleSheet.create({});
