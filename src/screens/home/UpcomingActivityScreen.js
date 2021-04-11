import React, {useRef} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import {useDispatch, useSelector} from 'react-redux';

import {FONTS, COLORS, SIZES, SHADOW} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import ActivityCard from '../../components/activity/ActivityCard';
import MenuButton from '../../components/layout/MenuButton';
import LocalizationContext from '../LocalizationContext';
import {checkTimeTilFuture} from '../../services/util';
import NotificationBadge from '../../components/layout/NotificationBadge';
import {setLoading} from '../../redux/actions/AppStateAction';

const CardHeight = ((SIZES.width - 80) * 2) / 3;

const UpcomingActivityScreen = () => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const activities = useSelector((state) => state.activity.upcoming_activities);
  const dispatch = useDispatch();

  const UpcomingActivityCard = ({item, index}) => {
    const badgeNumber = item.announcement.filter(
      (item1) => item1.state === 'not_read',
    );
    const scale = scrollY.interpolate({
      inputRange: [
        -1,
        0,
        (CardHeight + 20) * index,
        (CardHeight + 20) * (index + 1),
      ],
      outputRange: [1, 1, 1, 0.7],
    });
    return (
      <ActivityCard
        item={item}
        onPress={() => {
          dispatch(setLoading(true));
          navigation.navigate('ActivityUpcoming', {
            activityId: item.activity.id._id,
          });
        }}
        scale={scale}>
        <View style={{position: 'absolute', bottom: 20, left: 20}}>
          <Text style={[FONTS.h4, {color: COLORS.white, lineHeight: 22}]}>
            {item.activity.id.title}
          </Text>
          <Text style={[FONTS.h1, {color: COLORS.white, lineHeight: 22}]}>
            {checkTimeTilFuture(item.activity.id.actual_date)
              ? dayjs(item.activity.id.actual_date).format('D MMM YY')
              : dayjs(item.activity.id.actual_date).fromNow()}
          </Text>
        </View>
        {badgeNumber.length > 0 && (
          <NotificationBadge value={badgeNumber.length} top={10} right={10} />
        )}
      </ActivityCard>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        alignItems: 'center',
      }}>
      <MenuButton />
      {activities.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[FONTS.h2, {color: COLORS.primary}]}>
            {t('upcoming.noactivity')}
          </Text>
        </View>
      ) : (
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          data={activities}
          keyExtractor={(item) => `${item._id}`}
          renderItem={({item, index}) => {
            return <UpcomingActivityCard item={item} index={index} />;
          }}
          ItemSeparatorComponent={() => <View style={{margin: 10}} />}
          style={{padding: 20, paddingTop: 60}}
          contentContainerStyle={{paddingHorizontal: 5}}
          ListFooterComponent={() => (
            <View
              style={{marginBottom: activities.length > 2 ? CardHeight * 2 : 0}}
            />
          )}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
        />
      )}
    </View>
  );
};

export default UpcomingActivityScreen;

const styles = StyleSheet.create({});
