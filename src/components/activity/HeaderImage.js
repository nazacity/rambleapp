import React, {useRef, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import 'moment/locale/th';
moment.locale('th');
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';

import {FONTS, COLORS, SIZES} from '../../constants';
import {HeaderBackButton} from '@react-navigation/stack';
import LocalizationContext from '../../screens/LocalizationContext';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../layout/BackButton';

const MIN_HEIGHT = Platform.OS === 'ios' ? 120 : 85;
const MAX_HEIGHT = 300;

const HeaderImage = ({children, activity, location}) => {
  const {t} = React.useContext(LocalizationContext);
  const navTitleView = useRef(null);
  const navigation = useNavigation();

  return (
    <Fragment>
      <BackButton />
      <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        showsVerticalScrollIndicator={false}
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
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View
            style={{
              height: MIN_HEIGHT,
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
              padding: 20,
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onHide={() => {
              navTitleView.current.fadeInUp(200);
            }}
            onDisplay={() => navTitleView.current.fadeOut(100)}>
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
              <Ionicons name="location-sharp" size={40} color="#fff" />
            </TouchableOpacity>
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
    </Fragment>
  );
};

export default HeaderImage;

const styles = StyleSheet.create({});
