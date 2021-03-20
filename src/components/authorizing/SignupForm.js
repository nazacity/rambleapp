import React, {useState, Fragment, useEffect} from 'react';
import {Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  setLoading,
  setUploadPictureModal,
  setSnackbarDisplay,
} from '../../redux/actions/AppStateAction';

import {Icon} from 'react-native-elements';

import {FONTS, COLORS, SIZES} from '../../constants';
import Button from '../Button';
import LocalizationContext from '../../screens/LocalizationContext';

import {useForm, Controller} from 'react-hook-form';
import {useNavigation, useRoute} from '@react-navigation/native';
import FloatingLabelInput from '../floatinglabelinput/FloatingLabelInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UploadPictureModal from '../../components/modal/UploadPictureModal';
import {blood_type} from '../../constants';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import DatePickerModal from '../modal/DatePickerModal';
import {post, get} from '../../redux/actions/request';
import PolicyModal from './PolicyModal';
import UserAgreementModal from './UserAgreementModal';

const SignupForm = () => {
  const lang = useSelector((state) => state.appState.lang);
  const {t} = React.useContext(LocalizationContext);
  const {control, handleSubmit, errors, reset} = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const isLoading = useSelector((state) => state.appState.isLoading);

  const lineInfo = route.params.lineInfo;
  const [image, setImage] = useState('');
  dayjs.locale(lang);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  useEffect(() => {
    if (lineInfo.userProfile) {
      setImage(lineInfo.userProfile.pictureURL);
    }
  }, [route]);

  const handleCalendarModalClose = () => {
    setCalendarModalOpen(false);
  };
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const handlePolicyModalClose = () => {
    setPolicyModalOpen(false);
  };

  const [userAgreementModalOpen, setUserAgreementModalOpen] = useState(false);
  const handleUserAgreementModalClose = () => {
    setUserAgreementModalOpen(false);
  };

  const [gender, setGener] = useState([
    {value: 'male', label: t('signup.male')},
    {value: 'female', label: t('signup.female')},
  ]);

  useEffect(() => {
    setGener([
      {value: 'male', label: t('signup.male')},
      {value: 'female', label: t('signup.female')},
    ]);
  }, [lang]);

  // INPUT FUNCTIONS
  const [hidePassword, setHidePassword] = useState(true);

  // FOCUSES
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });

  const onSubmit = async (data) => {
    // if (!image) {
    //   dispatch(
    //     setSnackbarDisplay({
    //       state: 'error',
    //       message: t('signup.noimage'),
    //     }),
    //   );
    // } else
    if (data.username.length < 6) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('signup.usernameerror'),
        }),
      );
    } else if (data.password !== data.confirm_password) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('signup.passwordnotmatch'),
        }),
      );
    } else if (data.password.length < 8) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('signup.password8'),
        }),
      );
    }
    // else if (!data.display_name) {
    //   dispatch(
    //     setSnackbarDisplay({
    //       state: 'error',
    //       message: t('signup.displaynameerror'),
    //     }),
    //   );
    // }
    else if (!data.first_name) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('signup.firstnameerror'),
        }),
      );
    } else if (!data.last_name) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('signup.lastnameerror'),
        }),
      );
    } else if (!data.gender) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('signup.gendererror'),
        }),
      );
    } else if (!data.blood_type) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('signup.bloodtypeerror'),
        }),
      );
    } else {
      dispatch(setLoading(true));
      try {
        const userinfo = {
          username: data.username,
          password: data.password,
          display_name: data.first_name,
          idcard: 'not provided yet',
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number
            ? data.phone_number
            : 'not provided yet',
          birthday: selectedDate,
          gender: data.gender,
          blood_type: data.blood_type,
          user_picture_url: image,
          lineId: lineInfo?.userProfile?.userID
            ? lineInfo.userProfile.userID
            : '',
        };

        const res = await post('/api/everyone/createuser', userinfo);

        if (res.data === 'Successed') {
          dispatch(setLoading(false));
          reset({});
          dispatch(
            setSnackbarDisplay({
              state: 'success',
              message: t('signup.successed'),
            }),
          );
          dispatch(setLoading(false));
          navigation.navigate('Signin');
        } else if (res.data === 'Username is used') {
          dispatch(
            setSnackbarDisplay({
              state: 'error',
              message: t('signup.usedusername'),
            }),
          );
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <Fragment>
      <View
        style={[{flex: 1, backgroundColor: 'white', borderTopLeftRadius: 75}]}>
        <View
          style={{
            paddingTop: 50,
            flex: 1,
          }}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                height: 100,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 100,
                borderColor: COLORS.primary,
              }}
              onPress={() => {
                dispatch(setUploadPictureModal(true));
              }}>
              <ImageBackground
                source={
                  image
                    ? {uri: image}
                    : require('../../../assets/layout/no-user-image.jpg')
                }
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 100}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{marginHorizontal: 30}}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <FloatingLabelInput
                  floatingLabel={t('signup.username')}
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
                  floatingLabel={t('signup.password')}
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
                        value || focus.confirm_password
                          ? COLORS.pinkPastel
                          : COLORS.inputPlaceholderColor
                      }
                      onPress={() => setHidePassword(!hidePassword)}
                    />
                  }
                  secureTextEntry={hidePassword}
                  onFocus={() => {
                    setFocus({...focus, confirm_password: true});
                  }}
                  onBlur={() => {
                    setFocus({...focus, confirm_password: false});
                  }}
                />
              )}
              name="confirm_password"
              // rules={{required: true}}
              defaultValue=""
            />
            {/* <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <FloatingLabelInput
                  floatingLabel={t('signup.displayname')}
                  inputContainerStyle={{borderBottomWidth: 0}}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="display_name"
              defaultValue=""
            /> */}

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
              defaultValue=""
            />
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <FloatingLabelInput
                  floatingLabel={t('signup.phone_number')}
                  inputContainerStyle={{borderBottomWidth: 0}}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  keyboardType="number-pad"
                />
              )}
              name="phone_number"
              defaultValue=""
            />
            <View
              style={{
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.primary,
                  marginLeft: 5,
                  marginBottom: 5,
                }}>
                {t('signup.birthdate')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: COLORS.inputPlaceholderColor,
                  height: 50,
                  borderRadius: 5,
                  alignItems: 'center',
                  paddingLeft: 20,
                }}>
                <Text style={[FONTS.body3, {flex: 1}]}>
                  {dayjs(selectedDate).format('D MMMM YYYY')}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{position: 'absolute', right: 10}}
                  onPress={() => {
                    setCalendarModalOpen(true);
                  }}>
                  <Ionicons
                    name="ios-calendar"
                    size={30}
                    color={COLORS.pinkPastel}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <DropDownPicker
                  items={gender}
                  placeholder={t('signup.gender')}
                  style={[
                    {
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      backgroundColor: 'white',
                      marginVertical: 10,
                    },
                    {
                      borderColor: focus.gender
                        ? COLORS.pinkPastel
                        : COLORS.inputPlaceholderColor,
                      height: 50,
                    },
                  ]}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  zIndex={5001}
                  dropDownStyle={{
                    backgroundColor: COLORS.backgroundColor,
                    marginTop: 10,
                    width: SIZES.width - 60,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: COLORS.pinkPastel,
                    zIndex: 400,
                  }}
                  onChangeItem={(item) => {
                    onChange(item.value);
                  }}
                  onOpen={() => {
                    setFocus({...focus, gender: true});
                  }}
                  onClose={() => {
                    setFocus({...focus, gender: false});
                  }}
                />
              )}
              name="gender"
              // rules={{required: true}}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <DropDownPicker
                  items={blood_type}
                  placeholder={t('signup.bloodtype')}
                  style={[
                    {
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      backgroundColor: 'white',
                      marginVertical: 10,
                    },
                    {
                      borderColor: focus.blood_type
                        ? COLORS.pinkPastel
                        : COLORS.inputPlaceholderColor,
                      height: 50,
                    },
                  ]}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  zIndex={5000}
                  dropDownStyle={{
                    backgroundColor: COLORS.backgroundColor,
                    marginTop: 10,
                    width: SIZES.width - 60,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: COLORS.pinkPastel,
                    zIndex: 400,
                  }}
                  onChangeItem={(item) => {
                    onChange(item.value);
                  }}
                  onOpen={() => {
                    setFocus({...focus, blood_type: true});
                  }}
                  onClose={() => {
                    setFocus({...focus, blood_type: false});
                  }}
                />
              )}
              name="blood_type"
              // rules={{required: true}}
              defaultValue=""
            />
          </View>
          {lang === 'th' && (
            <View
              style={{
                width: '80%',
                alignSelf: 'center',
                marginVertical: 20,
                zIndex: -1,
              }}>
              <Text
                style={[
                  FONTS.body4,
                  {
                    color: 'grey',
                    fontSize: 14,
                    textAlign: 'center',
                  },
                ]}>
                {t('signup.condition1')}
              </Text>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setUserAgreementModalOpen(true);
                  }}>
                  <Text
                    style={[
                      FONTS.body4,
                      {
                        fontSize: 14,
                        textAlign: 'center',
                        textAlign: 'center',
                        color: COLORS.buttonBlue,
                        fontWeight: 'bold',
                      },
                    ]}>
                    {t('signup.useragreement')}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    FONTS.body4,
                    {
                      color: 'grey',
                      fontSize: 14,
                      textAlign: 'center',
                    },
                  ]}>
                  {t('signup.condition2')}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setPolicyModalOpen(true);
                  }}>
                  <Text
                    style={[
                      FONTS.body4,
                      {
                        fontSize: 14,
                        textAlign: 'center',
                        color: COLORS.buttonBlue,
                        fontWeight: 'bold',
                      },
                    ]}>
                    {t('signup.policy')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {lang === 'en' && (
            <View
              style={{
                width: '60%',
                alignSelf: 'center',
                marginVertical: 20,
                zIndex: -1,
              }}>
              <Text
                style={[
                  FONTS.body4,
                  {
                    color: 'grey',
                    fontSize: 14,
                    textAlign: 'center',
                  },
                ]}>
                {t('signup.condition1')}
              </Text>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setUserAgreementModalOpen(true);
                  }}>
                  <Text
                    style={[
                      FONTS.h4,
                      {
                        fontSize: 14,
                        textAlign: 'center',
                        color: COLORS.buttonBlue,
                      },
                    ]}>
                    {t('signup.useragreement')}
                  </Text>
                </TouchableOpacity>
                <Text style={[FONTS.body4, {textAlign: 'center'}]}>
                  {t('signup.condition2')}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setPolicyModalOpen(true);
                  }}>
                  <Text
                    style={[
                      FONTS.h4,
                      {
                        fontSize: 14,
                        textAlign: 'center',
                        color: COLORS.buttonBlue,
                      },
                    ]}>
                    {t('signup.policy')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={{zIndex: -1}}>
            <View style={{alignItems: 'center'}}>
              <Button
                label={t('signup.signup')}
                color={isLoading ? COLORS.inactiveColor : COLORS.pinkPastel}
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
      </View>
      <UploadPictureModal setImage={setImage} />
      <DatePickerModal
        open={calendarModalOpen}
        handleClose={handleCalendarModalClose}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <PolicyModal
        open={policyModalOpen}
        handleClose={handlePolicyModalClose}
      />
      <UserAgreementModal
        open={userAgreementModalOpen}
        handleClose={handleUserAgreementModalClose}
      />
    </Fragment>
  );
};

export default SignupForm;
