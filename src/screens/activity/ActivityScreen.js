import React, {useState, useEffect, useRef} from 'react';
import {Text, View, FlatList, Animated, ActivityIndicator} from 'react-native';

import {FONTS, COLORS, SIZES, SHADOW} from '../../constants';
import MenuButton from '../../components/layout/MenuButton';
import FilterButton from '../../components/layout/FilterButton';
import ViewButton from './components/ViewButton';
import {get} from '../../redux/actions/request';
import {useSelector, useDispatch} from 'react-redux';
import {setActivities} from '../../redux/actions/ActivityAction';
import {setLoading} from '../../redux/actions/AppStateAction';
import LocalizationContext from '../LocalizationContext';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import ActivityCard from '../../components/activity/ActivityCard';
import PromoteActivity from '../../components/home/PromoteActivity';
import ActiityMapViewScreen from './ActivityMapViewScreen';
import FilterOption from '../../components/activity/FilterOption';

const CardHeight = ((SIZES.width - 80) * 2) / 3;

const ActivityScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [loading1, setLoading1] = useState(false);
  const [page, setPage] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const [state, setState] = useState('0');
  const [view, setView] = useState(0);
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activity.activities);
  const [refresh, setRefresh] = useState(false);
  const filterRef = useRef();
  const onLoadMore = async () => {
    if (!noMore) {
      // dispatch(setLoading(true));
      setLoading1(true);

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
              let newData = [...activities, ...res.data];
              dispatch(setActivities(newData));
            }
          }
          setPage(page + 1);
        }
        setLoading1(false);
        // dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
        // dispatch(setLoading(false));
        setLoading1(false);
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
              {dayjs(item.actual_date).format('D MMMM YY')}
            </Text>
          </View>
        </ActivityCard>
        {/* {(index + 1) % 5 === 0 && <MinorAdvertise />} */}
      </View>
    );
  };

  const firstTimeLoad = async () => {
    dispatch(setLoading(true));
    filterRef.current.scrollToIndex({
      animated: true,
      index: 0,
      viewOffset: 40,
    });
    setNoMore(false);
    setPage(0);
    setState('0');
    await onLoadMore();
    dispatch(setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await firstTimeLoad();
    });
    return unsubscribe;
  }, []);

  const loadAll = async () => {
    dispatch(setLoading(true));
    setPage(1);
    setNoMore(false);
    try {
      filterRef.current.scrollToIndex({
        animated: true,
        index: 0,
        viewOffset: 40,
      });
      const res = await get(`/api/users/getactivities?skip=${0}&limit=5`);

      if (res.status === 200) {
        dispatch(setActivities([...res.data]));
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  const filterOption = [
    {
      id: '0',
      item: 'ALL',
      function: loadAll,
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

  const onRefresh = async () => {
    setRefresh(true);
    setState('0');
    await loadAll();
    setRefresh(false);
  };

  const renderHeader = () => {
    return (
      <View>
        <PromoteActivity />
        <FilterOption
          filterOption={filterOption}
          state={state}
          setState={setState}
          filterRef={filterRef}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: COLORS.backgroundColor,
        flex: 1,
      }}>
      <MenuButton />
      <ViewButton
        setView={setView}
        view={view}
        setState={setState}
        loadAll={loadAll}
      />
      <FilterButton onPress={() => navigation.navigate('ActivityFilter')} />

      {view === 0 && (
        <Animated.FlatList
          ListHeaderComponent={renderHeader()}
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
              style={{
                marginBottom: activities.length > 2 ? CardHeight * 2 : 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {activities.length === 0 && !loading1 && (
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: COLORS.backgroundColor,
                    marginTop: 100,
                  }}>
                  <Text style={[FONTS.h2, {color: COLORS.primary}]}>
                    {t('activity.noactivity')}
                  </Text>
                </View>
              )}
              {loading1 && (
                <View style={{marginVertical: 20}}>
                  <ActivityIndicator color={COLORS.primary} size={30} />
                </View>
              )}
            </View>
          )}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          onRefresh={onRefresh}
          refreshing={refresh}
        />
      )}
      {view === 1 && (
        <ActiityMapViewScreen
          state1={state}
          setState1={setState}
          onLoadMore={onLoadMore}
          loading1={loading1}
          setPage={setPage}
          setNoMore={setNoMore}
          filterRef={filterRef}
        />
      )}
    </View>
  );
};

export default ActivityScreen;
