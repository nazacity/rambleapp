import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SIZES} from '../../../constants';
import {FlatList} from 'react-native-gesture-handler';

const BlogFlatlist = ({data}) => {
  const BlogCard = ({item, index}) => {
    return (
      <View
        style={{
          width: 200,
          height: 200,
          borderRadius: 10,
          marginRight: index === data.length - 1 ? 0 : 10,
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
      data={data}
      keyExtractor={(item) => item._id}
      pagingEnabled
      contentContainerStyle={{paddingHorizontal: 10}}
      bounces={false}
      renderItem={({item, index}) => {
        return <BlogCard item={item} index={index} />;
      }}
    />
  );
};

export default BlogFlatlist;
