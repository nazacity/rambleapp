import React, {Fragment, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {FONTS, COLORS} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useForm, Controller} from 'react-hook-form';
import FloatingLabelInput from '../floatinglabelinput/FloatingLabelInput';
import {useDispatch} from 'react-redux';
import {changePasssword} from '../../redux/actions/UserAction';
import Button from '../../components/Button';
import {Icon} from 'react-native-elements';
import {Snackbar} from 'react-native-paper';

const ChangePasswordDisplay = ({user}) => {
  const {t} = React.useContext(LocalizationContext);
  const [open, setOpen] = useState(false);
  const {control, handleSubmit, errors, reset} = useForm();
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  // FOCUSES
  const [focus, setFocus] = useState({});

  const setErrorMessage = (msg) => {
    setError(true);
    setMessage(msg);
  };

  const onSubmit = async (data) => {
    if (data.new_password.length < 8) {
      setErrorMessage(t('signup.password8'));
    } else if (data.new_password !== data.confirm_password) {
      setErrorMessage(t('signup.passwordnotmatch'));
    } else {
      dispatch(
        changePasssword(
          {
            old_password: data.old_password,
            new_password: data.new_password,
          },
          t,
          handleClose,
          setErrorMessage,
        ),
      );
    }
  };
  return (
    <Fragment>
      <View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            borderRadius: 20,
            marginLeft: 5,
            padding: 20,
          }}
          onPress={() => {
            setOpen(true);
          }}>
          <Text style={[FONTS.h3]}>{t('editprofile.changepassword')}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={open}
        style={{justifyContent: 'center'}}
        onBackdropPress={handleClose}>
        <View
          style={{
            backgroundColor: COLORS.backgroundColor,
            borderRadius: 10,
            padding: 20,
          }}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <FloatingLabelInput
                floatingLabel={t('editprofile.oldpassword')}
                inputContainerStyle={{borderBottomWidth: 0}}
                onChangeText={(value) => onChange(value)}
                value={value}
                onFocus={() => {
                  setFocus({...focus, old_password: true});
                }}
                onBlur={() => {
                  setFocus({...focus, old_password: false});
                }}
                rightIcon={
                  <Icon
                    name={hidePassword ? 'eye-off' : 'eye'}
                    type="ionicon"
                    size={24}
                    color={
                      value || focus.old_password
                        ? COLORS.pinkPastel
                        : COLORS.inputPlaceholderColor
                    }
                    onPress={() => setHidePassword(!hidePassword)}
                  />
                }
                secureTextEntry={hidePassword}
              />
            )}
            name="old_password"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <FloatingLabelInput
                floatingLabel={t('editprofile.newpassword')}
                inputContainerStyle={{borderBottomWidth: 0}}
                onChangeText={(value) => onChange(value)}
                value={value}
                onFocus={() => {
                  setFocus({...focus, new_password: true});
                }}
                onBlur={() => {
                  setFocus({...focus, new_password: false});
                }}
                rightIcon={
                  <Icon
                    name={hidePassword ? 'eye-off' : 'eye'}
                    type="ionicon"
                    size={24}
                    color={
                      value || focus.new_password
                        ? COLORS.pinkPastel
                        : COLORS.inputPlaceholderColor
                    }
                    onPress={() => setHidePassword(!hidePassword)}
                  />
                }
                secureTextEntry={hidePassword}
              />
            )}
            name="new_password"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <FloatingLabelInput
                floatingLabel={t('editprofile.confirmpassword')}
                inputContainerStyle={{borderBottomWidth: 0}}
                onChangeText={(value) => onChange(value)}
                value={value}
                onFocus={() => {
                  setFocus({...focus, confirm_password: true});
                }}
                onBlur={() => {
                  setFocus({...focus, confirm_password: false});
                }}
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
              />
            )}
            name="confirm_password"
            defaultValue=""
          />
          <View style={{alignItems: 'center'}}>
            <Button
              label={t('editprofile.changepassword')}
              color={COLORS.pinkPastel}
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
          {message}
        </Snackbar>
      </Modal>
    </Fragment>
  );
};

export default ChangePasswordDisplay;
