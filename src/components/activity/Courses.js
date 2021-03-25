import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FONTS, COLORS, SHADOW} from '../../constants';
import ImageModal from 'react-native-image-modal';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';
import {useNavigation} from '@react-navigation/native';

const Courses = ({activity}) => {
  const {t} = React.useContext(LocalizationContext);

  const CourseCard = ({item, index}) => {
    const imageRef = useRef();
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          imageRef.current._open();
        }}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            backgroundColor: COLORS.white,
            borderRadius: 5,
          },
          SHADOW.default,
        ]}>
        <View
          style={{
            width: 100,
            height: 100,
            borderBottomLeftRadius: 5,
            borderTopLeftRadius: 5,
            overflow: 'hidden',
          }}>
          <ImageModal
            ref={imageRef}
            resizeMode="contain"
            imageBackgroundColor={COLORS.background}
            overlayBackgroundColor={COLORS.darkOpacityBlack}
            style={{
              width: 100,
              height: 100,
              borderBottomLeftRadius: 5,
              borderTopLeftRadius: 5,
            }}
            source={{
              uri: item.course_picture_url,
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={[FONTS.body3, {marginLeft: 20}]}>{item.title}</Text>
          <Text style={[FONTS.body3, {marginLeft: 20}]}>
            {t('activity.fee')} {item.price} {t('activity.bath')}
          </Text>
        </View>
        {/* <View style={[SHADOW.default]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('ActivityRegister', {
            course: item,
            activity: activity,
          });
        }}
        style={[
          {
            width: 30,
            height: 30,
            backgroundColor: COLORS.white,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          },
          SHADOW.default,
        ]}>
        <MaterialIcons
          name="arrow-forward-ios"
          color={COLORS.primary}
          size={20}
        />
      </TouchableOpacity>
    </View> */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activityfilter.course')} />
      <View style={{marginLeft: 20}}>
        {activity.courses.map((item, index) => {
          return <CourseCard key={index} item={item} index={index} />;
        })}
      </View>
    </View>
  );
};

export default Courses;
