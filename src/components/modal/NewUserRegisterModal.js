import React, {useState, Fragment, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

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
import Modal from 'react-native-modal';
import {Snackbar} from 'react-native-paper';
import LoadingPage from '../LoadingPage';
import {setLoading} from '../../redux/actions/AppStateAction';
import {setUser} from '../../redux/actions/UserAction';

const NewUserRegisterModal = ({open, handleClose}) => {
  const lang = useSelector((state) => state.appState.lang);
  const user = useSelector((state) => state.user);
  const {t} = React.useContext(LocalizationContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const {control, handleSubmit, errors, reset} = useForm();
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

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

  const setErrorMessage = (msg) => {
    setError(true);
    setMessage(msg);
  };

  const onSubmit = async (data) => {
    if (!data.first_name) {
      setErrorMessage(t('signup.firstnameerror'));
    } else if (!data.last_name) {
      setErrorMessage(t('signup.lastnameerror'));
    } else if (data.phone_number.length < 10) {
      setErrorMessage(t('signup.phoneerror'));
    } else if (!data.gender) {
      setErrorMessage(t('signup.gendererror'));
    } else if (!data.blood_type) {
      setErrorMessage(t('signup.bloodtypeerror'));
    } else {
      try {
        dispatch(setLoading(true));
        const userinfo = {
          type: 'new_register',
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number,
          birthday: selectedDate,
          gender: data.gender,
          blood_type: data.blood_type,
        };

        const res = await post('/api/users/edituser', userinfo);

        if (res.status === 200) {
          dispatch(setUser(res.data));
          reset({});
          handleClose();
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: COLORS.backgroundColor,
          padding: 20,
          flex: 1,
        }}>
        <View style={{marginVertical: 20}}>
          <Text style={[FONTS.h3]}>{t('newregister.title')}</Text>
        </View>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <FloatingLabelInput
              floatingLabel={t('newregister.first_name')}
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
              floatingLabel={t('newregister.last_name')}
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
              floatingLabel={t('newregister.phone_number')}
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
            {t('newregister.birthdate')}
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
              {dayjs(selectedDate).locale(lang).format('DD MMMM YYYY')}
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
              placeholder={t('newregister.gender')}
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
        <View>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <DropDownPicker
                items={blood_type}
                placeholder={t('newregister.bloodtype')}
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
                dropDownStyle={{
                  backgroundColor: COLORS.backgroundColor,
                  marginTop: 10,
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
        <View style={{flex: 1}} />
        <View style={{zIndex: -1, marginBottom: 200}}>
          <View style={{alignItems: 'center'}}>
            <Button
              label={t('newregister.save')}
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
      <Snackbar
        visible={error}
        onDismiss={() => {
          setError(false);
        }}
        style={{
          backgroundColor: '#d9534f',
        }}
        duration={1500}>
        {message}
      </Snackbar>
      <LoadingPage />
    </Modal>
  );
};

export default NewUserRegisterModal;
