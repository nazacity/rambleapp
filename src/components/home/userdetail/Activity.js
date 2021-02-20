import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Caption} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {FONTS, SIZES} from '../../../constants';
import LocalizationContext from '../../../screens/LocalizationContext';

const Distance = ({activity_number}) => {
  const {t} = React.useContext(LocalizationContext);

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'white',
          borderRadius: 15,
          width: (SIZES.width - 40) / 2,
        },
      ]}>
      <Caption style={[FONTS.h3]}>{t('profile.activity')}</Caption>
      <View style={{height: 50, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[FONTS.h1]}>{activity_number}</Text>
      </View>
      <Caption style={[FONTS.h4]}>{t('profile.activityunit')}</Caption>
    </View>
  );
};

export default Distance;

const styles = StyleSheet.create({});
