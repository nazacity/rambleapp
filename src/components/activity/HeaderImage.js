import React, {useRef, Fragment, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';

import {COLORS, SIZES} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import BackButton from '../layout/BackButton';
import ButtonSection from './ButtonSection';
import LineShareButton from '../layout/LineShareButton';
import NotificationButton from '../layout/NotificationButton';
import {StatusBar} from 'react-native';
// import Share from 'react-native-share';

const MIN_HEIGHT = Platform.OS === 'ios' ? 120 : 85;
const MAX_HEIGHT = 300;

const HeaderImage = ({
  children,
  activity,
  location,
  userActivity,
  buttonAction,
  setUserActivity,
}) => {
  const {t} = React.useContext(LocalizationContext);
  const navTitleView = useRef(null);

  const announcementNumber = userActivity.announcement
    ? userActivity.announcement.filter((item1) => item1.state === 'not_read')
    : [];

  return (
    <Fragment>
      <BackButton />

      <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        showsVerticalScrollIndicator={false}
        useNativeDriver
        renderHeader={() => (
          <Image
            source={{uri: activity.activity_picture_url}}
            style={{
              height: MAX_HEIGHT,
              width: SIZES.width,
              alignSelf: 'stretch',
              resizeMode: 'cover',
            }}
          />
        )}
        renderForeground={() => (
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {userActivity.announcement && (
              <NotificationButton
                value={announcementNumber.length}
                top={Platform.OS === 'ios' ? 40 : StatusBar.currentHeight}
                right={100}
                userActivity={userActivity}
                setUserActivity={setUserActivity}
              />
            )}
            <LineShareButton
              onPress={() => {
                Linking.openURL(
                  `https://social-plugins.line.me/lineit/share?url=https%3A%2F%2Fliff.line.me%2F1655591354-8d5Zzbm5%3Factivity%3D${activity._id}`,
                );
              }}
            />
            <Text
              style={{
                color: 'white',
                backgroundColor: 'transparent',
                fontSize: 24,
                textAlign: 'center',
                width: 350,
              }}>
              {activity.title}
            </Text>
            {buttonAction && (
              <View style={{position: 'absolute', bottom: 20, right: 20}}>
                <ButtonSection
                  userActivity={userActivity}
                  activity={activity}
                />
              </View>
            )}
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: Platform.OS === 'ios' ? 40 : 5,
              opacity: 0,
            }}
            ref={navTitleView}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                backgroundColor: 'transparent',
              }}>
              {activity.title}
            </Text>
          </Animatable.View>
        )}>
        {location && (
          <TriggeringView
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onHide={() => {
              console.log('test');
              navTitleView.current.fadeInUp(50);
            }}
            onDisplay={() => navTitleView.current.fadeOut(50)}>
            {activity.location && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: COLORS.pinkPastel,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 20,
                  borderRadius: 50,
                }}
                onPress={() => {
                  Linking.openURL(
                    `https://www.google.com/maps/search/?api=1&query=${activity.location.lat},${activity.location.lng}`,
                  );
                }}>
                <Ionicons name="location-sharp" size={20} color="#fff" />
              </TouchableOpacity>
            )}
            <View style={{width: 60}}>
              <Text>{t('createpost.province')} </Text>
              <Text>{t('activity.place')} </Text>
            </View>
            <View>
              <Text>{activity.location.province}</Text>
              <Text>{activity.location.place_name}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}></View>
          </TriggeringView>
        )}
        {children}
      </ImageHeaderScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 10,
          zIndex: 100,
          flexDirection: 'row',
        }}>
        {activity.contact?.phone_number && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: 40,
              height: 40,
              backgroundColor: COLORS.pinkPastel,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              borderRadius: 50,
            }}
            onPress={() => {
              Linking.openURL(`tel:${activity.contact.phone_number}`);
            }}>
            <FontAwesome name="phone" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        {activity.contact?.line && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: 40,
              height: 40,
              backgroundColor: COLORS.pinkPastel,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              borderRadius: 50,
            }}
            onPress={() => {
              Linking.openURL(`http://line.me/ti/p/~${activity.contact.line}`);
            }}>
            <Fontisto name="line" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        {activity.contact?.facebook && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: 40,
              height: 40,
              backgroundColor: COLORS.pinkPastel,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              borderRadius: 50,
            }}
            onPress={() => {
              Linking.openURL(`${activity.contact.facebook}`);
            }}>
            <Fontisto name="facebook" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </Fragment>
  );
};

export default HeaderImage;

const styles = StyleSheet.create({});
