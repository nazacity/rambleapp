import React, {useRef, useEffect, useState, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  useValue,
  interpolateColor,
  onScrollEvent,
} from 'react-native-redash/lib/module/v1';
import Animated, {
  multiply,
  divide,
  interpolate,
  Extrapolate,
  timing,
  Easing,
} from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import LocalizationContext from '../LocalizationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Slide from './Slide';
import Subslide from './Subslide';
import Dot from './Dot';

import {FONTS, COLORS} from '../../constants';

import SigninForm from '../../components/authorizing/SigninForm';
import {
  checkIsSignedin,
  setEn,
  setTh,
} from '../../redux/actions/AppStateAction';
import {Avatar} from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';

const {width, height} = Dimensions.get('window');

const slides_en = [
  {
    title: 'Marathon',
    subtitle: 'New Experiences',
    description: 'Find your first marathon with our community',
    color: COLORS.onboarding1,
    picture: 'http://clipart-library.com/image_gallery2/Fashion.png',
  },
  {
    title: 'Relationship',
    subtitle: 'Discover new companies',
    description: 'Find new friends with our sharing community',
    color: COLORS.onboarding2,
    picture:
      'http://clipart-library.com/image_gallery2/Fashion-Transparent.png',
  },
  {
    title: 'New way',
    subtitle: 'Better processes',
    description:
      'More convinient with our registering, checking in and chekcing out processes',
    color: COLORS.onboarding3,
    picture:
      'http://clipart-library.com/image_gallery2/Fashion-Free-Download-PNG.png',
  },
  {
    title: 'Simply',
    subtitle: 'Get along with new friends',
    description:
      'Find new companies and get along on the trip before your marathon',
    color: COLORS.onboarding4,
    picture:
      'http://clipart-library.com/images_k/fashion-girl-silhouette/fashion-girl-silhouette-8.png',
  },
];

const slides_th = [
  {
    title: 'Marathon',
    subtitle: 'ประสบการณ์ใหม่',
    description: 'ค้นหาการวิ่งมาราธอนครั้งแรกของคุณ',
    color: COLORS.onboarding1,
    picture: 'http://clipart-library.com/image_gallery2/Fashion.png',
  },
  {
    title: 'Relationship',
    subtitle: 'ค้นพบเพื่อนใหม่',
    description: 'ค้นหาเพื่อนใหม่กับสังคมใหม่แห่งการแชร์ของเรา',
    color: COLORS.onboarding2,
    picture:
      'http://clipart-library.com/image_gallery2/Fashion-Transparent.png',
  },
  {
    title: 'New way',
    subtitle: 'การดำเนินการที่ดีกว่า',
    description: 'สะดวกสบายมากขึ้นกับระบบการลงทะเบียน เช็คอิน และเช็คเอ้าท์',
    color: COLORS.onboarding3,
    picture:
      'http://clipart-library.com/image_gallery2/Fashion-Free-Download-PNG.png',
  },
  {
    title: 'Simply',
    subtitle: 'ออกเดินทางไปกับเพื่อนของคุณ',
    description: 'หาเพื่อนร่วมเดินทางท่องเที่ยว ก่อนกิจกรรมของคุณจะเริ่ม',
    color: COLORS.onboarding4,
    picture:
      'http://clipart-library.com/images_k/fashion-girl-silhouette/fashion-girl-silhouette-8.png',
  },
];

