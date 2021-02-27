import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SHADOW, SIZES} from '../../constants';
import {getSocial} from '../../redux/actions/request';

// const data = [
//   {
//     _id: '1',
//     title_th: 'การฝึก',
//     title_en: 'Training',
//     image:
//       'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
//   },
//   {
//     _id: '2',
//     title_th: 'สุขภาพ',
//     title_en: 'Healthy',
//     image:
//       'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
//   },
//   {
//     _id: '3',
//     title_th: 'แฟชั่น',
//     title_en: 'Trend',
//     image:
//       'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
//   },
//   {
//     _id: '4',
//     title_th: 'ท่องเที่ยว',
//     title_en: 'Travel',
//     image:
//       'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
//   },
// ];

const SocialCategoryContainer = () => {
  const lang = useSelector((state) => state.appState.lang);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSocialCategory = async () => {
    try {
      const res = await getSocial('/api/users/getsocialcategories');

      if (res.status === 200) {
        setData(res.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialCategory();
  }, []);

  const SocialCategoryCard = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          {
            width: (SIZES.width - 20) / 3,
            height: 80,
            borderRadius: 5,
            overflow: 'hidden',
            backgroundColor: COLORS.white,
          },
        ]}
        onPress={() => {
          navigation.navigate('SocialCategory', {
            picture_url: item.picture_url,
            title:
              lang === 'th' ? item.title_th : lang === 'en' && item.title_en,
            socialId: item._id,
          });
        }}>
        <ImageBackground
          source={{uri: item.picture_url}}
          style={{
            width: (SIZES.width - 20) / 3,
            height: 80,
            resizeMode: 'cover',
            borderRadius: 5,
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
          <View style={{position: 'absolute', bottom: 10, left: 0, right: 0}}>
            <Text
              style={[FONTS.h4, {color: COLORS.white, textAlign: 'center'}]}>
              {lang === 'th' && item.title_th}
              {lang === 'en' && item.title_en}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{height: 120}}>
      {loading ? (
        <View
          style={{alignItems: 'center', justifyContent: 'center', height: 160}}>
          <ActivityIndicator
            color={COLORS.primary}
            size={24}
            style={{marginTop: 30}}
          />
        </View>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          style={{marginTop: 20}}
          contentContainerStyle={{paddingHorizontal: 10}}
          ItemSeparatorComponent={() => <View style={{margin: 5}} />}
          // keyExtractor={(item,index) => item._id}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return <SocialCategoryCard item={item} index={index} />;
          }}
        />
      )}
    </View>
  );
};

export default SocialCategoryContainer;
