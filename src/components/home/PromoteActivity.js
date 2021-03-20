import React, {useEffect, useState} from 'react';
import {Text, View, ImageBackground, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {get} from '../../redux/actions/request';
import {SHADOW, SIZES, FONTS, COLORS} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import Swiper from 'react-native-swiper';
import {useSelector} from 'react-redux';
import LocalizationContext from '../../screens/LocalizationContext';

const PromoteActivity = () => {
  const {t} = React.useContext(LocalizationContext);
  const lang = useSelector((state) => state.appState.lang);
  dayjs.locale(lang);
  const navigation = useNavigation();
  const [promote_activities, setPromote_activities] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPromoteActivity = async () => {
    try {
      const res = await get('/api/users/getpromoteactivities');
      if (res.status === 200) {
        setPromote_activities(res.data);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPromoteActivity();
  }, []);
  const PromoteActivityCard = ({item, index}) => {
    return (
      <ImageBackground
        source={{uri: item.activity_picture_url}}
        style={{
          width: SIZES.width,
          height: (SIZES.width * 2) / 3,
          resizeMode: 'cover',
        }}>
        <LinearGradient
          colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,1)']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          useAngle
          angle={180}
          style={{
            flex: 1,
            left: 0,
            top: 0,
            width: SIZES.width,
            height: (SIZES.width * 2) / 3,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 40,
            left: 20,
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text style={[FONTS.h4, {color: '#fff'}]}>{item.title}</Text>
            <Text style={[FONTS.h1, {color: '#fff'}]}>
              {dayjs(item.actual_date).format('DD MMMM YY')}
            </Text>
          </View>
          <View
            style={[
              SHADOW.default,
              {
                borderRadius: 5,
                height: 50,
                width: 130,
                backgroundColor: COLORS.primary,
                marginRight: 30,
              },
            ]}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                {
                  borderRadius: 5,
                  height: 50,
                  width: 130,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: COLORS.primary,
                },
                SHADOW.default,
              ]}
              onPress={() => {
                navigation.navigate('ActivityDetail', {
                  activityId: item._id,
                  from: 'HomeScreen',
                });
              }}>
              <Text
                style={[
                  {
                    color: '#fff',
                    textAlign: 'center',
                  },
                  FONTS.h3,
                ]}>
                {t('promoteactivity.detail')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  };

  if (loading) {
    return (
      <View
        style={{
          height: (SIZES.width * 2) / 3,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.backgroundColor,
        }}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );
  }

  if (promote_activities.length === 0) {
    return (
      <View
        style={{
          height: (SIZES.width * 2) / 3,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.primary,
        }}>
        <Text style={[FONTS.h2, {color: COLORS.white}]}>
          {t('home.noactivity')}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
      }}>
      <Swiper
        height={(SIZES.width * 2) / 3}
        autoplay
        dotColor="rgba(255,255,255,0.6)"
        activeDotColor={COLORS.primary}>
        {promote_activities.map((item, index) => {
          return <PromoteActivityCard key={index} item={item} index={index} />;
        })}
      </Swiper>
    </View>
  );
};

export default React.memo(PromoteActivity);
