import React, {Fragment} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, SHADOW, SIZES} from '../../../constants';
import {FlatList} from 'react-native-gesture-handler';
import {shortText} from '../../../services/util';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import {useSelector} from 'react-redux';
import LoveButton from '../layout/LoveButton';
import {useNavigation} from '@react-navigation/native';
import {getSocial} from '../../../redux/actions/request';
import LocalizationContext from '../../../screens/LocalizationContext';

const BlogFlatlist = ({data}) => {
  const {t} = React.useContext(LocalizationContext);
  const lang = useSelector((state) => state.appState.lang);
  const navigation = useNavigation();
  dayjs.locale(lang);
  const BlogCard = ({item, index}) => {
    const handleLike = async () => {
      try {
        const res = await getSocial(`/api/users/likeblog/${item._id}`);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    const handleUnlike = async () => {
      try {
        const res = await getSocial(`/api/users/unlikeblog/${item._id}`);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <View
        style={[
          {
            width: 300,
            height: 200,
            borderRadius: 10,
            marginRight: index === data.length - 1 ? 0 : 10,
          },
          SHADOW.default,
        ]}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            {
              width: 300,
              height: 200,
              backgroundColor: COLORS.white,
              borderRadius: 10,
              overflow: 'hidden',
            },
          ]}
          onPress={() => {
            navigation.navigate('BlogContent', {
              item: item,
            });
          }}>
          <ImageBackground
            source={{uri: item.picture_url}}
            style={{
              width: 300,
              height: 150,
              resizeMode: 'cover',
              borderTopLeftRadius: 10,
              borderTopEndRadius: 10,
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
                width: 300,
                height: 150,
              }}>
              <LoveButton
                likers={item.likers}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
              />
              <View style={{position: 'absolute', bottom: 10, left: 20}}>
                <Text style={[FONTS.body2, {color: COLORS.white}]}>
                  {item.title}
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
          <View
            style={{
              paddingHorizontal: 20,
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text style={[FONTS.body4]}>
              {dayjs(item.createdAt).format('DD MMMM YYYY')}
            </Text>
            <Text style={[FONTS.body4]}>{shortText(item.description, 40)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Fragment>
      {data.length === 0 ? (
        <View
          style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[FONTS.body4, {color: COLORS.black}]}>
            {t('community.comment.noblog')}
          </Text>
        </View>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{paddingHorizontal: 10}}
          bounces={false}
          renderItem={({item, index}) => {
            return <BlogCard item={item} index={index} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default BlogFlatlist;
