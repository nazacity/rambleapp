import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Caption} from 'react-native-paper';
import AnimatedNumbers from 'react-native-animated-numbers';
import {useSelector} from 'react-redux';
import {SIZES, FONTS, COLORS, SHADOW} from '../../../constants';
import LocalizationContext from '../../../screens/LocalizationContext';

const Distance = () => {
  const {t} = React.useContext(LocalizationContext);
  const [distance, setDistance] = useState(0);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    setTimeout(() => {
      increase();
    }, 1500);
  }, []);

  const increase = () => {
    setDistance(10);
  };
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
        <AnimatedNumbers
          animateToNumber={distance}
          fontStyle={[FONTS.h2]}
          animationDuration={1800}
        />
      </View>
      <Caption style={[FONTS.h5]}>Km</Caption>
    </View>
  );
};

export default Distance;

const styles = StyleSheet.create({});
