import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input, CheckBox} from 'react-native-elements';
import Button from '../../components/Button';
import {FONTS, COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import {provinceDict} from '../../constants/provinces';
import {useDispatch, useSelector} from 'react-redux';
import {createUserPost} from '../../redux/actions/UserAction';
import SharingPostTermsAndConditionsModal from '../modal/SharingPostTermsAndConditionModal';

const CreatePostForm = ({activityId, userActivityId}) => {
  const {t} = React.useContext(LocalizationContext);
  const {control, handleSubmit, errors, reset} = useForm();
  const [focus, setFocus] = useState({});
  const [acceptTerm, setAcceptTerm] = useState(false);
  const [termModalOpen, setTermModalOpen] = useState(false);
  const isLoading = useSelector((state) => state.appState.isLoading);

  const handleTermModalClose = () => {
    setTermModalOpen(false);
  };
  const [option, setOption] = useState({
    form_team: false,
    share_accommodation: false,
    share_transportation: false,
    share_trip: false,
    male: false,
    female: false,
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigationUser = () => {
    setOption({
      form_team: false,
      share_accommodation: false,
      share_transportation: false,
      share_trip: false,
      male: false,
      female: false,
      acceptTerm: false,
    });
    reset({});
    navigation.replace('UserPost');
  };

  const onSubmit = async (data) => {
    if (!acceptTerm) {
      Alert.alert(t('createpost.pleaseacceptterms'), '', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);

      return;
    }
    if (!data.description) {
      Alert.alert(t('createpost.nodescription'), t('createpost.pleasefill'), [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      try {
        const post_data = {
          form_team: option.form_team,
          share_accommodation: option.share_accommodation,
          share_transportation: option.share_transportation,
          share_trip: option.share_trip,
          male: option.male,
          female: option.female,
          activity: activityId,
          description: data.description,
          province: data.province ? data.province : '',
          user_activity_id: userActivityId,
        };

        dispatch(createUserPost(post_data, navigationUser));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View
      style={[{flex: 1, backgroundColor: 'white', borderTopLeftRadius: 75}]}>
      <View
        style={{
          padding: 20,
          flex: 1,
        }}>
        <View style={{marginBottom: 20}}>
          <TitleHeader title={t('createpost.find')} />
          <CheckBox
            title={t('createpost.form_team')}
            checked={option.form_team}
            onPress={() => setOption({...option, form_team: !option.form_team})}
            containerStyle={{
              borderWidth: 0,
              padding: 0,
              backgroundColor: '#fff',
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
              backgroundColor: '#fff',
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
              backgroundColor: '#fff',
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
              backgroundColor: '#fff',
            }}
            checkedColor={COLORS.pinkPastel}
            textStyle={[FONTS.h3]}
          />
        </View>
        {option.share_transportation && (
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <DropDownPicker
                items={provinceDict}
                placeholder={t('createpost.selectprovince')}
                searchable={true}
                searchablePlaceholder={t('createpost.searchprovince')}
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
                zIndex={5000}
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
            name="province"
            // rules={{required: true}}
            defaultValue=""
          />
        )}
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
              backgroundColor: '#fff',
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
              backgroundColor: '#fff',
            }}
            checkedColor={COLORS.pinkPastel}
            textStyle={[FONTS.h3]}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <TitleHeader title={t('createpost.moredetail')} />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                placeholder={t('createpost.moredetailcontact')}
                placeholderTextColor={COLORS.inputPlaceholderColor}
                inputContainerStyle={[
                  {
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    backgroundColor: 'white',
                  },
                  {
                    borderColor: focus.description
                      ? COLORS.pinkPastel
                      : COLORS.inputPlaceholderColor,
                  },
                ]}
                inputStyle={[
                  FONTS.h4,
                  {
                    textAlignVertical: 'top',
                    height: 100,
                  },
                ]}
                onChangeText={(value) => onChange(value)}
                value={value}
                onFocus={() => {
                  setFocus({...focus, description: true});
                }}
                onBlur={() => {
                  setFocus({...focus, description: false});
                }}
                multiline={true}
                numberOfLines={5}
              />
            )}
            name="description"
            // rules={{required: true}}
            defaultValue=""
          />
        </View>
        <View
          activeOpacity={0.6}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <View>
            <CheckBox
              checked={acceptTerm}
              onPress={() => setAcceptTerm(!acceptTerm)}
              containerStyle={{borderWidth: 0, padding: 0, margin: 0}}
              checkedColor={COLORS.pinkPastel}
              textStyle={[FONTS.h3, {color: COLORS.primary}]}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[FONTS.body4]}> {t('createpost.iagree')}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setTermModalOpen(true);
              }}>
              <Text
                style={[
                  FONTS.h4,
                  {textAlign: 'center', color: COLORS.buttonBlue},
                ]}>
                {t('createpost.term')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            label={t('createpost.createpost')}
            color={isLoading ? COLORS.inactiveColor : COLORS.pinkPastel}
            disabled={isLoading ? true : false}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
      <SharingPostTermsAndConditionsModal
        open={termModalOpen}
        handleClose={handleTermModalClose}
        setAcceptTerm={setAcceptTerm}
      />
    </View>
  );
};

export default CreatePostForm;
