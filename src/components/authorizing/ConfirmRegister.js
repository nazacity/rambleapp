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

const ConfirmRegister = () => {
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
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(signIn(data));
    }, 1000);
  };

  return (
    <View
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
            backgroundColor: 'red',
            marginBottom: 20,
            alignSelf: 'center',
          }}></View>
        <View style={{marginVertical: 20}}>
          <Text style={[FONTS.h2, {textAlign: 'center'}]}>
            {t('confirmRegister.appreciated')}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            label={t('signin.signin')}
            color={COLORS.pinkPastel}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </View>
  );
};

export default ConfirmRegister;
