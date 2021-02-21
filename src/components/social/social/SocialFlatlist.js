import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SHADOW, SIZES} from '../../../constants';
import {useSelector} from 'react-redux';

const SocialFlatlist = () => {
  const user_activities = useSelector((state) => state.user.user_activities);
  const data = user_activities.slice(0, 5);
  const SocialCard = ({item, index}) => {
    return (
      <View
        style={[
          {
            width: 150,
            height: 150,
            borderRadius: 10,
            marginRight: index === data.length - 1 ? 0 : 20,
            overflow: 'hidden',
            backgroundColor: COLORS.white,
          },
          SHADOW.image,
        ]}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            {
              width: 150,
              height: 150,
            },
            SHADOW.image,
          ]}>
          <ImageBackground
            source={{uri: item.activity.id.activity_picture_url}}
            style={{
              width: 150,
              height: 150,
              resizeMode: 'cover',
              borderRadius: 10,
              overflow: 'hidden',
            }}></ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      contentContainerStyle={{paddingHorizontal: 30, paddingVertical: 10}}
      // keyExtractor={(item,index) => item._id}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({item, index}) => {
        return <SocialCard item={item} index={index} />;
      }}
    />
  );
};

export default SocialFlatlist;
