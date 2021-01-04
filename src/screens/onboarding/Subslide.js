import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import LocalizationContext from '../LocalizationContext';

// components
import Button from '../../components/Button';

//theme
import {FONTS} from '../../constants';

const Subslide = ({
  subtitle_th,
  subtitle_en,
  description_th,
  description_en,
  last,
  color,
  onPress,
}) => {
  const lang = useSelector((state) => state.appState.lang);
  const {t} = React.useContext(LocalizationContext);

  return (
    <View
      style={{
        alignItems: 'center',
        paddingHorizontal: 10,
        flex: 1,
      }}>
      <View style={{marginTop: 60}}>
        <Text
          variant="title1"
          style={[
            {
              textAlign: 'center',
              marginBottom: 12,
            },
            FONTS.h2,
          ]}>
          {lang === 'th' && subtitle_th}
          {lang === 'en' && subtitle_en}
        </Text>
        <Text
          style={[
            {
              lineHeight: 24,
              textAlign: 'center',
              marginBottom: 40,
            },
            FONTS.body3,
          ]}>
          {lang === 'th' && description_th}
          {lang === 'en' && description_en}
        </Text>
      </View>
      <View style={{flex: 1}} />
      <View style={{marginBottom: 20}}>
        <Button
          label={last ? t('onboarding.getStarted') : t('onboarding.next')}
          color={color}
          {...{onPress}}
        />
      </View>
    </View>
  );
};

export default Subslide;

const styles = StyleSheet.create({
  description: {
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
});
