import React, {useState} from 'react';
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
import {addNewAddress} from '../../redux/actions/UserAction';

import Button from '../Button';
import LocalizationContext from '../../screens/LocalizationContext';
import {useForm, Controller} from 'react-hook-form';
import FloatingLabelInput from '../floatinglabelinput/FloatingLabelInput';
import {Snackbar} from 'react-native-paper';

const AddAddressModal = ({}) => {
  const addAddressModalOpen = useSelector(
    (state) => state.appState.addAddressModal,
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setAddAddressModal(false));
  };
  const {t} = React.useContext(LocalizationContext);
  const {control, handleSubmit} = useForm();
  const [error, setError] = useState(false);
  const onSubmit = async (data) => {
    if (!data.address || !data.phone_number || !data.zip || !data.province) {
      setError(true);
    } else {
      dispatch(addNewAddress(data));
    }
  };
  return (
    <Modal
      isVisible={addAddressModalOpen}
      style={{margin: 0, justifyContent: 'flex-end', zIndex: 1}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#fff',
            padding: 20,
          }}>
          <View style={{marginBottom: 20}}>
            <Text style={[FONTS.h2, {textAlign: 'center'}]}>
              {t('addaddress.title')}
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
              label={t('addaddress.add')}
              color={COLORS.pinkPastel}
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
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddAddressModal;

const styles = StyleSheet.create({});
