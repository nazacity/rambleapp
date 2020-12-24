import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';
import ImageModal from 'react-native-image-modal';
import {FONTS, COLORS} from '../../constants';
import TitleHeader from '../layout/TitleHeader';

const Gift = ({activity}) => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activity.gifts')} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          paddingTop: 20,
          flexDirection: 'row',
        }}>
        {activity.gifts.map((item, index) => {
          return (
            <View key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 10,
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
                  source={{uri: item.gift_picture_url}}
                />
              </View>
              <Text style={[FONTS.body3, {marginLeft: 20}]}>
                {item.description}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Gift;
