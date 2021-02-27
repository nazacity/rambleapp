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
import BackButton from '../../components/layout/BackButton';
import {useNavigation} from '@react-navigation/native';
import SocialCategoryContainer from '../../components/social/SocialCategoryContainer';
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
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <View style={{position: 'absolute', top: 15, left: 0, right: 0}}>
        <Text style={[FONTS.h1, {color: COLORS.black, textAlign: 'center'}]}>
          Social Community
        </Text>
      </View>
      <BackButton top={10} />

      <SocialCategoryContainer />
      <View style={{marginTop: 20, marginHorizontal: 20}}>
        <Text style={[FONTS.h3, {color: COLORS.black}]}>
          {t('community.socialcomment.activity')}
        </Text>
      </View>
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
      {/* <View
        style={{
          height: 10,
          backgroundColor: COLORS.lightGrey,
          width: SIZES.width,
        }}
      /> */}
    </ScrollView>
  );
};

export default SocialCommuntyScreen;
