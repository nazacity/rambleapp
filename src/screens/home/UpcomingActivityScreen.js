import React, {useRef} from 'react';
import {StyleSheet, Text, View, FlatList, Animated} from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import {useSelector} from 'react-redux';

import {FONTS, COLORS, SIZES, SHADOW} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import ActivityCard from '../../components/activity/ActivityCard';
import MenuButton from '../../components/layout/MenuButton';
import LocalizationContext from '../LocalizationContext';
import {Badge} from 'react-native-elements';
import {checkTimeTilFuture} from '../../services/util';

const CardHeight = ((SIZES.width - 80) * 2) / 3;

const UpcomingActivityScreen = () => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const activities = useSelector((state) => state.activity.upcoming_activities);
  const lang = useSelector((state) => state.appState.lang);
  dayjs.locale(lang);

  const UpcomingActivityCard = ({item, index}) => {
    const badgeNumber = item.announcement.filter(
      (item1) => item1.state === 'not_read',
    );
    const scale = scrollY.interpolate({
      inputRange: [
        -1,
        0,
        (CardHeight / 0.8) * index,
        (CardHeight / 0.8) * (index + 1),
      ],
      outputRange: [1, 1, 1, 0.5],
    });
    return (
      <ActivityCard
        item={item}
        onPress={() => {
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
              ? dayjs(item.activity.id.actual_date).format('DD MMM YY')
              : dayjs(item.activity.id.actual_date).fromNow()}
          </Text>
        </View>
        {badgeNumber.length > 0 && (
          <Badge
            value={badgeNumber.length}
            status="error"
            containerStyle={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 200,
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
