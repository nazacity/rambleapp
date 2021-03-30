import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FONTS, COLORS, SHADOW} from '../../constants';
import ImageModal from 'react-native-image-modal';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

const Course = ({course}) => {
  const {t} = React.useContext(LocalizationContext);
  const imageRef = useRef();

  return (
    <View>
      <TitleHeader title={t('activityfilter.course')} />
      <View style={{marginLeft: 20}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              backgroundColor: COLORS.white,
              borderRadius: 5,
            },
          ]}>
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 5,
              backgroundColor: COLORS.primary,
              marginRight: 5,
            }}
          />
          <Text style={[FONTS.body3, {lineHeight: 18, marginRight: 5}]}>
            {course.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Course;
