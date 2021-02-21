import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  const fetchPromoteActivity = async () => {
    const res = await get('/api/users/getpromoteactivities');
    if (res.status === 200) {
      setPromote_activities(res.data);
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
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              {
                borderRadius: 10,
                height: 50,
                width: 130,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.primary,
                marginRight: 30,
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
      </ImageBackground>
    );
  };

  if (promote_activities.length === 0) {
    return (
      <View
        style={{
          height: (SIZES.width * 2) / 3,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.primary,
        }}>
        <ActivityIndicator color="#fff" size="large" />
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

export default PromoteActivity;

const styles = StyleSheet.create({});
