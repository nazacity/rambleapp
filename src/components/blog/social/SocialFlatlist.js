import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SIZES} from '../../../constants';
import {FlatList} from 'react-native-gesture-handler';

const blog_categories = [
  {
    _id: '1',
    title: 'man',
    image:
      'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    _id: '2',
    title: 'women',
    image:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    _id: '3',
    title: 'kids',
    image:
      'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    _id: '4',
    title: 'help',
    image:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
];

const SocialFlatlist = () => {
  const SocialCard = ({item, index}) => {
    return (
      <View
        style={{
          width: 200,
          height: 200,
          borderRadius: 10,
          marginRight: index === blog_categories.length - 1 ? 0 : 10,
          overflow: 'hidden',
        }}>
        <ImageBackground
          source={{uri: item.image}}
          style={{
            width: 200,
            height: 200,
            resizeMode: 'cover',
            borderRadius: 10,
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
              width: SIZES.width / 2,
              height: SIZES.width / 2,
            }}
          />
        </ImageBackground>
      </View>
    );
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={blog_categories}
      contentContainerStyle={{paddingHorizontal: 10}}
      keyExtractor={(item) => item._id}
      renderItem={({item, index}) => {
        return <SocialCard item={item} index={index} />;
      }}
    />
  );
};

export default SocialFlatlist;
