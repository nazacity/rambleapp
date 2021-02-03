import React, {Fragment, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {FONTS, COLORS, theme} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import LineConnectModal from './LineConnectModal';

const LineConnectDisplay = ({user}) => {
  const {t} = React.useContext(LocalizationContext);
  const lineId = useSelector((state) => state.user.lineId);
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
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            height: 60,
          }}
          onPress={() => {
            setOpen(true);
          }}>
          <MaterialIcons
            name="verified-user"
            color={lineId ? COLORS.primary : COLORS.inactiveColor}
            size={24}
            style={{marginRight: 20}}
          />
          <Text style={[FONTS.h3]}>{t('editprofile.lineconnect')}</Text>
        </TouchableOpacity>
      </View>
      <LineConnectModal open={open} handleClose={handleClose} />
    </Fragment>
  );
};

export default LineConnectDisplay;
