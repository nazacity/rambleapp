import React, {useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, SHADOW, SIZES} from '../../constants';
import {shortText} from '../../services/util';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import {useSelector} from 'react-redux';
import LoveButton from '../../components/blog/layout/LoveButton';
import {useNavigation} from '@react-navigation/native';
import {blogs} from '../../components/blog/data';
import BackButton from '../../components/layout/BackButton';

const MIN_HEIGHT = Platform.OS === 'ios' ? 120 : 85;
const MAX_HEIGHT = 200;
const BlogsScreen = ({navigation, route}) => {
  const lang = useSelector((state) => state.appState.lang);
  const scrollY = useRef(new Animated.Value(0)).current;
  const {picture_url, title} = route.params;
  dayjs.locale(lang);

  const height = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [300, 100],
    extrapolate: 'clamp',
  });
  const BlogCard = ({item, index}) => {
    const scale = scrollY.interpolate({
      inputRange: [-1, 0, (200 / 0.8) * index, (200 / 0.8) * (index + 1)],
      outputRange: [1, 1, 1, 0.8],
    });
    return (
      <Animated.View
        style={[
          {
            width: 300,
            height: 200,
            borderRadius: 10,
            transform: [{scale}],
          },
          SHADOW.default,
        ]}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            {
              width: 300,
              height: 200,
              backgroundColor: COLORS.white,
              borderRadius: 10,
              overflow: 'hidden',
            },
            SHADOW.default,
          ]}
          onPress={() => {
            navigation.navigate('BlogContent', {
              uri: item.link,
            });
          }}>
          <ImageBackground
            source={{uri: item.blog_picture_url}}
            style={{
              width: 300,
              height: 150,
              resizeMode: 'cover',
              borderTopLeftRadius: 10,
              borderTopEndRadius: 10,
              overflow: 'hidden',
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
                width: 300,
                height: 150,
              }}>
              <LoveButton />
              <View style={{position: 'absolute', bottom: 10, left: 20}}>
                <Text style={[FONTS.body2, {color: COLORS.white}]}>
                  {item.title}
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
          <View
            style={{
              paddingHorizontal: 20,
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text style={[FONTS.body4]}>
              {dayjs(item.createdAt).format('DD MMMM YYYY')}
            </Text>
            <Text style={[FONTS.body4]}>{shortText(item.description, 40)}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <BackButton />

      <Animated.FlatList
        showsVerticalScrollIndicator={false}
        data={blogs}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        ListHeaderComponent={() => (
          <Animated.View
            style={{
              width: SIZES.width,
              height: height,
              overflow: 'hidden',
              borderBottomRightRadius: 75,
              marginBottom: 50,
            }}>
            <ImageBackground
              source={{uri: picture_url}}
              style={{resizeMode: 'cover', width: SIZES.width, height: 300}}>
              <LinearGradient
                colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,1)']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                useAngle
                angle={180}
                style={{
                  flex: 1,
                  left: 0,
                  top: 0,
                  width: SIZES.width,
                  height: 300,
                }}
              />
              <View
                style={{
                  width: SIZES.width,
                  height: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 24,
                  }}>
                  {title}
                </Text>
              </View>
            </ImageBackground>
          </Animated.View>
        )}
        ItemSeparatorComponent={() => <View style={{margin: 10}} />}
        renderItem={({item, index}) => {
          return <BlogCard item={item} index={index} />;
        }}
        ListFooterComponent={() => <View style={{marginBottom: 50}} />}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}
      />
    </View>
  );
};

export default BlogsScreen;
