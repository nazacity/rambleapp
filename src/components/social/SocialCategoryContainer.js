import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SHADOW} from '../../constants';

const data = [
  {
    _id: '1',
    title_th: 'การฝึก',
    title_en: 'Training',
    image:
      'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    _id: '2',
    title_th: 'สุขภาพ',
    title_en: 'Healthy',
    image:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    _id: '3',
    title_th: 'แฟชั่น',
    title_en: 'Trend',
    image:
      'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    _id: '4',
    title_th: 'ท่องเที่ยว',
    title_en: 'Travel',
    image:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
];

const SocialCategoryContainer = () => {
  const lang = useSelector((state) => state.appState.lang);
  const navigation = useNavigation();
  const SocialCategoryCard = ({item, index}) => {
    return (
      <View
        style={[
          {
            width: 300,
            height: 200,
            borderRadius: 10,
            overflow: 'hidden',
            backgroundColor: COLORS.white,
          },
          SHADOW.image,
        ]}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            {
              width: 300,
              height: 200,
            },
            SHADOW.image,
          ]}
          onPress={() => {
            navigation.navigate('SocialCategory', {
              picture_url: item.image,
              title:
                lang === 'th' ? item.title_th : lang === 'en' && item.title_en,
            });
          }}>
          <ImageBackground
            source={{uri: item.image}}
            style={{
              width: 300,
              height: 200,
              resizeMode: 'cover',
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,1)']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              useAngle
              angle={180}
              style={{
                flex: 1,
                left: 0,
                top: 0,
                width: 300,
                height: 200,
              }}
            />
            <View style={{position: 'absolute', bottom: 20, left: 20}}>
              <Text style={[FONTS.h2, {color: COLORS.white}]}>
                {lang === 'th' && item.title_th}
                {lang === 'en' && item.title_en}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        style={{paddingTop: 60}}
        contentContainerStyle={{paddingHorizontal: 20}}
        ItemSeparatorComponent={() => <View style={{margin: 10}} />}
        // keyExtractor={(item,index) => item._id}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => {
          return <SocialCategoryCard item={item} index={index} />;
        }}
        ListFooterComponent={() => <View style={{margin: 40}} />}
      />
    </View>
  );
};

export default SocialCategoryContainer;
