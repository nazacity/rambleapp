import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';
import ImageModal from 'react-native-image-modal';
import {FONTS, COLORS, SHADOW} from '../../constants';
import TitleHeader from '../layout/TitleHeader';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

const RacePack = ({activity}) => {
  const {t} = React.useContext(LocalizationContext);

  const RacePackCard = ({item}) => {
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
            source={{uri: item.racepack_picture_url}}
          />
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
              position: 'absolute',
            }}
          />
        </View>
        <View style={{position: 'absolute', bottom: 20, left: 20}}>
          <Text style={[FONTS.body3, {color: COLORS.white, lineHeight: 18}]}>
            {item.title}
          </Text>
        </View>
        <View style={{position: 'absolute', top: 5, right: 5}}>
          <Feather name="zoom-in" size={24} color={COLORS.white} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activity.other')} />
      <View
        style={{
          marginLeft: 20,
        }}>
        {activity.racepack.map((item, index) => {
          return <RacePackCard item={item} key={index} />;
        })}
      </View>
    </View>
  );
};

export default RacePack;
