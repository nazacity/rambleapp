import React from 'react';
import {View, Text} from 'react-native';
import {FONTS, COLORS} from '../../constants';
import ImageModal from 'react-native-image-modal';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';

const Course = ({course}) => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activityfilter.course')} />
      <View style={{marginLeft: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <ImageModal
              resizeMode="contain"
              imageBackgroundColor={COLORS.background}
              overlayBackgroundColor="rgba(0,0,0,0.3)"
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
              }}
              borderRadius={10}
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
        </View>
      </View>
    </View>
  );
};

export default Course;
