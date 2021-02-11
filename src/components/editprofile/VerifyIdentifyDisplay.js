import React, {Fragment, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {FONTS, COLORS, theme} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

import VerifyIdentifyModal from './VerifyIdentifyModal';

const VerifyIdentifyAndCovidDisplay = ({user}) => {
  const {t} = React.useContext(LocalizationContext);
  const verifyState = useSelector(
    (state) => state.user.vefiry_information.state,
  );

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <View>
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={verifyState === 'verifying' || verifyState === 'verified'}
          style={{
            borderRadius: 20,
            marginLeft: 5,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            height: 60,
          }}
          onPress={() => {
            if (verifyState === 'rejected' || verifyState === 'not_verify') {
              setOpen(true);
            }
          }}>
          <MaterialIcons
            name="verified-user"
            color={
              verifyState === 'verified' ? COLORS.primary : COLORS.inactiveColor
            }
            size={20}
            style={{marginRight: 20}}
          />
          <Text style={[FONTS.h3]}>
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
