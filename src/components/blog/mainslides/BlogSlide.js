import React from 'react';
import {View, ImageBackground, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {SIZES} from '../../../constants';
import BlogFlatlist from './BlogFlatlist';
import LocalizationContext from '../../../screens/LocalizationContext';
import TitleHeader from '../../layout/TitleHeader';
import {useNavigation} from '@react-navigation/native';

const BlogSlide = ({item}) => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const lang = useSelector((state) => state.appState.lang);

  return (
    <View style={{width: SIZES.width}}>
      <View>
        <ImageBackground
          source={{uri: item.picture_url}}
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
              blogCategoryId: item._id,
              picture_url: item.picture_url,
              title:
                lang === 'th' ? item.title_th : lang === 'en' && item.title_en,
            },
          });
        }}
        paddingHorizontal={20}
        noDot={true}
      />
      <BlogFlatlist data={item.blogs} />
    </View>
  );
};

export default BlogSlide;
