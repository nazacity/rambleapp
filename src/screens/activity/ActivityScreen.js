import React, {Fragment, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  StatusBar,
} from 'react-native';

import MinorAdvertise from '../../components/advertise/MinorAdvertise';

import {FONTS, COLORS, SIZES, SHADOW} from '../../constants';
import MenuButton from '../../components/layout/MenuButton';
import FilterButton from '../../components/layout/FilterButton';
import {get} from '../../redux/actions/request';
import {useSelector, useDispatch} from 'react-redux';
import {setActivities} from '../../redux/actions/ActivityAction';
import {setLoading} from '../../redux/actions/AppStateAction';
import LocalizationContext from '../LocalizationContext';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import ActivityCard from '../../components/activity/ActivityCard';
import PromoteActivity from '../../components/home/PromoteActivity';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
  dayjs.locale(lang);
  const onLoadMore = async () => {
    if (!noMore) {
      dispatch(setLoading(true));

      console.log(page);
      try {
        const res = await get(
          `/api/users/getactivities?skip=${5 * page}&limit=5`,
        );
        if (res.status === 200) {
          if (res.data.length === 0) {
            setNoMore(true);
          } else {
            if (page === 0) {
              console.log('test1');

              dispatch(setActivities([...res.data]));
            } else {
              console.log('test2');

              dispatch(setActivities([...activities, ...res.data]));
            }
          }
          setPage(page + 1);
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
      outputRange: [1, 1, 1, 0.7],
    });
    return (
      <View style={{alignItems: 'center'}}>
        <ActivityCard
          item={{activity: {id: item}}}
          onPress={() => {
            navigation.navigate('ActivityDetail', {
              activityId: item._id,
            });
          }}
          scale={scale}>
          <View style={{position: 'absolute', bottom: 20, left: 20}}>
            <Text style={[FONTS.h3, {color: COLORS.white, lineHeight: 18}]}>
              {item.title}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  FONTS.h4,
                  {color: COLORS.white, lineHeight: 18, marginRight: 10},
                ]}>
                {item.location.place_name}
              </Text>
              <Text style={[FONTS.h4, {color: COLORS.white, lineHeight: 18}]}>
                {item.location.province}
              </Text>
            </View>
            <Text style={[FONTS.h1, {color: COLORS.white, lineHeight: 22}]}>
              {dayjs(item.actual_date).format('DD MMMM YY')}
            </Text>
          </View>
        </ActivityCard>
        {/* {(index + 1) % 5 === 0 && <MinorAdvertise />} */}
      </View>
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onLoadMore();
      setNoMore(false);
      setPage(0);
    });
    return unsubscribe;
  }, []);

  const filterOption = [
    {
      id: '0',
      item: 'ALL',
      function: async () => {
        dispatch(setLoading(true));
        setPage(1);
        setNoMore(false);
        try {
          const res = await get(`/api/users/getactivities?skip=${0}&limit=5`);

          if (res.status === 200) {
            dispatch(setActivities([...res.data]));
          }
          dispatch(setLoading(false));
        } catch (error) {
          console.log(error);
          dispatch(setLoading(false));
        }
      },
    },
    {
      id: '1',
      item: 'Full Marathons',
      function: async () => {
        try {
          dispatch(setLoading(true));
          const res = await get(
            `/api/users/getactivities?range_min=${40}&range_max=${50}&limit=50`,
          );
          if (res.status === 200) {
            dispatch(setActivities([...res.data]));
            setNoMore(true);
          }
          dispatch(setLoading(false));
        } catch (error) {
          console.log(error);
          dispatch(setLoading(false));
        }
      },
    },
    {
      id: '2',
      item: 'Half Marathons',
      function: async () => {
        try {
          dispatch(setLoading(true));
          const res = await get(
            `/api/users/getactivities?range_min=${18}&range_max=${25}&limit=50`,
          );
          if (res.status === 200) {
            dispatch(setActivities([...res.data]));
            setNoMore(true);
          }
          dispatch(setLoading(false));
        } catch (error) {
          console.log(error);
          dispatch(setLoading(false));
        }
      },
    },
    {
      id: '3',
      item: '10km Runs',
      function: async () => {
        try {
          dispatch(setLoading(true));
          const res = await get(
            `/api/users/getactivities?range_min=${8}&range_max=${12}&limit=50`,
          );
          if (res.status === 200) {
            dispatch(setActivities([...res.data]));
            setNoMore(true);
          }
          dispatch(setLoading(false));
        } catch (error) {
          console.log(error);
          dispatch(setLoading(false));
        }
      },
    },
    {
      id: '4',
      item: '5km Runs',
      function: async () => {
        try {
          dispatch(setLoading(true));
          const res = await get(
            `/api/users/getactivities?range_min=${4}&range_max=${6}&limit=50`,
          );
          if (res.status === 200) {
            dispatch(setActivities([...res.data]));
            setNoMore(true);
          }
          dispatch(setLoading(false));
        } catch (error) {
          console.log(error);
          dispatch(setLoading(false));
        }
      },
    },
  ];

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: COLORS.backgroundColor,
        flex: 1,
      }}>
      <MenuButton />
      <FilterButton onPress={() => navigation.navigate('ActivityFilter')} />
      {activities.length === 0 && !isLoading ? (
        <Fragment>
          <View style={{height: (SIZES.width * 2) / 3}}>
            <PromoteActivity />
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filterOption}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{padding: 20}}
            ItemSeparatorComponent={() => <View style={{margin: 5}} />}
            renderItem={({item, index}) => {
              return (
                <View
                  style={[
                    SHADOW.default,
                    {
                      backgroundColor: COLORS.backgroundColor,
                      borderRadius: 10,
                      height: 50,
                    },
                  ]}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      height: 50,
                      width: 120,
                      backgroundColor: COLORS.backgroundColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      borderRadius: 10,
                    }}
                    onPress={item.function}>
                    <Text style={[FONTS.h4]}>{item.item}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <View
            style={{
              alignItems: 'center',
              backgroundColor: COLORS.backgroundColor,
              flex: 1,
            }}>
            <Text style={[FONTS.h2, {color: COLORS.primary}]}>
              {t('activity.noactivity')}
            </Text>
          </View>
        </Fragment>
      ) : (
        <Animated.FlatList
          ListHeaderComponent={() => {
            return (
              <View>
                <PromoteActivity />
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={filterOption}
                  keyExtractor={(item) => `${item.id}`}
                  contentContainerStyle={{padding: 20}}
                  ItemSeparatorComponent={() => <View style={{margin: 5}} />}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={[
                          SHADOW.default,
                          {
                            backgroundColor: COLORS.backgroundColor,
                            borderRadius: 10,
                          },
                        ]}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={{
                            height: 50,
                            width: 120,
                            backgroundColor: COLORS.backgroundColor,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 5,
                            borderRadius: 10,
                          }}
                          onPress={item.function}>
                          <Text style={[FONTS.h4]}>{item.item}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          data={activities}
          keyExtractor={(item) => `${item._id}`}
          renderItem={({item, index}) => {
            return <ActivityCardDetail item={item} index={index} />;
          }}
          ItemSeparatorComponent={() => <View style={{margin: 10}} />}
          // style={{padding: 20, paddingTop: 60}}
          // contentContainerStyle={{paddingHorizontal: 5}}
          ListFooterComponent={() => (
            <View
              style={{marginBottom: activities.length > 2 ? CardHeight * 2 : 0}}
            />
          )}
          onEndReached={onLoadMore}
          onEndReachedThreshold={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
        />
      )}
    </View>
  );
};

export default ActivityScreen;
