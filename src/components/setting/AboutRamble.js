import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FONTS, COLORS} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const AboutRamble = () => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          borderRadius: 20,
          marginLeft: 5,
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          height: 60,
        }}
        onPress={() => {
          navigation.navigate('AboutRamble');
        }}>
        <Ionicons
          name="ios-information-circle"
          color={COLORS.primary}
          size={20}
          style={{marginRight: 20}}
        />
        <Text style={[FONTS.h3]}>{t('setting.aboutramble')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutRamble;
