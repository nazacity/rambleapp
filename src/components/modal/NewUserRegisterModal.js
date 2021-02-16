import React, {useState, Fragment, useEffect} from 'react';
import {Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  setLoading,
  setUploadPictureModal,
  setSnackbarDisplay,
} from '../../redux/actions/AppStateAction';

import {Input, Icon} from 'react-native-elements';

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
import moment from 'moment';
import 'moment/locale/th';
import DatePickerModal from '../modal/DatePickerModal';
import {post, get} from '../../redux/actions/request';
const NewUserRegisterModal = ({open, handleClose}) => {
  const lang = useSelector((state) => state.appState.lang);
  const user = useSelector((state) => state.user);
  const {t} = React.useContext(LocalizationContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const {control, handleSubmit, errors, reset} = useForm();
  const dispatch = useDispatch();
  moment.locale(lang);
  const navigation = useNavigation();

  const handleCalendarModalClose = () => {
    setCalendarModalOpen(false);
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

  useEffect(() => {
    reset({
      first_name: user.first_name,
      last_name: user.last_name,
    });
  }, []);

  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });

  const onSubmit = async (data) => {
    if (!data.first_name) {
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
          type: 'new_register',
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number
            ? data.phone_number
            : 'not provided yet',
          birthday: selectedDate,
          gender: data.gender,
          blood_type: data.blood_type,
        };

        const res = await post('/api/user/edit', userinfo);

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
    <Modal
      isVisible={open}
      style={{margin: 0}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}>
      <ScrollView>
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
              borderRadius: 10,
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Text style={[FONTS.body3, {flex: 1}]}>
              {moment(selectedDate).format('DD MMMM YYYY')}
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
        <View style={{zIndex: -1}}>
          <View style={{alignItems: 'center'}}>
            <Button
              label={t('signup.signup')}
              color={COLORS.pinkPastel}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </ScrollView>
      <DatePickerModal
        open={calendarModalOpen}
        handleClose={handleCalendarModalClose}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </Modal>
  );
};

export default NewUserRegisterModal;
