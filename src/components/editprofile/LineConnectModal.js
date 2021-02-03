import React, {Fragment, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {FONTS, COLORS, theme} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useForm, Controller} from 'react-hook-form';
import FloatingLabelInput from '../floatinglabelinput/FloatingLabelInput';
import {useDispatch, useSelector} from 'react-redux';
import {changePasssword, refresh} from '../../redux/actions/UserAction';
import Button from '../../components/Button';
import {Icon} from 'react-native-elements';
import {Snackbar} from 'react-native-paper';
import WebView from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';

const LineConnectModal = ({handleClose, open}) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // FOCUSES
  //   const [focus, setFocus] = useState({});

  //   const setErrorMessage = (msg) => {
  //     setError(true);
  //     setMessage(msg);
  //   };

  //   const onSubmit = async (data) => {
  //     if (data.new_password.length < 8) {
  //       setErrorMessage(t('signup.password8'));
  //     } else if (data.new_password !== data.confirm_password) {
  //       setErrorMessage(t('signup.passwordnotmatch'));
  //     } else {
  //       dispatch(
  //         changePasssword(
  //           {
  //             old_password: data.old_password,
  //             new_password: data.new_password,
  //           },
  //           t,
  //           handleClose,
  //           setErrorMessage,
  //         ),
  //       );
  //     }
  //   };

  return (
    <Modal
      isVisible={open}
      style={{margin: 0}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}>
      <View
        style={{
          backgroundColor: COLORS.backgroundColor,
          flex: 1,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            position: 'absolute',
            zIndex: 100,
            top: 10,
            right: 10,
          }}
          onPress={() => {
            dispatch(refresh());
            handleClose();
          }}>
          <MaterialIcons name="cancel" color={COLORS.buttonBlue} size={24} />
        </TouchableOpacity>
        <WebView
          source={{
            uri: `https://ramble-club.com/lineconnect?user_id=${user._id}`,
          }}
          renderLoading={() => (
            <Spinner
              visible={true}
              textContent={'Loading...'}
              textStyle={{
                color: '#FFF',
              }}
              color={COLORS.primary}
            />
          )}
        />

        {/* <View style={{position: 'absolute', alignSelf: 'center', bottom: 10}}>
          <Button
            label={t('lineconnect.accept')}
            color={COLORS.pinkPastel}
            onPress={handleSubmit(onSubmit)}
          />
        </View> */}
      </View>
      {/* <Snackbar
        visible={error}
        onDismiss={() => {
          setError(false);
        }}
        style={{
          backgroundColor: '#d9534f',
        }}
        duration={1500}>
        {message}
      </Snackbar> */}
    </Modal>
  );
};

export default LineConnectModal;
