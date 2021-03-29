import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FONTS, COLORS, SHADOW, SIZES} from '../../constants';
import ImageModal from 'react-native-image-modal';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';
import LinearGradient from 'react-native-linear-gradient';

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
            width: 300,
            height: 200,
          },
          SHADOW.default,
        ]}>
        <View
          style={{
            width: 300,
            height: 200,
            borderRadius: 5,
            overflow: 'hidden',
          }}>
          <ImageModal
            renderHeader={(close) => {
              return (
                <TouchableOpacity
                  style={{flex: 1, height: 180}}
                  onPress={close}
                />
              );
            }}
            renderFooter={(close) => {
              return (
                <TouchableOpacity
                  style={{flex: 1, height: 150}}
                  onPress={close}
                />
              );
            }}
            ref={imageRef}
            resizeMode="contain"
            imageBackgroundColor={COLORS.background}
            overlayBackgroundColor={COLORS.darkOpacityBlack}
            style={{
              width: 300,
              height: 200,
              borderRadius: 5,
            }}
            source={{
              uri: item.course_picture_url,
            }}
          />
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
              height: 200,
              position: 'absolute',
            }}
          />
        </View>
        <View style={{position: 'absolute', bottom: 20, left: 20}}>
          <Text style={[FONTS.body3, {color: COLORS.white, lineHeight: 18}]}>
            {item.title}
          </Text>
          <Text style={[FONTS.body3, {color: COLORS.white, lineHeight: 18}]}>
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
