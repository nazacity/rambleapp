import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FONTS, COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import LocalizationContext from '../../screens/LocalizationContext';

const TitleHeader = ({title, seeAll, paddingHorizontal}) => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 15,
            height: 15,
            backgroundColor: COLORS.primary,
            borderRadius: 10,
            marginRight: 10,
          }}
        />
        <Text style={[FONTS.h3, {color: COLORS.pinkText}]}>{title}</Text>
      </View>
      {seeAll && (
        <TouchableOpacity activeOpacity={0.6} onPress={seeAll}>
          <Text style={[FONTS.h4]}>{t('home.seeall')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TitleHeader;
