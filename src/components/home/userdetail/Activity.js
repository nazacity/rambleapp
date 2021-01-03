import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Caption} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {FONTS, SIZES} from '../../../constants';
import LocalizationContext from '../../../screens/LocalizationContext';

const Distance = () => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'white',
          borderRadius: 15,
          width: (SIZES.width - 40) / 2,
          padding: 20,
        },
      ]}>
      <Caption style={[FONTS.h4]}>{t('profile.activity')}</Caption>
      <View style={{height: 30, flexDirection: 'row'}}>
        <Text style={[FONTS.h2]}>5</Text>
      </View>
      <Caption style={[FONTS.h5]}>{t('profile.activityunit')}</Caption>
    </View>
  );
};

export default Distance;

const styles = StyleSheet.create({});
