import React, {Fragment, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {FONTS, COLORS, theme} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useDispatch, useSelector} from 'react-redux';
import {
  setLoading,
  setSnackbarDisplay,
} from '../../redux/actions/AppStateAction';
import LineLogin from '@xmartlabs/react-native-line';
import {post} from '../../redux/actions/request';
import {setUser} from '../../redux/actions/UserAction';
import VerifyVaccineModal from './VerifyVaccineModal';

const VerifyVaccineDisplay = ({user}) => {
  const {t} = React.useContext(LocalizationContext);
  const lineId = useSelector((state) => state.user.lineId);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            borderRadius: 20,
            marginLeft: 5,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            height: 60,
          }}
          onPress={() => {
            setOpen(true);
          }}>
          <Fontisto
            name="injection-syringe"
            color={lineId ? COLORS.primary : COLORS.inactiveColor}
            size={20}
            style={{marginRight: 20}}
          />
          <Text style={[FONTS.h3]}>
            {lineId
              ? t('editprofile.verifiedvaccine')
              : t('editprofile.notverifiedvaccine')}
          </Text>
        </TouchableOpacity>
      </View>
      <VerifyVaccineModal open={open} handleClose={handleClose} />
    </Fragment>
  );
};

export default VerifyVaccineDisplay;
