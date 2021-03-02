import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Animated} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ActivityCard from '../../components/activity/ActivityCard';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import {FONTS, COLORS, SIZES} from '../../constants';
import FilterButton from '../../components/layout/FilterButton';
import {listUserPostsByActivity} from '../../redux/actions/CommunityAction';
import LocalizationContext from '../LocalizationContext';
import relativeTime from 'dayjs/plugin/relativeTime';
import BackButton from '../../components/layout/BackButton';
dayjs.extend(relativeTime);

const CardHeight = ((SIZES.width - 80) * 2) / 3;

const SelectActivityScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const user_activities = useSelector((state) => state.user.user_activities);
  const lang = useSelector((state) => state.appState.lang);
  dayjs.locale(lang);
  const dispatch = useDispatch();
  const [activities, setActivities] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const checkActivityState = () => {
    let data = [];
    user_activities.map((item) => {
      if (
        item.activity.id.state === 'pre_register' ||
        item.activity.id.state === 'registering' ||
        item.activity.id.state === 'end_register'
      ) {
        data.push(item);
      }
    });

    setActivities(data);
  };

  const navigateUser = () => {
    navigation.navigate('CommunityOld');
  };

  const fetchUserPosts = (id) => {
    dispatch(listUserPostsByActivity(id, navigateUser));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkActivityState();
    });

    return unsubscribe;
  }, [user_activities]);

  const UserActivityCard = ({item, index}) => {
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
          fetchUserPosts(item.activity.id._id);
        }}
        scale={scale}>
        <View style={{position: 'absolute', bottom: 20, left: 20}}>
          <Text style={[FONTS.h4, {color: '#fff'}]}>
            {item.activity.id.title}
          </Text>
          <Text style={[FONTS.h1, {color: '#fff'}]}>
            {dayjs(item.activity.id.actual_date).fromNow()}
          </Text>
        </View>
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
      <BackButton />
      <FilterButton onPress={() => navigation.navigate('CommunityFilter')} />
      {activities.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[FONTS.h2, {color: COLORS.primary}]}>
            {t('community.noactivity')}
          </Text>
        </View>
      ) : (
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          data={activities}
          keyExtractor={(item) => `${item._id}`}
          renderItem={({item, index}) => {
            return <UserActivityCard item={item} index={index} />;
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

export default SelectActivityScreen;
