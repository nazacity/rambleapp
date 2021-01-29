import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {signIn} from '../../redux/actions/UserAction';
import {post} from '../../redux/actions/request';
import {
  setLoading,
  setSnackbarDisplay,
} from '../../redux/actions/AppStateAction';

import {Icon} from 'react-native-elements';

import {FONTS, COLORS} from '../../constants';
import Button from '../Button';
import LocalizationContext from '../../screens/LocalizationContext';

import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import FloatingLabelInput from '../floatinglabelinput/FloatingLabelInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

const SigninForm = () => {
  const lang = useSelector((state) => state.appState.lang);
  const {t} = React.useContext(LocalizationContext);
  const {control, handleSubmit, errors} = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // INPUT FUNCTIONS
  const [hidePassword, setHidePassword] = useState(true);

  // FOCUSES
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });

  const onSubmit = async (data) => {
    if (!data.username || !data.password) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('signin.nouserorpasserror'),
        }),
      );
    }

    dispatch(setLoading(true));
    setTimeout(async () => {
      try {
        const res = await post('/users/login', {
          username: data.username,
          password: data.password,
        });

        if (res.token) {
          await AsyncStorage.setItem('accessToken', res.token);
          dispatch(signIn(res.user));
          dispatch(
            setSnackbarDisplay({
              state: 'success',
              message: t('signin.welcome'),
            }),
          );
        }
      } catch (error) {
        if (error.message === 'Request failed with status code 401') {
          dispatch(
            setSnackbarDisplay({state: 'error', message: t('signin.401error')}),
          );
        }
        dispatch(setLoading(false));
      }
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[{flex: 1, backgroundColor: 'white', borderTopLeftRadius: 75}]}>
      <View
        style={{
          paddingVertical: 20,
          flex: 1,
        }}>
        <View
          style={{
            height: 200,
            width: 200,
            marginBottom: 20,
            alignSelf: 'center',
          }}>
          <Image
            source={require('../../../assets/logo/ramble.png')}
            style={{
              height: 200,
              width: 200,
            }}
          />
        </View>
        <View style={{marginHorizontal: 30}}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <FloatingLabelInput
                floatingLabel={t('signin.username')}
                inputContainerStyle={{borderBottomWidth: 0}}
                onChangeText={(value) => onChange(value)}
                value={value}
                rightIcon={
                  <Icon
                    name="person-outline"
                    type="ionicon"
                    size={22}
                    color={
                      value || focus.email
                        ? COLORS.primary
                        : COLORS.inputPlaceholderColor
                    }
                  />
                }
                onFocus={() => {
                  setFocus({...focus, email: true});
                }}
                onBlur={() => {
                  setFocus({...focus, email: false});
                }}
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
                floatingLabel={t('signin.password')}
                inputContainerStyle={{borderBottomWidth: 0}}
                onChangeText={(value) => onChange(value)}
                value={value}
                rightIcon={
                  <Icon
                    name={hidePassword ? 'eye-off' : 'eye'}
                    type="ionicon"
                    size={24}
                    color={
                      value || focus.password
                        ? COLORS.pinkPastel
                        : COLORS.inputPlaceholderColor
                    }
                    onPress={() => setHidePassword(!hidePassword)}
                  />
                }
                secureTextEntry={hidePassword}
                onFocus={() => {
                  setFocus({...focus, password: true});
                }}
                onBlur={() => {
                  setFocus({...focus, password: false});
                }}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="password"
            // rules={{required: true}}
            defaultValue=""
          />
          <TouchableOpacity
            style={{marginLeft: 5}}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}>
            <Text
              style={[
                {
                  color: COLORS.pinkText,
                  textAlign: 'right',
                  marginBottom: 10,
                },
                FONTS.h4,
              ]}>
              {t('signin.forgotpassword')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            label={t('signin.signin')}
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
            <Text
              style={[
                {
                  color: COLORS.greyText,
                },
                FONTS.body4,
              ]}>
              {t('signin.noaccount')}
            </Text>
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
                {t('signin.register')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SigninForm;
