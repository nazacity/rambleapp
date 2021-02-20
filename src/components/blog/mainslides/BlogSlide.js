import React from 'react';
import {View, Text, Image, ImageBackground, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {SIZES} from '../../../constants';
import BlogFlatlist from './BlogFlatlist';
import {blogs} from '../data';

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
      <BlogFlatlist data={blogs} />
    </View>
  );
};

export default BlogSlide;
