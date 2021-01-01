import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Caption} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {FONTS} from '../../../constants';
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
          width: 120,
        },
      ]}>
      <Caption style={[FONTS.h4]}>{t('profile.distance')}</Caption>
      <View style={{height: 30, flexDirection: 'row'}}>
        <Text style={[FONTS.h2]}>{user.user_recode.distance}</Text>
      </View>
      <Caption style={[FONTS.h5]}>Km</Caption>
    </View>
  );
};

export default Distance;

const styles = StyleSheet.create({});
