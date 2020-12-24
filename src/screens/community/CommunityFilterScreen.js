import React, {useState, useEffect} from 'react';
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

import {FONTS, COLORS, SIZES} from '../../constants';

import moment from 'moment';
import 'moment/locale/th';
import LocalizationContext from '../LocalizationContext';
import BackButton from '../../components/layout/BackButton';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';
import TitleHeader from '../../components/layout/TitleHeader';
moment.locale('th');

const ActivityFilterScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const {control, handleSubmit, errors} = useForm();
  const [focus, setFocus] = useState({});
  const [option, setOption] = useState({});
  const [activityEnum, setActivityEnum] = useState([]);
  const userActivities = useSelector((state) => state.user.user_activities);

  const getActivityIds = () => {
    const enumData = userActivities.map((item) => {
      return {label: item.activity.id.title, value: item.activity.id._id};
    });
    setActivityEnum(enumData);
  };

  useEffect(() => {
    if (userActivities.length) {
      getActivityIds();
    }
  }, []);

  const onSubmit = (data) => {
    // dispatch(setLoading(true));
    // setTimeout(() => {
    //   dispatch(signIn(data));
    // }, 1000);

    navigation.navigate('Community');
  };
  return (
    <View
      style={{
        backgroundColor: COLORS.backgroundColor,
        flex: 1,
        padding: 20,
        paddingTop: 60,
      }}>
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TitleHeader title={t('communityfilter.activity')} />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <DropDownPicker
              items={activityEnum}
              placeholder={t('communityfilter.selectone')}
              style={[
                {
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                },
                {
                  borderColor: focus.region
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
                width: SIZES.width - 42,
                marginTop: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderColor: COLORS.pinkPastel,
                zIndex: 400,
              }}
              onChangeItem={(item) => {
                onChange(item.value);
              }}
              onOpen={() => {
                setFocus({...focus, region: true});
              }}
              onClose={() => {
                setFocus({...focus, region: false});
              }}
            />
          )}
          name="activityId"
          // rules={{required: true}}
          defaultValue=""
        />
        <View style={{marginBottom: 20}}>
          <TitleHeader title={t('createpost.find')} />
          <CheckBox
            title={t('createpost.form_team')}
            checked={option.form_team}
            onPress={() => setOption({...option, form_team: !option.form_team})}
            containerStyle={{
              borderWidth: 0,
              padding: 0,
              backgroundColor: COLORS.backgroundColor,
            }}
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
            containerStyle={{
              borderWidth: 0,
              padding: 0,
              backgroundColor: COLORS.backgroundColor,
            }}
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
            containerStyle={{
              borderWidth: 0,
              padding: 0,
              backgroundColor: COLORS.backgroundColor,
            }}
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
            containerStyle={{
              borderWidth: 0,
              padding: 0,
              backgroundColor: COLORS.backgroundColor,
            }}
            checkedColor={COLORS.pinkPastel}
            textStyle={[FONTS.h3]}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <TitleHeader title={t('createpost.gender')} />
          <CheckBox
            title={t('createpost.male')}
            checked={option.male}
            onPress={() =>
              setOption({
                ...option,
                male: !option.male,
              })
            }
            containerStyle={{
              borderWidth: 0,
              padding: 0,
              backgroundColor: COLORS.backgroundColor,
            }}
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
            containerStyle={{
              borderWidth: 0,
              padding: 0,
              backgroundColor: COLORS.backgroundColor,
            }}
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
    </View>
  );
};

export default ActivityFilterScreen;

const styles = StyleSheet.create({});
