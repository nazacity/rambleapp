import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SIZES} from '../../../constants';
import {FlatList} from 'react-native-gesture-handler';

const data = [
  {
    key: 'man',
    title: 'man',
    image:
      'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ref: React.createRef(),
  },
  {
    key: 'women',
    title: 'women',
    image:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ref: React.createRef(),
  },
  {
    key: 'kids',
    title: 'kids',
    image:
      'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ref: React.createRef(),
  },
  {
    key: 'skullcandy',
    title: 'skullcandy',
    image:
      'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ref: React.createRef(),
  },
  {
    key: 'help',
    title: 'help',
    image:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ref: React.createRef(),
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
      contentContainerStyle={{paddingHorizontal: 10}}
      keyExtractor={(item) => item.key}
      renderItem={({item, index}) => {
        return <SocialCard item={item} index={index} />;
      }}
    />
  );
};

export default SocialFlatlist;
