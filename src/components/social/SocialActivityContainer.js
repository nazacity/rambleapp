import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SHADOW} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';

const SocialActivityContainer = () => {
  const user_activities = useSelector((state) => state.user.user_activities);
  const data = user_activities.slice(0, 5);
  //   const data = [...user_activities, ...user_activities, ...user_activities];
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();

  const SocialCard = ({item, index}) => {
    return (
      <View
        style={[
          {
            width: 100,
            height: 100,
            borderRadius: 100,
            marginRight: 10,

            backgroundColor: COLORS.white,
          },
          SHADOW.image,
        ]}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            {
              width: 100,
              height: 100,
              borderRadius: 100,
              overflow: 'hidden',
            },
            SHADOW.image,
          ]}
          onPress={() => {
            navigation.navigate('SocialActivity', {
              activity: item.activity.id,
            });
          }}>
          <ImageBackground
            source={{uri: item.activity.id.activity_picture_url}}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'cover',
              borderRadius: 100,
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
      contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 20}}
      ItemSeparatorComponent={() => <View style={{marginBottom: 10}} />}
      // keyExtractor={(item,index) => item._id}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({item, index}) => {
        return <SocialCard item={item} index={index} />;
      }}
    />
  );
};

export default SocialActivityContainer;
