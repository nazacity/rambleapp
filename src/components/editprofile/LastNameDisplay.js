import React, {Fragment, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FONTS, COLORS} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useForm, Controller} from 'react-hook-form';
import FloatingLabelInput from '../floatinglabelinput/FloatingLabelInput';
import {useDispatch} from 'react-redux';
import {editUserProfile} from '../../redux/actions/UserAction';

const LastNameDisplay = ({user}) => {
  const {t} = React.useContext(LocalizationContext);
  const [open, setOpen] = useState(false);
  const {control, handleSubmit, errors, reset} = useForm();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  // FOCUSES
  const [focus, setFocus] = useState({});

  const onSubmit = async (data) => {
    dispatch(
      editUserProfile(
        {
          type: 'last_name',
          last_name: data.last_name,
        },
        `${t('signup.last_name')} ${t('editprofile.sucessed')}`,
      ),
    );
    handleClose();
  };
  return (
    <Fragment>
      <View style={{marginLeft: 20, flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[FONTS.h3]}>{t('signup.last_name')}</Text>
          <View style={{flex: 1}} />
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              width: 30,
              height: 30,
              backgroundColor: 'rgba(0,0,0,0.4)',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 5,
            }}
            onPress={() => {
              setOpen(true);
            }}>
            <MaterialIcons name="edit" color="#fff" size={15} />
          </TouchableOpacity>
        </View>
        <Text style={[FONTS.body4]}>{user.last_name}</Text>
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
                floatingLabel={t('signup.last_name')}
                inputContainerStyle={{borderBottomWidth: 0}}
                onChangeText={(value) => onChange(value)}
                value={value}
                onFocus={() => {
                  setFocus({...focus, email: true});
                }}
                onBlur={() => {
                  setFocus({...focus, email: false});
                }}
                rightIcon={
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={handleSubmit(onSubmit)}>
                    <Ionicons name="save" size={15} color="#fff" />
                  </TouchableOpacity>
                }
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="last_name"
            defaultValue=""
          />
        </View>
      </Modal>
    </Fragment>
  );
};

export default LastNameDisplay;
