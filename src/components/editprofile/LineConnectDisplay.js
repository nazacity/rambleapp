import React, {Fragment, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FONTS, COLORS} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useDispatch, useSelector} from 'react-redux';
import {setSnackbarDisplay} from '../../redux/actions/AppStateAction';
import LineLogin from '@xmartlabs/react-native-line';
import {post} from '../../redux/actions/request';
import {setUser} from '../../redux/actions/UserAction';

const LineConnectDisplay = ({user}) => {
  const {t} = React.useContext(LocalizationContext);
  const lineId = useSelector((state) => state.user.lineId);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);

  const handleLineConnect = async () => {
    setClick(true);
    try {
      const line = await LineLogin.login();

      if (lineId === line.userProfile.userID) {
        dispatch(
          setSnackbarDisplay({
            state: 'error',
            message: t('lineconnect.lineisconnected'),
          }),
        );
        setClick(false);
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
        setClick(false);

        // dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('lineconnect.failed'),
        }),
      );
      setClick(false);

      // dispatch(setLoading(false));
    }
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
          disabled={click}
          style={{
            borderRadius: 5,
            marginLeft: 5,
            alignItems: 'center',
            padding: 20,
            height: 100,
            paddingBottom: 5,
          }}
          onPress={handleLineConnect}>
          <Fontisto
            name="line"
            color={lineId ? COLORS.primary : COLORS.opcaityBlack}
            size={30}
          />
          <View style={{flex: 1}} />
          <Text
            style={[
              FONTS.h5,
              {textAlign: 'center', color: COLORS.opcaityBlack},
            ]}>
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
