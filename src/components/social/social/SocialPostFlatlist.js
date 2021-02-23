import React, {useRef} from 'react';
import {View, Text, ImageBackground, Animated} from 'react-native';
import {SIZES} from '../../../constants';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
import BackButton from '../../layout/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import SocialPostCard from './SocialPostCard';

const SocialFlatlist = ({picture_url, title}) => {
  const data = [
    {
      _id: '1',
      user_picture_url: 'https://img.kapook.com/u/2019/jutharat/w1/za23_8.jpg',
      display_name: 'Ramble',
      text:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      pictures: [
        {
          _id: '1',
          url:
            'https://images.unsplash.com/photo-1600712662084-e54770a9668e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        },
      ],
      createdAt: new Date('2021-01-21'),
    },
    {
      _id: '2',
      user_picture_url: 'https://img.kapook.com/u/2019/jutharat/w1/za23_8.jpg',
      display_name: 'Ramble',
      text:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has',
      pictures: [
        {
          _id: '1',
          url:
            'https://images.unsplash.com/photo-1600712662084-e54770a9668e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        },
        {
          _id: '2',
          url:
            'https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80',
        },
        {
          _id: '3',
          url:
            'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80',
        },
      ],
      createdAt: new Date('2021-02-21'),
    },
    {
      _id: '3',
      user_picture_url: 'https://img.kapook.com/u/2019/jutharat/w1/za23_8.jpg',
      display_name: 'Ramble',
      text:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ',
      pictures: [
        {
          _id: '2',
          url:
            'https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80',
        },
        {
          _id: '3',
          url:
            'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80',
        },
      ],
      createdAt: new Date('2021-02-11'),
    },
    {
      _id: '4',
      user_picture_url: 'https://img.kapook.com/u/2019/jutharat/w1/za23_8.jpg',
      display_name: 'Ramble',
      text:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ',
      pictures: [],
      createdAt: new Date('2021-02-15'),
    },
    {
      _id: '5',
      user_picture_url: 'https://img.kapook.com/u/2019/jutharat/w1/za23_8.jpg',
      display_name: 'Ramble',
      text:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has',
      pictures: [
        {
          _id: '1',
          url:
            'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80',
        },
        {
          _id: '2',
          url:
            'https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80',
        },
      ],
      createdAt: new Date('2021-02-22'),
    },
  ];

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
        ListFooterComponent={() => <View style={{margin: 60}} />}
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

export default SocialFlatlist;
