import React, {useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input, CheckBox} from 'react-native-elements';
import Button from '../../components/Button';
import {FONTS, COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import LocalizationContext from '../../screens/LocalizationContext';

const CreatePostForm = ({title}) => {
  const {t} = React.useContext(LocalizationContext);
  const {control, handleSubmit, errors} = useForm();
  const [focus, setFocus] = useState({});
  const [option, setOption] = useState({});
  const navigation = useNavigation();

  const onSubmit = (data) => {
    // dispatch(setLoading(true));
    // setTimeout(() => {
    //   dispatch(signIn(data));
    // }, 1000);

    navigation.navigate('community', {screen: 'Comunnity'});
  };

  return (
    <View
      style={[{flex: 1, backgroundColor: 'white', borderTopLeftRadius: 75}]}>
      <View
        style={{
          paddingVertical: 20,
          flex: 1,
        }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
          <View style={{marginBottom: 20}}>
            <Text style={[FONTS.h2, {textAlign: 'center', marginBottom: 20}]}>
              {title}
            </Text>
            <Text style={[FONTS.h2]}>{t('createpost.find')}</Text>
            <CheckBox
              title={t('createpost.form_team')}
              checked={option.form_team}
              onPress={() =>
                setOption({...option, form_team: !option.form_team})
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
                <Input
                  placeholder={t('createpost.province')}
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
                      borderColor: focus.province
                        ? COLORS.pinkPastel
                        : COLORS.inputPlaceholderColor,
                    },
                  ]}
                  inputStyle={{fontFamily: 'SF-Pro-Text-Regular'}}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  onFocus={() => {
                    setFocus({...focus, province: true});
                  }}
                  onBlur={() => {
                    setFocus({...focus, province: false});
                  }}
                />
              )}
              name="province"
              // rules={{required: true}}
              defaultValue=""
            />
          )}
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
            <Text style={[FONTS.h2]}>{t('createpost.moredetail')}</Text>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  placeholder={t('createpost.moredetail')}
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
                      borderColor: focus.description
                        ? COLORS.pinkPastel
                        : COLORS.inputPlaceholderColor,
                    },
                  ]}
                  inputStyle={{
                    fontFamily: 'SF-Pro-Text-Regular',
                    textAlignVertical: 'top',
                  }}
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

          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
            onPress={() => {
              setOption({...option, acceptTerm: !option.acceptTerm});
            }}>
            <View>
              <CheckBox
                checked={option.acceptTerm}
                //   onPress={() =>
                //     setOption({...option, acceptTerm: !option.acceptTerm})
                //   }
                containerStyle={{borderWidth: 0, padding: 0, margin: 0}}
                checkedColor={COLORS.pinkPastel}
                textStyle={[FONTS.h3, {color: COLORS.pinkText}]}
              />
            </View>
            <Text style={{textAlign: 'center'}}>
              {t('createpost.revealinfoterm')}
            </Text>
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Button
              label={t('createpost.createpost')}
              color={COLORS.pinkPastel}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CreatePostForm;
