import React, {useEffect, useRef, useState} from 'react';
import {View, Text, ImageBackground, Animated} from 'react-native';
import {COLORS, SIZES} from '../../../constants';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
import BackButton from '../../layout/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import SocialPostCard from './SocialPostCard';
import {postSocial} from '../../../redux/actions/request';
import {ActivityIndicator} from 'react-native';

const SocialFlatlist = ({picture_url, title, data, loading, fetchPosts}) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const height = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [300, 100],
    extrapolate: 'clamp',
  });

  return (
    <View>
      <BackButton />
      <Animated.FlatList
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={data}
        ListHeaderComponent={() => (
          <Animated.View
            style={{
              width: SIZES.width,
              height: height,
              overflow: 'hidden',
              borderBottomRightRadius: 75,
              marginBottom: 40,
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
        keyExtractor={(item, index) => item._id}
        // keyExtractor={(item, index) => `${index}`}
        // ItemSeparatorComponent={() => <View style={{margin: 10}} />}

        renderItem={({item, index}) => {
          return <SocialPostCard item={item} index={index} />;
        }}
        ListFooterComponent={
          <View style={{marginBottom: 100}}>
            {loading && (
              <View style={{flex: 1, marginBottom: 50}}>
                <ActivityIndicator color={COLORS.primary} size={24} />
              </View>
            )}
          </View>
        }
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}
        onEndReached={fetchPosts}
        onEndReachedThreshold={10}
      />
    </View>
  );
};

export default SocialFlatlist;
