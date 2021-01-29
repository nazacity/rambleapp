import React, {Fragment, useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, FlatList, Animated} from 'react-native';

import MinorAdvertise from '../../components/advertise/MinorAdvertise';

import {FONTS, COLORS, SIZES} from '../../constants';
import MenuButton from '../../components/layout/MenuButton';
import FilterButton from '../../components/layout/FilterButton';
import {get} from '../../redux/actions/request';
import {useSelector, useDispatch} from 'react-redux';
import {setActivities} from '../../redux/actions/ActivityAction';
import {setLoading} from '../../redux/actions/AppStateAction';
import LocalizationContext from '../LocalizationContext';
import moment from 'moment';
import 'moment/locale/th';
import ActivityCard from '../../components/activity/ActivityCard';

const CardHeight = ((SIZES.width - 80) * 2) / 3;

const ActivityScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const scrollY = useRef(new Animated.Value(0)).current;
  // const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activity.activities);
  const isLoading = useSelector((state) => state.appState.isLoading);
  const lang = useSelector((state) => state.appState.lang);
  moment.locale(lang);
  const onLoadMore = async () => {
    if (!noMore) {
      dispatch(setLoading(true));
      setPage(page + 1);
      try {
        const res = await get(
          `/api/users/getactivities?skip=${5 * page}&limit=5`,
        );

        if (res.status === 200) {
          if (res.data.length === 0) {
            setNoMore(true);
          } else {
            if (page === 0) {
              dispatch(setActivities([...res.data]));
            } else {
              dispatch(setActivities([...activities, ...res.data]));
            }
          }
        }
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    }
  };

  const ActivityCardDetail = ({item, index}) => {
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
      <Fragment>
        <ActivityCard
          item={{activity: {id: item}}}
          onPress={() => {
            navigation.navigate('ActivityDetail', {
              activityId: item._id,
            });
          }}
          scale={scale}>
          <View style={{position: 'absolute', bottom: 20, left: 20}}>
            <Text style={[FONTS.h4, {color: '#fff'}]}>{item.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={[FONTS.h5, {color: '#fff', marginRight: 10}]}>
                {item.location.place_name}
              </Text>
              <Text style={[FONTS.h5, {color: '#fff'}]}>
                {item.location.province}
              </Text>
            </View>
            <Text style={[FONTS.h1, {color: '#fff'}]}>
              {moment(item.actual_date).format('DD MMMM YY')}
            </Text>
          </View>
        </ActivityCard>
        {/* {(index + 1) % 5 === 0 && <MinorAdvertise />} */}
      </Fragment>
    );
  };

  useEffect(() => {
    onLoadMore();
    const unsubscribe = navigation.addListener('focus', () => {
      setNoMore(false);
      setPage(0);
    });
    return unsubscribe;
  }, []);

  if (activities.length === 0 && !isLoading) {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: COLORS.backgroundColor,
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text style={[FONTS.h2]}>{t('activityfilter.noactivity')}</Text>
        {/* <Button
          label={t('activityfilter.clickhere')}
          color={COLORS.pinkPastel}
          onPress={onLoadMore}
        /> */}
      </View>
    );
  }

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: COLORS.backgroundColor,
        flex: 1,
      }}>
      <MenuButton />
      <FilterButton onPress={() => navigation.navigate('ActivityFilter')} />
      <Animated.FlatList
        showsVerticalScrollIndicator={false}
        data={activities}
        keyExtractor={(item) => `${item._id}`}
        renderItem={({item, index}) => {
          return <ActivityCardDetail item={item} index={index} />;
        }}
        ItemSeparatorComponent={() => <View style={{margin: 10}} />}
        style={{padding: 20, paddingTop: 60}}
        ListFooterComponent={() => (
          <View
            style={{marginBottom: activities.length > 1 ? CardHeight * 2 : 0}}
          />
        )}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
      />
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({});
