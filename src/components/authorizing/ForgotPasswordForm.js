import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {post} from '../../redux/actions/request';
import {
  setLoading,
  setSnackbarDisplay,
} from '../../redux/actions/AppStateAction';

import {FONTS, COLORS} from '../../constants';
import Button from '../Button';
import LocalizationContext from '../../screens/LocalizationContext';

import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import FloatingLabelInput from '../floatinglabelinput/FloatingLabelInput';

const ForgotPasswordForm = () => {
  const lang = useSelector((state) => state.appState.lang);
  const {t} = React.useContext(LocalizationContext);
  const {control, handleSubmit, errors} = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSubmit = async (data) => {
    if (!data.username || !data.phone_number) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('forgotpassword.fillallform'),
        }),
      );
      return;
    } else {
      dispatch(setLoading(true));
      try {
        const res = await post('/api/everyone/forgotpassword', {
          username: data.username,
          phone_number: data.phone_number,
        });

        if (res.data === 'No user is found') {
          dispatch(
            setSnackbarDisplay({
              state: 'error',
              message: t('forgotpassword.nouser'),
            }),
          );
        } else {
          navigation.navigate('ResetPassword', {
            userId: res.data,
          });
        }
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <View
      style={[{flex: 1, backgroundColor: 'white', borderTopLeftRadius: 75}]}>
      <View
        style={{
          paddingVertical: 20,
          flex: 1,
        }}>
        <View style={{marginHorizontal: 30}}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <FloatingLabelInput
                floatingLabel={t('forgotpassword.username')}
                inputContainerStyle={{borderBottomWidth: 0}}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="username"
            defaultValue=""
          />
        </View>
        <View style={{marginHorizontal: 30}}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <FloatingLabelInput
                floatingLabel={t('forgotpassword.phone_number')}
                inputContainerStyle={{borderBottomWidth: 0}}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="phone_number"
            defaultValue=""
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            label={t('forgotpassword.check')}
            color={COLORS.pinkPastel}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            marginHorizontal: 20,
            paddingBottom: 40,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{marginLeft: 5}}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <Text
                style={[
                  {
                    color: COLORS.pinkText,
                  },
                  FONTS.h4,
                ]}>
                {t('signup.signin')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordForm;
