import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
  Platform,
} from 'react-native';
// import {activity} from '../../config/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import ImageModal from 'react-native-image-modal';
import moment from 'moment';
import 'moment/locale/th';
moment.locale('th');
import Timeline from 'react-native-timeline-flatlist';

import MinorAdvertise from '../../components/advertise/MinorAdvertise';
import Button from '../../components/Button';
import {FONTS, COLORS, SIZES} from '../../constants';
import LocalizationContext from '../LocalizationContext';
import {getActivityById} from '../../redux/actions/ActivityAction';

import Spinner from 'react-native-loading-spinner-overlay';
import CouponCard from '../../components/card/CouponCard';
import RecordCard from '../../components/card/RecordCard';

const ActivityDetailScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);
  const activity = useSelector((state) => state.activity.activity);
  const {activityId, state} = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userActivity, setUserActivity] = useState({
    state: 'unregister',
  });

  const checkUserActivities = () => {
    const checkActivity = user.user_activities.find(
      (item) => item.activity.id._id === activityId,
    );
    if (checkActivity) {
      setUserActivity(checkActivity);
    }
  };

  useEffect(() => {
    if (userActivity.state === 'history') {
      navigation.replace('ActivityHistory', {
        userActivity: userActivity,
      });
    }
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getActivityById(activityId, setLoading, checkUserActivities));
    });

    return unsubscribe;
  }, [user, userActivity]);

  if (loading) {
    return (
      <Spinner
        visible={true}
        textContent={'Loading...'}
        textStyle={{
          color: '#FFF',
        }}
        color={COLORS.pinkPastel}
      />
    );
  }

  if (userActivity.state === 'finished') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 100,
          }}></View>
        <RecordCard item={userActivity} />
        {userActivity.coupons.map((item, index) => {
          if (item.state) {
            return <View key={index} />;
          }
          return (
            <View
              key={index}
              style={{
                alignItems: 'center',
                marginVertical: 20,
                borderRadius: 10,
              }}>
              <CouponCard
                item={item}
                userActivityId={userActivity._id}
                setUserActivity={setUserActivity}
              />
            </View>
          );
        })}
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={{backgroundColor: COLORS.background, flex: 1}}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 100,
        }}></View>
      <View style={{padding: 20}}>
        <View
          style={{
            width: 300,
            height: 200,
            borderRadius: 10,
            alignSelf: 'center',
            marginBottom: 20,
            marginTop: -90,
            overflow: 'hidden',
          }}>
          <ImageModal
            resizeMode="contain"
            imageBackgroundColor={COLORS.background}
            overlayBackgroundColor="rgba(0,0,0,0.3)"
            style={{
              width: 300,
              height: 200,
              borderRadius: 10,
            }}
            borderRadius={10}
            source={{uri: activity.activity_picture_url}}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.h2]}>{activity.title}</Text>
          <Text style={[FONTS.body3, {marginBottom: 20}]}>
            {activity.sub_title}
          </Text>
          <Text style={[FONTS.body4]}>{activity.description}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              backgroundColor: COLORS.pinkPastel,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
            }}
            onPress={() => {
              Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${activity.location.lat},${activity.location.lng}`,
              );
            }}>
            <Ionicons name="location-sharp" size={40} />
          </TouchableOpacity>
          <View style={{width: 60}}>
            <Text>{t('createpost.province')} </Text>
            <Text>{t('activity.place')} </Text>
          </View>
          <View>
            <Text>{activity.location.province}</Text>
            <Text>{activity.location.place_name}</Text>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.h2]}>{t('activity.register_date')}</Text>
          <View style={{flexDirection: 'row', marginLeft: 20}}>
            <Text style={[FONTS.body3]}>
              {moment(activity.register_start_date).format('DD MMMM YYYY')}
            </Text>
            <Text style={[FONTS.body3, {marginHorizontal: 10}]}>-</Text>
            <Text style={[FONTS.body3]}>
              {moment(activity.register_end_date).format('DD MMMM YYYY')}
            </Text>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.h2]}>{t('activityfilter.course')}</Text>
          <View style={{marginLeft: 20}}>
            {activity.courses.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}>
                    <ImageModal
                      resizeMode="contain"
                      imageBackgroundColor={COLORS.background}
                      overlayBackgroundColor="rgba(0,0,0,0.3)"
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                      }}
                      borderRadius={10}
                      source={{
                        uri: item.course_picture_url,
                      }}
                    />
                  </View>
                  <View>
                    <Text style={[FONTS.body3, {marginLeft: 20}]}>
                      {item.title}
                    </Text>
                    <Text style={[FONTS.body3, {marginLeft: 20}]}>
                      {t('activity.fee')} {item.price} {t('activity.bath')}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.h2]}>{t('activity.detail')}</Text>
          <ScrollView horizontal style={{marginTop: 20}}>
            <View style={{width: SIZES.width - 40}}>
              <Timeline
                data={activity.timeline}
                circleColor={COLORS.orangePastel}
                titleStyle={[{color: '#000'}, FONTS.body3]}
                descriptionStyle={[{color: 'gray'}, FONTS.body4]}
                lineColor={COLORS.orangePastel}
              />
            </View>
          </ScrollView>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.h2]}>{t('activity.gifts')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              paddingTop: 20,
              flexDirection: 'row',
            }}>
            {activity.gifts.map((item, index) => {
              return (
                <View key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 10,
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}>
                    <ImageModal
                      resizeMode="contain"
                      imageBackgroundColor={COLORS.background}
                      overlayBackgroundColor="rgba(0,0,0,0.3)"
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                      }}
                      source={{uri: item.gift_picture_url}}
                    />
                  </View>
                  <Text style={[FONTS.body3, {marginLeft: 20}]}>
                    {item.description}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.h2]}>{t('activity.shirt_style')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              paddingTop: 20,
              flexDirection: 'row',
            }}>
            {activity.shirt_detail.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 10,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}>
                  <ImageModal
                    resizeMode="contain"
                    imageBackgroundColor={COLORS.background}
                    overlayBackgroundColor="rgba(0,0,0,0.3)"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                    }}
                    source={{uri: item.shirt_picturl_url}}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.h2]}>{t('activity.rule')}</Text>
          {activity.rules.map((item, index) => {
            return (
              <View
                key={index}
                style={{paddingHorizontal: 20, marginBottom: 5}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      backgroundColor: 'red',
                      width: 10,
                      height: 10,
                      borderRadius: 10,
                      marginRight: 10,
                    }}
                  />
                  <Text style={[FONTS.h4]}>{item.title}</Text>
                </View>
                <View style={{paddingLeft: 40}}>
                  {item.detail &&
                    item.detail.map((item, index) => {
                      return (
                        <View key={index}>
                          <Text style={[FONTS.body4]}>{item.description}</Text>
                        </View>
                      );
                    })}
                </View>
              </View>
            );
          })}
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.h2]}>{t('activity.moredetail')}</Text>
          <View style={{paddingLeft: 20}}>
            {activity.more_detail.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={[FONTS.body4]}>{item.description}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <MinorAdvertise />
        <View style={{alignItems: 'center'}}>
          {userActivity.state === 'waiting_payment' && (
            <Button
              label={t('activity.payment')}
              color={COLORS.pinkPastel}
              onPress={() => {
                navigation.navigate('Payment', {
                  activity_title: activity.title,
                  activity_picture_url: activity.activity_picture_url,
                  course: userActivity.activity.course,
                  size: userActivity.size,
                });
              }}
            />
          )}
          {userActivity.state === 'upcoming' && (
            <Button
              label={t('activity.findfriend')}
              color={COLORS.pinkPastel}
              onPress={() => {
                navigation.navigate('CreatePost', {
                  activity: {
                    title: activity.title,
                    activity_picture_url: activity.activity_picture_url,
                  },
                });
              }}
            />
          )}
          {userActivity.state === 'actual_date' && (
            <Button
              label={t('activity.checkin')}
              color={COLORS.pinkPastel}
              onPress={() => {
                navigation.navigate('QrcodeScanner', {
                  activityId: activityId,
                  userActivityId: userActivity._id,
                  state: 'check_in',
                });
              }}
            />
          )}
          {userActivity.state === 'checked_in' && (
            <Button
              label={t('activity.checkout')}
              color={COLORS.pinkPastel}
              onPress={() => {
                navigation.navigate('QrcodeScanner', {
                  courseId: userActivity.activity.course._id,
                  userActivityId: userActivity._id,
                  state: 'check_out',
                });
              }}
            />
          )}
        </View>
      </View>
      <View style={{marginBottom: 50}}></View>
    </ScrollView>
  );
};

export default ActivityDetailScreen;

const styles = StyleSheet.create({});
