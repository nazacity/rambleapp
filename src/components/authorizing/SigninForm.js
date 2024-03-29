import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Image, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {signIn} from '../../redux/actions/UserAction';
import {post} from '../../redux/actions/request';
import {
  setLoading,
  setPDPAModal,
  setSnackbarDisplay,
} from '../../redux/actions/AppStateAction';

import {Icon, CheckBox} from 'react-native-elements';

import {FONTS, COLORS} from '../../constants';
import Button from '../Button';
import LocalizationContext from '../../screens/LocalizationContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import FloatingLabelInput from '../floatinglabelinput/FloatingLabelInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LineLogin from '@xmartlabs/react-native-line';
import lineLogo from '../../../assets/line/linebutton.png';
import rambleLogo from '../../../assets/logo/ramble-white512.png';
import {appleAuth} from '@invertase/react-native-apple-authentication';

import {everyPost} from '../../redux/actions/request';
import ButtonOutline from '../ButtonOutline';
import PDPAModal from './PDPAModal';

const SigninForm = () => {
  const {t} = React.useContext(LocalizationContext);
  const {control, handleSubmit, reset} = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [memoUsername, setMemoUsername] = useState(false);
  // INPUT FUNCTIONS
  const [hidePassword, setHidePassword] = useState(true);

  // FOCUSES
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });

  const setUsername = async () => {
    const username = await AsyncStorage.getItem('username');
    if (username) {
      reset({
        username: username,
      });
      setMemoUsername(true);
    }
  };

  useEffect(() => {
    setUsername();
  }, []);

  const handleLineLogin = async () => {
    try {
      dispatch(setLoading(true));
      const loginResult = await LineLogin.login({
        botPrompt: 'aggressive',
      });
      if (loginResult) {
        const res = await everyPost('/api/everyone/getUserFromLineToken', {
          accessToken: loginResult.accessToken.access_token,
        });

        if (res.data === 'No user is found') {
          navigation.navigate('Signup', {
            lineInfo: loginResult,
            appleId: '',
          });
        } else if (res.data._id) {
          const user = await everyPost('/users/lineId', {
            lineId: loginResult.userProfile.userID,
          });
          if (user.token) {
            await AsyncStorage.setItem('accessToken', user.token);
            dispatch(signIn(user.user));
            dispatch(
              setSnackbarDisplay({
                state: 'success',
                message: t('signin.welcome'),
              }),
            );
          }
        }
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

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
          if (memoUsername) {
            await AsyncStorage.setItem('username', data.username);
          } else if (!memoUsername) {
            await AsyncStorage.removeItem('username');
          }
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

  const onAppleButtonPress = async () => {
    // performs login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (appleAuthRequestResponse.user) {
        const res = await everyPost('/users/appleId', {
          appleId: appleAuthRequestResponse.user,
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
        } else {
          console.log('no user');
          const createUser = await everyPost(
            '/api/everyone/createuserwithapple',
            {
              appleId: appleAuthRequestResponse.user,
              first_name: appleAuthRequestResponse.fullName.givenName
                ? appleAuthRequestResponse.fullName.givenName
                : 'No name',
              last_name: appleAuthRequestResponse.fullName.familyName
                ? appleAuthRequestResponse.fullName.familyName
                : 'No name',
            },
          );
          console.log(createUser);
          if (createUser.data === 'Successed') {
            try {
              const res = await everyPost('/users/appleId', {
                appleId: appleAuthRequestResponse.user,
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
              dispatch(
                setSnackbarDisplay({
                  state: 'error',
                  message: t('signin.appleloginerror'),
                }),
              );
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('signin.error'),
        }),
      );
    }
  };

  return (
    <View
      style={[{flex: 1, backgroundColor: 'white', borderTopLeftRadius: 75}]}>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            height: 200,
            width: 200,
            alignSelf: 'center',
          }}>
          <Image
            source={require('../../../assets/logo/ramble512.png')}
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <CheckBox
              title={t('signin.rememberusername')}
              checked={memoUsername}
              onPress={() => setMemoUsername(!memoUsername)}
              containerStyle={{
                borderWidth: 0,
                padding: 0,
                backgroundColor: '#fff',
                margin: 0,
              }}
              size={18}
              checkedColor={COLORS.opcaityBlack}
              textStyle={[FONTS.h4, {color: COLORS.opcaityBlack}]}
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
                    color: COLORS.opcaityBlack,
                    marginRight: 10,
                  },
                  FONTS.h4,
                ]}>
                {t('signin.forgotpassword')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            label={t('signin.signin')}
            color={COLORS.pinkPastel}
            onPress={handleSubmit(onSubmit)}
            leftIcon={() => {
              return (
                <Image
                  source={rambleLogo}
                  style={{
                    height: 30,
                    width: 30,
                  }}
                />
              );
            }}
          />
          <View style={{margin: 5}} />
          <Button
            label={t('signin.linelogin')}
            color={COLORS.greenLine}
            onPress={handleLineLogin}
            leftIcon={() => {
              return (
                <Image source={lineLogo} style={{width: 30, height: 30}} />
              );
            }}
          />
          <View style={{margin: 5}} />
          {Platform.OS === 'ios' && (
            <ButtonOutline
              label={t('signin.applelogin')}
              color={COLORS.black}
              textColor={COLORS.black}
              onPress={() => onAppleButtonPress()}
              leftIcon={() => {
                return (
                  <FontAwesome
                    name="apple"
                    size={24}
                    color={COLORS.black}
                    style={{marginLeft: 5}}
                  />
                );
              }}
            />
          )}
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
                navigation.navigate('Signup', {
                  lineInfo: {},
                  appleId: '',
                });
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
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                dispatch(setPDPAModal(true));
              }}>
              <Text
                style={[
                  FONTS.body4,
                  {
                    fontSize: 12,
                    textAlign: 'center',
                    color: COLORS.buttonBlue,
                    fontWeight: 'bold',
                  },
                ]}>
                {t('signin.pdpa')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <PDPAModal />
    </View>
  );
};

export default SigninForm;
