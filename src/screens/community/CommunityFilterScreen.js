import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input, CheckBox} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';

import {FONTS, COLORS} from '../../constants';

import moment from 'moment';
import 'moment/locale/th';
import LocalizationContext from '../LocalizationContext';
moment.locale('th');

const ActivityFilterScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const {control, handleSubmit, errors} = useForm();
  const [focus, setFocus] = useState({});
  const [option, setOption] = useState({});

  const onSubmit = (data) => {
    // dispatch(setLoading(true));
    // setTimeout(() => {
    //   dispatch(signIn(data));
    // }, 1000);

    navigation.navigate('Community');
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: COLORS.background, padding: 20}}>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <Input
            placeholder={t('communityfilter.activity')}
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
                borderColor: focus.activity
                  ? COLORS.pinkPastel
                  : COLORS.inputPlaceholderColor,
              },
            ]}
            inputStyle={{fontFamily: 'SF-Pro-Text-Regular'}}
            onChangeText={(value) => onChange(value)}
            value={value}
            onFocus={() => {
              setFocus({...focus, activity: true});
            }}
            onBlur={() => {
              setFocus({...focus, activity: false});
            }}
          />
        )}
        name="activity"
        // rules={{required: true}}
        defaultValue=""
      />
      <View style={{marginBottom: 20}}>
        <Text style={[FONTS.h2]}>{t('createpost.find')}</Text>
        <CheckBox
          title={t('createpost.form_team')}
          checked={option.form_team}
          onPress={() => setOption({...option, form_team: !option.form_team})}
          containerStyle={{borderWidth: 0, padding: 0}}
          checkedColor={COLORS.pinkPastel}
          textStyle={[FONTS.h3]}
        />
        <CheckBox
          title={t('createpost.share_accomodation')}
          checked={option.share_accomodation}
          onPress={() =>
            setOption({
              ...option,
              share_accomodation: !option.share_accomodation,
            })
          }
          containerStyle={{borderWidth: 0, padding: 0}}
          checkedColor={COLORS.pinkPastel}
          textStyle={[FONTS.h3]}
        />
        <CheckBox
          title={t('createpost.share_transportation')}
          checked={option.share_transportation}
          onPress={() =>
            setOption({
              ...option,
              share_transportation: !option.share_transportation,
            })
          }
          containerStyle={{borderWidth: 0, padding: 0}}
          checkedColor={COLORS.pinkPastel}
          textStyle={[FONTS.h3]}
        />
        <CheckBox
          title={t('createpost.share_trip')}
          checked={option.share_trip}
          onPress={() =>
            setOption({
              ...option,
              share_trip: !option.share_trip,
            })
          }
          containerStyle={{borderWidth: 0, padding: 0}}
          checkedColor={COLORS.pinkPastel}
          textStyle={[FONTS.h3]}
        />
      </View>
      <View style={{marginBottom: 20}}>
        <Text style={[FONTS.h2]}>{t('createpost.gender')}</Text>
        <CheckBox
          title={t('createpost.male')}
          checked={option.male}
          onPress={() =>
            setOption({
              ...option,
              male: !option.male,
            })
          }
          containerStyle={{borderWidth: 0, padding: 0}}
          checkedColor={COLORS.pinkPastel}
          textStyle={[FONTS.h3]}
        />
        <CheckBox
          title={t('createpost.female')}
          checked={option.female}
          onPress={() =>
            setOption({
              ...option,
              female: !option.female,
            })
          }
          containerStyle={{borderWidth: 0, padding: 0}}
          checkedColor={COLORS.pinkPastel}
          textStyle={[FONTS.h3]}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Button
          label={t('communityfilter.find')}
          color={COLORS.pinkPastel}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
};

export default ActivityFilterScreen;

const styles = StyleSheet.create({});
