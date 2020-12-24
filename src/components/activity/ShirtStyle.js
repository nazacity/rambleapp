import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';
import ImageModal from 'react-native-image-modal';
import {FONTS, COLORS} from '../../constants';
import TitleHeader from '../layout/TitleHeader';

const ShirtStyle = ({activity}) => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activity.shirt_style')} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          paddingTop: 20,
          flexDirection: 'row',
        }}>
        {activity.shirt_detail.map((item, index) => {
          return (
            <View
              key={index}
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
                source={{uri: item.shirt_picturl_url}}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ShirtStyle;
