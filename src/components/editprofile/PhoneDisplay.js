import React, {Fragment, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {FONTS, COLORS} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useForm, Controller} from 'react-hook-form';
import FloatingLabelInput from '../floatinglabelinput/FloatingLabelInput';
import {useDispatch} from 'react-redux';
import {editUserProfile} from '../../redux/actions/UserAction';
import {Snackbar} from 'react-native-paper';

const PhoneDisplay = ({user}) => {
  const {t} = React.useContext(LocalizationContext);
  const [open, setOpen] = useState(false);
  const {control, handleSubmit, errors, reset} = useForm();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const setErrorMessage = (msg) => {
    setError(true);
    setMessage(msg);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    if (data.phone_number.length < 10) {
      setErrorMessage(t('signup.phoneerror'));
    } else {
      dispatch(
        editUserProfile(
          {
            type: 'phone_number',
            phone_number: data.phone_number,
          },
          `${t('signup.phone_number')} ${t('editprofile.sucessed')}`,
        ),
      );
      handleClose();
    }
  };

  return (
    <Fragment>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[FONTS.h3]}>{t('editprofile.phone_number')}</Text>
          <View style={{flex: 1}} />
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              width: 30,
              height: 30,
              backgroundColor: 'rgba(0,0,0,0.4)',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 5,
            }}
            onPress={() => {
              setOpen(true);
            }}>
            <MaterialIcons name="edit" color="#fff" size={15} />
          </TouchableOpacity>
        </View>
        <Text style={[FONTS.body4]}>{user.phone_number}</Text>
      </View>
      <Modal
        isVisible={open}
        style={{justifyContent: 'center'}}
        onBackdropPress={handleClose}
        onBackButtonPress={handleClose}>
        <View
          style={{
            backgroundColor: COLORS.backgroundColor,
            borderRadius: 10,
            padding: 20,
          }}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <FloatingLabelInput
                floatingLabel={t('editprofile.phone_number')}
                inputContainerStyle={{borderBottomWidth: 0}}
                onChangeText={(value) => onChange(value)}
                value={value}
                rightIcon={
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={handleSubmit(onSubmit)}>
                    <Ionicons name="save" size={15} color="#fff" />
                  </TouchableOpacity>
                }
                onSubmitEditing={handleSubmit(onSubmit)}
                keyboardType="phone-pad"
              />
            )}
            name="phone_number"
            defaultValue=""
          />
        </View>
        <Snackbar
          visible={error}
          onDismiss={() => {
            setError(false);
          }}
          style={{
            backgroundColor: '#d9534f',
          }}
          duration={1500}>
          {message}
        </Snackbar>
      </Modal>
    </Fragment>
  );
};

export default PhoneDisplay;