const Onboarding = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const lang = useSelector((state) => state.appState.lang);
  const [slides, setSlides] = useState(slides_en);
  const SLIDE_HEIGHT = useValue(height * 0.5);
  const [isSignInState, setIsSignInState] = useState(false);
  const dispatch = useDispatch();

  const checkSkipOnBoarding = async () => {
    const skipOnBoarding = await AsyncStorage.getItem('skipOnBoarding');
    if (skipOnBoarding === 'true') {
      getStarted.start(async ({finished}) => {
        setIsSignInState(true);
        getSignin.start();
      });
    }
    SplashScreen.hide();
  };

  useEffect(() => {
    dispatch(checkIsSignedin(checkSkipOnBoarding));
    if (lang === 'th') {
      setSlides(slides_th);
    } else if (lang === 'en') {
      setSlides(slides_en);
    }
  }, [lang]);

  const scroll = useRef(null);
  const x = useValue(0);
  const onScroll = onScrollEvent({x});
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });
  const getStarted = timing(SLIDE_HEIGHT, {
    duration: 500,
    toValue: 100,
    easing: Easing.inOut(Easing.ease),
  });

  const opacityGetStarted = interpolateColor(SLIDE_HEIGHT, {
    inputRange: [100, height * 0.5],
    outputRange: [0, 1],
  });

  // const borderBottomRightRadius = interpolateColor(SLIDE_HEIGHT, {
  //   inputRange: [100, height * 0.5],
  //   outputRange: [0, 75],
  // });

  const opacitySigin = useValue(0);

  const getSignin = timing(opacitySigin, {
    duration: 500,
    toValue: 1,
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{flex: 1, backgroundColor: 'white'}}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            {
              height: SLIDE_HEIGHT,
              borderBottomRightRadius: 75,
            },
            {backgroundColor},
          ]}>
          {!isSignInState &&
            slides.map((slide, index) => {
              const opacity = interpolate(x, {
                inputRange: [
                  (index - 0.5) * width,
                  index * width,
                  (index + 0.5) * width,
                ],
                outputRange: [0, 1, 0],
                extrapolate: Extrapolate.CLAMP,
              });
              return (
                <Animated.View
                  style={[
                    {
                      ...StyleSheet.absoluteFillObject,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      borderBottomRightRadius: 75,
                      overflow: 'hidden',
                    },
                    {opacity: opacityGetStarted},
                  ]}
                  key={index}>
                  <Animated.Image
                    source={{uri: slide.picture}}
                    style={{
                      alignSelf: 'center',
                      width: width / 1.5,
                      height: width / 1.5,
                      resizeMode: 'contain',
                      opacity,
                    }}
                  />
                </Animated.View>
              );
            })}

          <Animated.ScrollView
            ref={scroll}
            horizontal
            snapToInterval={width}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            bounces={false}
            {...{onScroll}}>
            {slides.map(({title, picture}, index) => (
              <Slide
                key={index}
                {...{title, picture}}
                right={!(index % 2)}
                opacity={opacityGetStarted}
              />
            ))}
          </Animated.ScrollView>
        </Animated.View>
        <View style={{flex: 1}}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor,
            }}></Animated.View>

          <Animated.View
            style={[
              {
                flex: 1,
                backgroundColor: 'white',
                borderTopLeftRadius: 75,
              },
              // {
              //   width: width * slides.length,
              //   flex: 1,
              //   transform: [{ translateX: multiply(x, -1) }],
              // },
            ]}>
            {!isSignInState && (
              <Animated.View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  height: 75,
                  justifyContent: 'center',
                  paddingTop: 20,
                  flexDirection: 'row',
                  opacity: opacityGetStarted,
                }}>
                {slides.map((_, index) => (
                  <Dot
                    key={index}
                    currentIndex={divide(x, width)}
                    {...{index}}
                  />
                ))}
              </Animated.View>
            )}
            {!isSignInState && (
              <Animated.View
                style={{
                  width: width * slides.length,
                  flex: 1,
                  flexDirection: 'row',
                  transform: [{translateX: multiply(x, -1)}],
                  opacity: opacityGetStarted,
                }}>
                {slides.map(({subtitle, description, color}, index) => {
                  const last = index === slides.length - 1;

                  return (
                    <Subslide
                      key={index}
                      onPress={() => {
                        if (!last) {
                          if (scroll.current) {
                            scroll.current?.getNode().scrollTo({
                              x: width * (index + 1),
                              animated: true,
                            });
                          }
                        } else if (last) {
                          //   navigation.navigate('Signin');
                          getStarted.start(async ({finished}) => {
                            setIsSignInState(true);
                            getSignin.start();
                            await AsyncStorage.setItem(
                              'skipOnBoarding',
                              'true',
                            );
                          });
                          //   SLIDE_HEIGHT.setValue(100);
                        }
                      }}
                      {...{subtitle, description, last}}
                      color={color}
                    />
                  );
                })}
              </Animated.View>
            )}
            {isSignInState && (
              <Animated.View
                style={{
                  opacity: opacitySigin,
                  paddingVertical: 20,
                  flex: 1,
                }}>
                <SigninForm />
              </Animated.View>
            )}
          </Animated.View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}>
        <TouchableOpacity onPress={() => dispatch(setTh())}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 12,
              paddingHorizontal: 16,
            }}>
            <Avatar
              rounded
              source={require('../../../assets/nationicon/thailand.png')}
              containerStyle={{backgroundColor: '#fff', marginRight: 5}}
              size={20}
            />
            <Text style={[FONTS.body5]}>ไทย</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setEn())}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 12,
              paddingHorizontal: 16,
            }}>
            <Avatar
              rounded
              source={require('../../../assets/nationicon/united-kingdom.png')}
              containerStyle={{backgroundColor: '#fff', marginRight: 5}}
              size={20}
            />
            <Text style={[FONTS.body5]}>Eng</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;
