import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SHADOW, SIZES} from '../../constants';
import {useSelector} from 'react-redux';
import BackButton from '../../components/layout/BackButton';
import {useNavigation} from '@react-navigation/native';
import SocialCategoryContainer from '../../components/social/SocialCategoryContainer';

const SocialCommuntyScreen = () => {
  const user_activities = useSelector((state) => state.user.user_activities);
  const data = user_activities.slice(0, 5);

  const navigation = useNavigation();

  const SocialCard = ({item, index}) => {
    return (
      <View
        style={[
          {
            width: 150,
            height: 150,
            borderRadius: 10,
            marginRight: index % 2 === 1 ? 0 : 20,
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
          ]}
          onPress={() => {
            navigation.navigate('SocialActivity', {
              activity: item.activity.id,
            });
          }}>
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
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <BackButton />
      <SocialCategoryContainer />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        style={{margin: 20}}
        contentContainerStyle={{padding: 20, alignItems: 'center'}}
        ItemSeparatorComponent={() => <View style={{margin: 10}} />}
        // keyExtractor={(item,index) => item._id}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => {
          return <SocialCard item={item} index={index} />;
        }}
        numColumns={2}
        ListFooterComponent={() => <View style={{margin: 40}} />}
      />
    </View>
  );
};

export default SocialCommuntyScreen;
