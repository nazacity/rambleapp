import React, {useEffect, Fragment, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import {mapDarkStyle, mapStandardStyle} from '../../constants/mapData';
// import StarRating from '../components/StarRating';
import {FONTS, COLORS, SIZES, SHADOW} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import FilterOption from '../../components/activity/FilterOption';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator} from 'react-native';
import {setLoading} from '../../redux/actions/AppStateAction';
import {setActivities} from '../../redux/actions/ActivityAction';
import {get} from '../../redux/actions/request';
import LocalizationContext from '../LocalizationContext';
import ViewModeButton from './components/ViewModeButton';
import ViewButton from './components/ViewButton';

const CardSize = 225;
const CardHeight = 150;

const SPACING_FOR_CARD_INSET = SIZES.width * 0.1 - 10;

const ActivityMapViewScreen = ({
  setState1,
  state1,
  onLoadMore,
  loading1,
  setLoading1,
  setPage,
  setNoMore,
  filterRef,
  ViewButtonDisplay,
}) => {
  const activities = useSelector((state) => state.activity.activities);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  const {t} = React.useContext(LocalizationContext);
  const [loading2, setLoading2] = useState(false);

  const setToFirstItemLocation = (data) => {
    if (data.length > 0) {
      const {location} = data[0];

      _map.current.animateToRegion(
        {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 15.20069573949079,
          longitudeDelta: 9.81802023947239,
        },
        350,
      );
    }
    _scrollView.current.scrollToOffset({offset: 0, animated: true});
  };

  const fetchFromRegion = async (region) => {
    dispatch(setActivities([]));
    try {
      setLoading2(true);

      const res = await get(
        `/api/users/getactivities?region=${region}&limit=50`,
      );

      if (res.status === 200) {
        dispatch(setActivities([...res.data]));
        setNoMore(true);
      }

      setToFirstItemLocation(res.data);
      setLoading2(false);
    } catch (error) {
      console.log(error);
      setLoading2(false);
    }
  };

  const fetchAllRegion = async () => {
    setPage(1);
    setNoMore(false);
    dispatch(setActivities([]));
    try {
      setLoading2(true);
      const res = await get(`/api/users/getactivities?skip=${0}&limit=5`);

      if (res.status === 200) {
        dispatch(setActivities([...res.data]));
      }

      setToFirstItemLocation(res.data);
      setLoading2(false);
    } catch (error) {
      console.log(error);
      setLoading2(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await fetchAllRegion();
    });
    return unsubscribe;
  }, []);

  const filterOption = [
    {
      id: '0',
      item_th: 'ทุกภาค',
      item_en: 'All region',
      function: async () => {
        await fetchAllRegion();
      },
    },
    {
      id: '1',
      item_th: 'ภาคกลาง',
      item_en: 'Central',
      function: async () => {
        await fetchFromRegion('ภาคกลาง');
      },
    },
    {
      id: '2',
      item_th: 'ภาคเหนือ',
      item_en: 'North',
      function: async () => {
        await fetchFromRegion('ภาคเหนือ');
      },
    },
    {
      id: '3',
      item_th: 'ภาคตะวันออก',
      item_en: 'East',
      function: async () => {
        await fetchFromRegion('ภาคตะวันออก');
      },
    },
    {
      id: '4',
      item_th: 'ภาคตะวันตก',
      item_en: 'West',
      function: async () => {
        await fetchFromRegion('ภาคตะวันตก');
      },
    },
    {
      id: '5',
      item_th: 'ภาคใต้',
      item_en: 'South',
      function: async () => {
        await fetchFromRegion('ภาคใต้');
      },
    },
    {
      id: '6',
      item_th: 'ภาคตะวันออกเฉียงเหนือ',
      item_en: 'Northeast',
      function: async () => {
        await fetchFromRegion('ภาคตะวันออกเฉียงเหนือ');
      },
    },
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (activities.length > 0) {
        _scrollView.current.scrollToIndex({
          animated: true,
          index: 0,
          viewOffset: 500,
        });
      }
    });
    return unsubscribe;
  }, []);

  let mapIndex = 0;
  const mapAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / (CardSize + 10)); // animate 30% away from landing on the next item

      if (index >= activities.length) {
        index = activities.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);
      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {location} = activities[index];

          _map.current.animateToRegion(
            {
              latitude: location.lat,
              longitude: location.lng,
              latitudeDelta: 15.20069573949079,
              longitudeDelta: 9.81802023947239,
            },
            350,
          );
        }
      }, 10);
    });
  });

  const ActivityCardDetail = ({item, index}) => {
    const scale = mapAnimation.interpolate({
      inputRange: [
        (index - 1) * (CardSize + 20),
        index * (CardSize + 20),
        (index + 1) * (CardSize + 20),
      ],
      outputRange: [0.7, 1, 0.7],
    });
    return (
      <View style={{alignItems: 'center'}}>
        <Animated.View
          style={[
            {
              width: CardSize,
              height: CardHeight,
              borderRadius: 5,
              backgroundColor: COLORS.backgroundColor,
              transform: [
                {
                  scale,
                },
              ],
            },
            SHADOW.image,
          ]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              dispatch(setLoading(true));
              navigation.navigate('ActivityDetail', {
                activityId: item._id,
              });
            }}
            style={[
              {
                width: CardSize,
                height: CardHeight,
                borderRadius: 5,
                backgroundColor: COLORS.backgroundColor,
                overflow: 'hidden',
              },
              SHADOW.image,
            ]}>
            <ImageBackground
              source={{uri: item.activity_picture_url}}
              style={{
                width: CardSize,
                height: CardHeight,
                resizeMode: 'cover',
              }}>
              <LinearGradient
                colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,1)']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                useAngle
                angle={180}
                style={{
                  flex: 1,
                  left: 0,
                  top: 0,
                  width: CardSize,
                  height: CardHeight,
                }}
              />
              <View style={{position: 'absolute', bottom: 20, left: 20}}>
                <Text style={[FONTS.h3, {color: COLORS.white, lineHeight: 18}]}>
                  {item.title}
                </Text>
                {/* <View>
                  <Text
                    style={[
                      FONTS.h4,
                      {color: COLORS.white, lineHeight: 18, marginRight: 10},
                    ]}>
                    {item.location.place_name}
                  </Text>
                </View> */}
                <View>
                  <Text
                    style={[FONTS.h4, {color: COLORS.white, lineHeight: 18}]}>
                    {item.location.province}
                  </Text>
                </View>
                <Text style={[FONTS.h1, {color: COLORS.white, lineHeight: 22}]}>
                  {dayjs(item.actual_date).format('D MMMM YY')}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  const initialMapState = {
    region: {
      latitude: 14.373899638182884,
      longitude: 100.90647540986538,
      // latitudeDelta: 0.04864195044303443,
      // longitudeDelta: 0.040142817690068,
      latitudeDelta: 15.20069573949079,
      longitudeDelta: 9.81802023947239,
    },
  };

  const [state, setState] = useState(initialMapState);

  const interpolations = activities.map((marker, index) => {
    const inputRange = [
      (index - 1) * (CardSize + 20),
      index * (CardSize + 20),
      (index + 1) * (CardSize + 20),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  const onMarkerPress = (mapEventData, index) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CardSize + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollToOffset({offset: x, animated: true});
  };

  // const [dark, setDark] = useState(false);

  // useEffect(() => {
  //   const time = new Date().getHours();
  //   if (time >= 19 || time <= 6) {
  //     setDark(true);
  //   }
  // }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStandardStyle}>
        {activities.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: marker.location.lat,
                longitude: marker.location.lng,
              }}
              onPress={(e) => onMarkerPress(e, index)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../../../assets/map/map_marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          alignItems: 'center',
          top: Platform.OS === 'ios' ? 70 : 55,
        }}>
        {ViewButtonDisplay()}
        <FilterOption
          filterOption={filterOption}
          state={state1}
          setState={setState1}
          filterRef={filterRef}
          loading={loading2}
        />
      </View>

      {/* <ViewModeButton setDark={setDark} dark={dark} /> */}

      {loading2 && (
        <View
          style={{
            height: CardHeight,
            width: SIZES.width,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
          }}>
          <ActivityIndicator color={COLORS.primary} size={30} />
        </View>
      )}
      <Animated.FlatList
        data={activities}
        keyExtractor={(item) => `${item._id}`}
        renderItem={({item, index}) => {
          return <ActivityCardDetail item={item} index={index} />;
        }}
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CardSize + 20}
        snapToAlignment="start"
        style={styles.scrollView}
        contentContainerStyle={{
          paddingLeft: SIZES.width / 2 - CardSize / 2,
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: mapAnimation}}}],
          {useNativeDriver: true},
        )}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => <View style={{margin: 10}} />}
        ListFooterComponent={() => (
          <View style={{flexDirection: 'row'}}>
            {loading1 && (
              <View
                style={{
                  height: CardHeight,
                  width: activities.length === 0 ? SIZES.width : 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator color={COLORS.primary} size={30} />
              </View>
            )}
            {activities.length === 0 && !loading1 && !loading2 && (
              <View
                style={{
                  width: CardSize,
                  height: CardHeight,
                  borderRadius: 10,
                  backgroundColor: COLORS.backgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={[FONTS.h2, {color: COLORS.primary}]}>
                  {t('activity.noactivity')}
                </Text>
              </View>
            )}
            <View
              style={{
                width: CardSize,
                height: CardHeight,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ActivityMapViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.width,
  },

  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: SIZES.width - CardSize,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CardHeight,
    width: CardSize,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
