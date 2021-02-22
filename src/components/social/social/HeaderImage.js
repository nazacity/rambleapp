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
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';

import {FONTS, COLORS, SIZES, SHADOW} from '../../../constants';
import LocalizationContext from '../../../screens/LocalizationContext';
import BackButton from '../../layout/BackButton';

const MIN_HEIGHT = Platform.OS === 'ios' ? 120 : 85;
const MAX_HEIGHT = 300;

const HeaderImage = ({children, picture_url, title}) => {
  const {t} = React.useContext(LocalizationContext);
  const navTitleView = useRef(null);

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
            source={{uri: picture_url}}
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
              {title}
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
              {title}
            </Text>
          </Animatable.View>
        )}>
        {children}
      </ImageHeaderScrollView>
    </Fragment>
  );
};

export default HeaderImage;

const styles = StyleSheet.create({});
