import React, {Fragment, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {FONTS, COLORS, theme} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  setLoading,
  setSnackbarDisplay,
} from '../../redux/actions/AppStateAction';
// import LineConnectModal from './LineConnectModal';
import LineLogin from '@xmartlabs/react-native-line';
import {post} from '../../redux/actions/request';
import {setUser} from '../../redux/actions/UserAction';

const LineConnectDisplay = ({user}) => {
  const {t} = React.useContext(LocalizationContext);
  const lineId = useSelector((state) => state.user.lineId);
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleLineConnect = async () => {
    try {
      // dispatch(setLoading(true));
      const line = await LineLogin.login();
      console.log(line.userProfile.userID);

      if (lineId === line.userProfile.userID) {
        dispatch(
          setSnackbarDisplay({
            state: 'error',
            message: t('lineconnect.lineisconnected'),
          }),
        );
      } else {
        const res = await post('/api/users/lineconnect', {
          lineId: line.userProfile.userID,
        });

        if (res.data === 'User is not found') {
          dispatch(
            setSnackbarDisplay({
              state: 'error',
              message: t('lineconnect.failed'),
            }),
          );
        } else if (res.data === 'This line account was used') {
          dispatch(
            setSnackbarDisplay({
              state: 'error',
              message: t('lineconnect.lineisused'),
            }),
          );
        } else {
          dispatch(setUser(res.data));
          dispatch(
            setSnackbarDisplay({
              state: 'success',
              message: t('lineconnect.successed'),
            }),
          );
        }
        // dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('lineconnect.failed'),
        }),
      );
      // dispatch(setLoading(false));
    }
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
          onPress={handleLineConnect}>
          <MaterialIcons
            name="verified-user"
            color={lineId ? COLORS.primary : COLORS.inactiveColor}
            size={24}
            style={{marginRight: 20}}
          />
          <Text style={[FONTS.h3]}>
            {lineId
              ? t('editprofile.changelineconnect')
              : t('editprofile.lineconnect')}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <LineConnectModal open={open} handleClose={handleClose} /> */}
    </Fragment>
  );
};

export default LineConnectDisplay;
