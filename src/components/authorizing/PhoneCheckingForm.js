import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {signIn} from '../../redux/actions/UserAction';
import {setLoading} from '../../redux/actions/AppStateAction';

import {Input, Icon} from 'react-native-elements';

import {FONTS, COLORS, SIZES} from '../../constants';
import Button from '../Button';
import LocalizationContext from '../../screens/LocalizationContext';

import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

const PhoneCheckingForm = () => {
  const lang = useSelector((state) => state.appState.lang);
  const {t} = React.useContext(LocalizationContext);
  const {control, handleSubmit, errors} = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // FOCUSES
  const [focus, setFocus] = useState({});

  const onSubmit = (data) => {
    // dispatch(setLoading(true));
    // setTimeout(() => {
    //   dispatch(signIn(data));
    // }, 1000);
    navigation.replace('ConfirmRegister');
  };

  return (
    <View
      style={[{flex: 1, backgroundColor: 'white', borderTopLeftRadius: 75}]}>
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          paddingTop: 150,
        }}>
        <View style={{marginHorizontal: 10}}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                placeholder="OTP"
                placeholderTextColor={COLORS.inputPlaceholderColor}
                inputContainerStyle={[
                  {
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    backgroundColor: 'white',
                    fontFamily: 'SF-Pro-Text-Regular',
                  },
                  {
                    borderColor: focus.email
                      ? COLORS.pinkPastel
                      : COLORS.inputPlaceholderColor,
                  },
                ]}
                inputStyle={{fontFamily: 'SF-Pro-Text-Regular'}}
                onChangeText={(value) => onChange(value)}
                value={value}
                onFocus={() => {
                  setFocus({...focus, email: true});
                }}
                onBlur={() => {
                  setFocus({...focus, email: false});
                }}
              />
            )}
            name="otp"
            // rules={{required: true}}
            defaultValue=""
          />
        </View>

        <View style={{alignItems: 'center'}}>
          <Button
            label={t('phonechecking.confirm')}
            color={COLORS.pinkPastel}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <View
          style={{
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
              onPress={() => {}}>
              <Text
                style={[
                  {
                    color: COLORS.pinkText,
                  },
                  FONTS.h4,
                ]}>
                {t('phonechecking.resend')}
              </Text>
            </TouchableOpacity>
          </View>
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
                navigation.goBack();
              }}>
              <Text
                style={[
                  {
                    color: COLORS.pinkText,
                  },
                  FONTS.h4,
                ]}>
                {t('phonechecking.changephonenumber')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PhoneCheckingForm;
