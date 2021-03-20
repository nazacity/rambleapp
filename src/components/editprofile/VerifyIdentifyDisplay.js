import React, {Fragment, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {FONTS, COLORS, theme, SHADOW} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

import VerifyIdentifyModal from './VerifyIdentifyModal';
import {useRoute} from '@react-navigation/native';

const VerifyIdentifyAndCovidDisplay = ({user}) => {
  const {t} = React.useContext(LocalizationContext);
  const verifyState = useSelector(
    (state) => state.user.vefiry_information.state,
  );
  const route = useRoute();
  const verfiyIdentifyModalOpen = route.params?.verfiyIdentifyModalOpen
    ? route.params.verfiyIdentifyModalOpen
    : false;

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (verfiyIdentifyModalOpen) {
      setOpen(true);
    }
  }, []);

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
          disabled={verifyState === 'verifying' || verifyState === 'verified'}
          style={{
            borderRadius: 5,
            marginLeft: 5,
            alignItems: 'center',
            padding: 20,
            height: 100,
            paddingBottom: 5,
          }}
          onPress={() => {
            if (verifyState === 'rejected' || verifyState === 'not_verify') {
              setOpen(true);
            }
          }}>
          <MaterialIcons
            name="verified-user"
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
            {verifyState === 'verified' && t('editprofile.verifiedidentity')}
            {verifyState === 'rejected' && t('editprofile.rejected')}
            {verifyState === 'not_verify' &&
              t('editprofile.notverifiedidentity')}
          </Text>
        </TouchableOpacity>
      </View>
      <VerifyIdentifyModal open={open} handleClose={handleClose} />
    </Fragment>
  );
};

export default VerifyIdentifyAndCovidDisplay;
