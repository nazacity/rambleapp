import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';

import {SIZES, FONTS, COLORS} from '../../constants';
import {useSelector, useDispatch} from 'react-redux';
import {setAddAddressModal} from '../../redux/actions/AppStateAction';
import {editAddress} from '../../redux/actions/UserAction';

import Button from '../Button';
import LocalizationContext from '../../screens/LocalizationContext';
import {useForm, Controller} from 'react-hook-form';
import FloatingLabelInput from '../floatinglabelinput/FloatingLabelInput';
import {Snackbar} from 'react-native-paper';

const EditAddressModal = ({address, open, handleClose}) => {
  const {t} = React.useContext(LocalizationContext);
  const {control, handleSubmit, reset} = useForm();
  const [error, setError] = useState(false);
  const isLoading = useSelector((state) => state.appState.isLoading);

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    if (!data.address || !data.phone_number || !data.zip || !data.province) {
      setError(true);
    } else {
      dispatch(editAddress(address._id, data, handleClose, t));
    }
  };
  useEffect(() => {
    reset({
      address: address.address,
      phone_number: address.phone_number,
      zip: address.zip,
      province: address.province,
    });
  }, [address]);
  return (
    <Modal
      isVisible={open}
      style={{margin: 0, justifyContent: 'flex-end', zIndex: 1}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      avoidKeyboard
      onSwipeComplete={handleClose}
      useNativeDriverForBackdrop
      swipeDirection={['down']}>
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          padding: 20,
        }}>
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.h2, {textAlign: 'center'}]}>
            {t('addaddress.edittitle')}
          </Text>
        </View>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <FloatingLabelInput
              floatingLabel={t('addaddress.address')}
              inputContainerStyle={{borderBottomWidth: 0}}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="address"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <FloatingLabelInput
              floatingLabel={t('addaddress.province')}
              inputContainerStyle={{borderBottomWidth: 0}}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="province"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <FloatingLabelInput
              floatingLabel={t('addaddress.zip')}
              inputContainerStyle={{borderBottomWidth: 0}}
              onChangeText={(value) => onChange(value)}
              value={value}
              keyboardType="number-pad"
            />
          )}
          name="zip"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <FloatingLabelInput
              floatingLabel={t('addaddress.phone')}
              inputContainerStyle={{borderBottomWidth: 0}}
              onChangeText={(value) => onChange(value)}
              value={value}
              keyboardType="phone-pad"
            />
          )}
          name="phone_number"
          defaultValue=""
        />
        <View
          style={{
            alignItems: 'center',
          }}>
          <Button
            label={t('addaddress.edit')}
            color={isLoading ? COLORS.inactiveColor : COLORS.pinkPastel}
            disabled={isLoading ? true : false}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
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
        {t('addaddress.error')}
      </Snackbar>
    </Modal>
  );
};

export default EditAddressModal;

const styles = StyleSheet.create({});
