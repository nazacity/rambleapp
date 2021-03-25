import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FONTS, COLORS, SHADOW} from '../../constants';
import ImageModal from 'react-native-image-modal';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';

const Course = ({course}) => {
  const {t} = React.useContext(LocalizationContext);
  const imageRef = useRef();

  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activityfilter.course')} />
      <View style={{marginLeft: 20}}>
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
                uri: course.course_picture_url,
              }}
            />
          </View>
          <View>
            <Text style={[FONTS.body3, {marginLeft: 20}]}>{course.title}</Text>
            <Text style={[FONTS.body3, {marginLeft: 20}]}>
              {t('activity.fee')} {course.price} {t('activity.bath')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Course;
