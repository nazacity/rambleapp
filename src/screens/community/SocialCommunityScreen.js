import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS, SHADOW, SIZES} from '../../constants';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import LocalizationContext from '../LocalizationContext';

const SocialCommuntyScreen = () => {
  const user_activities = useSelector((state) => state.user.user_activities);
  const data = user_activities.slice(0, 5);
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();

  const SocialCard = ({item, index}) => {
    return (
      <View
        style={[
          {
            width: 150,
            height: 150,
            borderRadius: 10,
            marginRight: 10,
            overflow: 'hidden',
            backgroundColor: COLORS.white,
          },
        ]}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            {
              width: 150,
              height: 150,
            },
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

export default SocialCommuntyScreen;
