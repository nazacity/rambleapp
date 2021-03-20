import React, {Fragment, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {FONTS, COLORS, theme, SHADOW} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import VerifyVaccineModal from './VerifyVaccineModal';

const VerifyVaccineDisplay = ({user}) => {
  const {t} = React.useContext(LocalizationContext);
  const verifyState = useSelector((state) => state.user.vefiry_vaccine.state);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <View
        style={[
          {
            borderRadius: 5,
            flex: 1,
          },
        ]}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            borderRadius: 5,
            marginLeft: 5,
            alignItems: 'center',
            padding: 20,
            height: 100,
            paddingBottom: 5,
          }}
          disabled={verifyState === 'verifying' || verifyState === 'verified'}
          onPress={() => {
            if (verifyState === 'rejected' || verifyState === 'not_verify') {
              setOpen(true);
            }
          }}>
          <Fontisto
            name="injection-syringe"
            color={
              verifyState === 'verified' ? COLORS.primary : COLORS.opcaityBlack
            }
            size={30}
          />
          <View style={{flex: 1}} />
          <Text
            style={[
              FONTS.h5,
              {textAlign: 'center', color: COLORS.opcaityBlack},
            ]}>
            {verifyState === 'verifying' && t('editprofile.verifying')}
            {verifyState === 'verified' && t('editprofile.verifiedvaccine')}
            {verifyState === 'rejected' && t('editprofile.rejectedvaccine')}
            {verifyState === 'not_verify' &&
              t('editprofile.notverifiedvaccine')}
          </Text>
        </TouchableOpacity>
      </View>
      <VerifyVaccineModal open={open} handleClose={handleClose} />
    </Fragment>
  );
};

export default VerifyVaccineDisplay;
