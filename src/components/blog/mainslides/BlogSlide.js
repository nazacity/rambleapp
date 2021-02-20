import React from 'react';
import {View, Text, Image, ImageBackground, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SIZES} from '../../../constants';
import BlogFlatlist from './BlogFlatlist';

const data = [
  {
    key: 'man',
    title: 'man',
    image:
      'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    key: 'women',
    title: 'women',
    image:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    key: 'kids',
    title: 'kids',
    image:
      'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    key: 'skullcandy',
    title: 'skullcandy',
    image:
      'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    key: 'help',
    title: 'help',
    image:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
];

const BlogSlide = ({item}) => {
  return (
    <View style={{width: SIZES.width}}>
      <View>
        <ImageBackground
          source={{uri: item.image}}
          style={{
            resizeMode: 'cover',
            width: SIZES.width,
            height: 300,
          }}>
          <LinearGradient
            colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.0)']}
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
        </ImageBackground>
      </View>
      <View style={{margin: 20}}>
        <Text>Top Trend</Text>
      </View>
      <BlogFlatlist data={data} />
    </View>
  );
};

export default BlogSlide;
