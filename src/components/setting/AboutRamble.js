import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {FONTS, COLORS} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useForm, Controller} from 'react-hook-form';
import FloatingLabelInput from '../floatinglabelinput/FloatingLabelInput';
import {useDispatch} from 'react-redux';
import {changePasssword} from '../../redux/actions/UserAction';
import Button from '../../components/Button';
import {Icon} from 'react-native-elements';
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
