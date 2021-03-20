import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import {FONTS, COLORS} from '../../constants';
import {useSelector, useDispatch} from 'react-redux';
import {editEmergencyContact} from '../../redux/actions/UserAction';

import Button from '../Button';
import LocalizationContext from '../../screens/LocalizationContext';
import {useForm, Controller} from 'react-hook-form';
import FloatingLabelInput from '../floatinglabelinput/FloatingLabelInput';
import {Snackbar} from 'react-native-paper';

const EditEmergencyContactModal = ({emergency, open, handleClose}) => {
  const dispatch = useDispatch();
  const {t} = React.useContext(LocalizationContext);
  const isLoading = useSelector((state) => state.appState.isLoading);
  const {control, handleSubmit, reset} = useForm();
  const [error, setError] = useState(false);
  const onSubmit = async (data) => {
    if (!data.name || !data.relationship || !data.phone_number) {
      setError(true);
    } else {
      dispatch(editEmergencyContact(emergency._id, data, handleClose, t));
    }
  };

  useEffect(() => {
    reset({
      name: emergency.name,
      relationship: emergency.relationship,
      phone_number: emergency.phone_number,
    });
  }, [emergency]);
  return (
    <Modal
      isVisible={open}
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
            {t('addemergencycontact.edittitle')}
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
            label={t('addemergencycontact.edit')}
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
        {t('addemergencycontact.error')}
      </Snackbar>
    </Modal>
  );
};

export default EditEmergencyContactModal;

const styles = StyleSheet.create({});
