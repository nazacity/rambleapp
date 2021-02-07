import React from 'react';
import {View, Text} from 'react-native';
import {FONTS, COLORS, SHADOW} from '../../constants';
import ImageModal from 'react-native-image-modal';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const Courses = ({activity}) => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activityfilter.course')} />
      <View style={{marginLeft: 20}}>
        {activity.courses.map((item, index) => {
          return (
            <View
              key={index}
              style={{flexDirection: 'row', alignItems: 'center'}}>
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
                    uri: item.course_picture_url,
                  }}
                />
              </View>
              <View style={{flex: 1}}>
                <Text style={[FONTS.body3, {marginLeft: 20}]}>
                  {item.title}
                </Text>
                <Text style={[FONTS.body3, {marginLeft: 20}]}>
                  {t('activity.fee')} {item.price} {t('activity.bath')}
                </Text>
              </View>
              <View style={[SHADOW.default]}>
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
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Courses;
