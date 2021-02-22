import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input, CheckBox} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';

import {FONTS, COLORS, SIZES} from '../../constants';

import LocalizationContext from '../LocalizationContext';
import BackButton from '../../components/layout/BackButton';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector, useDispatch} from 'react-redux';
import TitleHeader from '../../components/layout/TitleHeader';
import {setLoading} from '../../redux/actions/AppStateAction';
import {setFilteredUserPosts} from '../../redux/actions/CommunityAction';
import {get} from '../../redux/actions/request';

const ActivityFilterScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const {control, handleSubmit, errors} = useForm();
  const [focus, setFocus] = useState({});
  const [option, setOption] = useState({
    form_team: false,
    share_accommodation: false,
    share_transportaion: false,
    share_trip: false,
    male: false,
    female: false,
  });
  const [activityEnum, setActivityEnum] = useState([]);
  const userActivities = useSelector((state) => state.user.user_activities);
  const dispatch = useDispatch();
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

  const onSubmit = async (data) => {
    if (!data.activityId) {
      Alert.alert(
        t('activityfilter.noregion'),
        t('activityfilter.selectregion'),
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    } else {
      dispatch(setLoading(true));
      try {
        const res = await get(
          `/api/users/filtereduserposts?activity=${data.activityId}&form_team=${option.form_team}&share_accommodation=${option.share_accommodation}&share_transportation=${option.share_transportation}&share_trip=${option.share_trip}&male=${option.male}&female=${option.female}
          `,
        );

        if (res.status === 200) {
          dispatch(setFilteredUserPosts([...res.data]));
        }
        dispatch(setLoading(false));
        navigation.navigate('FilteredCommunity');
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    }
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
              value={value}
              placeholder={t('communityfilter.selectone')}
              style={[
                {
                  borderWidth: 1,
                  borderRadius: 3,
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
              dropDownStyle={{
                backgroundColor: COLORS.backgroundColor,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
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
            title={t('createpost.share_accommodation')}
            checked={option.share_accommodation}
            onPress={() =>
              setOption({
                ...option,
                share_accommodation: !option.share_accommodation,
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
