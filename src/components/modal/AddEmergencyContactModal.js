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
import {setEmergencyModal} from '../../redux/actions/AppStateAction';
import {addNewEmergencyContact} from '../../redux/actions/UserAction';

import Button from '../Button';
import LocalizationContext from '../../screens/LocalizationContext';
import {useForm, Controller} from 'react-hook-form';
import FloatingLabelInput from '../floatinglabelinput/FloatingLabelInput';
import {Snackbar} from 'react-native-paper';

const AddEmergencyContactModal = ({}) => {
  const addEmergencyContactModalOpen = useSelector(
    (state) => state.appState.addEmergencyContactModal,
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setEmergencyModal(false));
  };
  const {t} = React.useContext(LocalizationContext);
  const {control, handleSubmit} = useForm();
  const [error, setError] = useState(false);
  const onSubmit = async (data) => {
    if (!data.name || !data.relationship || !data.phone_number) {
      setError(true);
    } else {
      dispatch(addNewEmergencyContact(data, t));
    }
  };
  return (
    <Modal
      isVisible={addEmergencyContactModalOpen}
      style={{margin: 0, justifyContent: 'flex-end'}}
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
            {t('addemergencycontact.title')}
          </Text>
        </View>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <FloatingLabelInput
              floatingLabel={t('addemergencycontact.name')}
              inputContainerStyle={{borderBottomWidth: 0}}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="name"
          // rules={{required: true}}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <FloatingLabelInput
              floatingLabel={t('addemergencycontact.relationship')}
              inputContainerStyle={{borderBottomWidth: 0}}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="relationship"
          // rules={{required: true}}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <FloatingLabelInput
              floatingLabel={t('addemergencycontact.phone')}
              inputContainerStyle={{borderBottomWidth: 0}}
              onChangeText={(value) => onChange(value)}
              value={value}
              keyboardType="phone-pad"
            />
          )}
          name="phone_number"
          // rules={{required: true}}
          defaultValue=""
        />

        <View
          style={{
            alignItems: 'center',
            marginVertical: 30,
          }}>
          <Button
            label={t('addemergencycontact.add')}
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
        {t('addemergencycontact.error')}
      </Snackbar>
    </Modal>
  );
};

export default AddEmergencyContactModal;

const styles = StyleSheet.create({});
