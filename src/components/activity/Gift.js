import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';
import ImageModal from 'react-native-image-modal';
import {FONTS, COLORS, SHADOW} from '../../constants';
import TitleHeader from '../layout/TitleHeader';

const Gift = ({activity}) => {
  const {t} = React.useContext(LocalizationContext);

  const GiftCard = ({item}) => {
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
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 10,
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
              borderTopLeftRadius: 5,
              borderTopLeftRadius: 5,
            }}
            source={{uri: item.gift_picture_url}}
          />
        </View>
        <Text style={[FONTS.body3, {marginLeft: 20}]}>{item.description}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activity.gifts')} />
      <View
        style={{
          marginLeft: 20,
        }}>
        {activity.gifts.map((item, index) => {
          return <GiftCard item={item} key={index} />;
        })}
      </View>
    </View>
  );
};

export default Gift;
