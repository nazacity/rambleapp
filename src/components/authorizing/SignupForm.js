import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {signIn} from '../../redux/actions/UserAction';
import {setLoading} from '../../redux/actions/AppStateAction';

import {Input, Icon} from 'react-native-elements';

import {FONTS, COLORS} from '../../constants';
import Button from '../Button';
import LocalizationContext from '../../screens/LocalizationContext';

import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import FloatingLabelInput from '../floatinglabelinput/FloatingLabelInput';

const SignupForm = () => {
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

  const onSubmit = (data) => {
    // dispatch(setLoading(true));
    // setTimeout(() => {
    //   dispatch(signIn(data));
    // }, 1000);
    navigation.navigate('PhoneNumberCheck');
  };

  return (
    <View
      style={[{flex: 1, backgroundColor: 'white', borderTopLeftRadius: 75}]}>
      <View
        style={{
          paddingTop: 50,
          flex: 1,
        }}>
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
            // rules={{required: true}}
            defaultValue=""
          />
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
              />
            )}
            name="password"
            // rules={{required: true}}
            defaultValue=""
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <FloatingLabelInput
                floatingLabel={t('signup.confirm_password')}
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
              />
            )}
            name="confirm_password"
            // rules={{required: true}}
            defaultValue=""
          />
          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            <Text style={[FONTS.h2]}>{t('signup.selfinfo')}</Text>
          </View>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <FloatingLabelInput
                floatingLabel={t('signup.first_name')}
                inputContainerStyle={{borderBottomWidth: 0}}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="first_name"
            // rules={{required: true}}
            defaultValue=""
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <FloatingLabelInput
                floatingLabel={t('signup.last_name')}
                inputContainerStyle={{borderBottomWidth: 0}}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="last_name"
            // rules={{required: true}}
            defaultValue=""
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            label={t('signup.signup')}
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
              {t('signup.haveaccount')}
            </Text>
            <TouchableOpacity
              style={{marginLeft: 5}}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('Signin');
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

export default SignupForm;
