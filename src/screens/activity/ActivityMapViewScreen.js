import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ImageBackground,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import {markers, mapDarkStyle, mapStandardStyle} from '../../constants/mapData';
// import StarRating from '../components/StarRating';
import {FONTS, COLORS, SIZES, SHADOW} from '../../constants';
import {useNavigation, useTheme} from '@react-navigation/native';
import FilterOption from '../../components/activity/FilterOption';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator} from 'react-native';

const CardSize = SIZES.width - 150;
const CardHeight = ((SIZES.width - 150) * 2) / 3;

const SPACING_FOR_CARD_INSET = SIZES.width * 0.1 - 10;

const ExploreScreen = ({
  filterOption,
  setState1,
  state1,
  onLoadMore,
  loading1,
}) => {
  const activities = useSelector((state) => state.activity.activities);
  const theme = useTheme();
  const navigation = useNavigation();

  const ActivityCardDetail = ({item, index}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <View
          style={[
            {
              width: CardSize,
              height: CardHeight,
              borderRadius: 20,
              backgroundColor: COLORS.backgroundColor,
            },
            SHADOW.image,
          ]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('ActivityDetail', {
                activityId: item._id,
              });
            }}
            style={[
              {
                borderRadius: 20,
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
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={[
                      FONTS.h4,
                      {color: COLORS.white, lineHeight: 18, marginRight: 10},
                    ]}>
                    {item.location.place_name}
                  </Text>
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
        </View>
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

  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CardSize + 0.3); // animate 30% away from landing on the next item
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

  const interpolations = activities.map((marker, index) => {
    const inputRange = [
      (index - 1) * CardSize,
      index * CardSize,
      (index + 1) * CardSize,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CardSize + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}>
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
              onPress={(e) => onMarkerPress(e)}>
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
        style={{position: 'absolute', top: Platform.OS === 'ios' ? 80 : 50}}>
        <FilterOption
          filterOption={filterOption}
          state={state1}
          setState={setState1}
        />
      </View>
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
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
        onEndReached={onLoadMore}
        onEndReachedThreshold={2}
        ItemSeparatorComponent={() => <View style={{margin: 10}} />}
        ListFooterComponent={() => (
          <View
            style={{
              height: CardHeight,
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {loading1 && (
              <View style={{marginVertical: 20}}>
                <ActivityIndicator color={COLORS.primary} size={30} />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.width,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
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
