import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
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
import DropDownPicker from 'react-native-dropdown-picker';
import {provinceDict} from '../../constants/provinces';

const AddAddressModal = ({}) => {
  const addAddressModalOpen = useSelector(
    (state) => state.appState.addAddressModal,
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setAddAddressModal(false));
  };
  const isLoading = useSelector((state) => state.appState.isLoading);
  const {t} = React.useContext(LocalizationContext);
  const {control, handleSubmit} = useForm();
  const [error, setError] = useState(false);
  const onSubmit = async (data) => {
    if (
      !data.addressno ||
      !data.address ||
      !data.subdistrict ||
      !data.district ||
      !data.phone_number ||
      !data.zip ||
      !data.province
    ) {
      setError(true);
    } else {
      dispatch(
        addNewAddress(
          {
            address:
              data.addressno +
              ' ' +
              data.address +
              ' ' +
              data.subdistrict +
              ' ' +
              data.district,
            province: data.province,
            zip: data.zip,
            phone_number: data.phone_number,
          },
          t,
        ),
      );
    }
  };
  const [focus, setFocus] = useState({});
  return (
    <Modal
      isVisible={addAddressModalOpen}
      style={{margin: 0, justifyContent: 'flex-end', zIndex: 1}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      avoidKeyboard
      onSwipeComplete={handleClose}
      useNativeDriverForBackdrop
      swipeDirection={['down']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          padding: 20,
          marginTop: 40,
        }}>
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.h2, {textAlign: 'center'}]}>
            {t('addaddress.title')}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 100}}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <FloatingLabelInput
                  floatingLabel={t('addaddress.addressno')}
                  inputContainerStyle={{borderBottomWidth: 0}}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="addressno"
              defaultValue=""
            />
          </View>
          <View style={{margin: 10}} />
          <View style={{flex: 1}}>
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
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <FloatingLabelInput
                  floatingLabel={t('addaddress.subdistrict')}
                  inputContainerStyle={{borderBottomWidth: 0}}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="subdistrict"
              defaultValue=""
            />
          </View>
          <View style={{margin: 10}} />
          <View style={{flex: 1}}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <FloatingLabelInput
                  floatingLabel={t('addaddress.district')}
                  inputContainerStyle={{borderBottomWidth: 0}}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="district"
              defaultValue=""
            />
          </View>
        </View>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <DropDownPicker
              items={provinceDict}
              placeholder={t('createpost.selectprovince')}
              searchable={true}
              defaultValue={value}
              searchablePlaceholder={t('createpost.searchprovince')}
              style={[
                {
                  borderWidth: 1,
                  borderRadius: 3,
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  borderColor: focus.region
                    ? COLORS.pinkPastel
                    : COLORS.inputPlaceholderColor,
                },
              ]}
              containerStyle={{
                height: 50,
                marginVertical: 10,
              }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{
                backgroundColor: COLORS.backgroundColor,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                borderColor: COLORS.pinkPastel,
                zIndex: 400,
              }}
              onChangeItem={(item) => {
                onChange(item.value);
              }}
              onOpen={() => {
                setFocus({...focus, region: true});
              }}
              onClose={() => {
                setFocus({...focus, region: false});
              }}
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
            marginVertical: 30,
          }}>
          <Button
            label={t('addaddress.add')}
            color={isLoading ? COLORS.inactiveColor : COLORS.pinkPastel}
            disabled={isLoading ? true : false}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>

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

export default AddAddressModal;

const styles = StyleSheet.create({});
