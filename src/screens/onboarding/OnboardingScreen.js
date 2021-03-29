import React, {useRef, useEffect, useState, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
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
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Slide from './Slide';
import Subslide from './Subslide';
import Dot from './Dot';

import {FONTS} from '../../constants';

import SigninForm from '../../components/authorizing/SigninForm';
import {
  checkIsSignedin,
  setEn,
  setTh,
  setLoading,
} from '../../redux/actions/AppStateAction';
import {Avatar} from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import LocalizationContext from '../LocalizationContext';

const {width, height} = Dimensions.get('window');

const Onboarding = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const slides = [
    {
      title: 'Running',
      subtitle_th: 'ประสบการณ์ใหม่',
      description_th: 'ค้นหากิจกรรมวิ่งครั้งแรกของคุณกับคอมมิวนิตี้ของเรา',
      subtitle_en: 'New Experiences',
      description_en: 'Find your first activity with our community',
      color: '#b72065',
      picture: require('../../../assets/onboarding/AW-01.png'),
    },
    {
      title: 'Relationship',
      subtitle_th: 'ค้นพบเพื่อนใหม่',
      description_th: 'ค้นหาเพื่อนใหม่กับสังคมใหม่แห่งการแชร์ของเรา',
      subtitle_en: 'Discover new companies',
      description_en: 'Find new friends with our sharing community',
      color: '#7d0281',
      picture: require('../../../assets/onboarding/AW-02.png'),
    },
    {
      title: 'New way',
      subtitle_th: 'การดำเนินการที่ดีกว่า',
      description_th: 'สะดวกสบายมากขึ้นกับระบบการลงทะเบียนเข้าร่วมการแข่งขัน',
      subtitle_en: 'Better processes',
      description_en: 'More convinient with our registering, and join events',
      color: '#b91e66',
      picture: require('../../../assets/onboarding/AW-03.png'),
    },
    {
      title: 'Simply',
      subtitle_th: 'ออกเดินทางไปกับเพื่อนของคุณ',
      description_th: 'หาเพื่อนร่วมเดินทางท่องเที่ยว ก่อนกิจกรรมของคุณจะเริ่ม',
      subtitle_en: 'Get along with new friends',
      description_en:
        'Find new companies and get along on the trip before your marathon',
      color: '#8a1776',
      picture: require('../../../assets/onboarding/AW-04.png'),
    },
  ];

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
    dispatch(setLoading(false));
    SplashScreen.hide();
  };

  useEffect(() => {
    dispatch(checkIsSignedin(checkSkipOnBoarding, t));
  }, []);

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
        scrollEventThrottle={20}
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
                    source={slide.picture}
                    style={{
                      alignSelf: 'center',
                      width: width / 1.2,
                      height: width / 1.2,
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
            scrollEventThrottle={20}
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
                {slides.map(
                  (
                    {
                      subtitle_th,
                      subtitle_en,
                      description_th,
                      description_en,
                      color,
                    },
                    index,
                  ) => {
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
                        {...{
                          subtitle_th,
                          subtitle_en,
                          description_th,
                          description_en,
                          last,
                        }}
                        color={color}
                      />
                    );
                  },
                )}
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
