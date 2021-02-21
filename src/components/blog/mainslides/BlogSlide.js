import React from 'react';
import {View, Text, Image, ImageBackground, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {FONTS, SIZES} from '../../../constants';
import BlogFlatlist from './BlogFlatlist';
import {blogs} from '../data';
import LocalizationContext from '../../../screens/LocalizationContext';
import {TouchableOpacity} from 'react-native';
import TitleHeader from '../../layout/TitleHeader';
import {useNavigation} from '@react-navigation/native';

const BlogSlide = ({item}) => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const data = blogs.slice(0, 5);
  const lang = useSelector((state) => state.appState.lang);
  return (
    <View style={{width: SIZES.width}}>
      <View>
        <ImageBackground
          source={{uri: item.image}}
          style={{
            resizeMode: 'cover',
            width: SIZES.width,
            height: 200,
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
      <TitleHeader
        title={t('community.recently')}
        seeAll={() => {
          navigation.jumpTo('community', {
            screen: 'Blogs',
            params: {
              blog: item._id,
              picture_url: item.image,
              title:
                lang === 'th' ? item.title_th : lang === 'en' && item.title_en,
            },
          });
        }}
        paddingHorizontal={20}
        noDot={true}
      />
      <BlogFlatlist data={data} />
    </View>
  );
};

export default BlogSlide;
