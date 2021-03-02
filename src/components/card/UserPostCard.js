import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import LocalizationContext from '../../screens/LocalizationContext';
import {FONTS, COLORS, SIZES, SHADOW} from '../../constants';
import {Avatar} from 'react-native-elements';
import profile from '../../../assets/profile/profile.png';

const UserPostCard = ({item, editState}) => {
  const lang = useSelector((state) => state.appState.lang);
  dayjs.locale(lang);
  const {t} = React.useContext(LocalizationContext);

  return (
    <Fragment>
      <View
        style={[
          SHADOW.default,
          {borderRadius: 10, backgroundColor: COLORS.white},
        ]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            // navigation.navigate('ActivityDetail', {
            //   activity_state: 'unregister',
            // });
          }}
          style={[
            {
              borderRadius: 10,
              width: SIZES.width - 50,
              overflow: 'hidden',
              alignSelf: 'center',
              backgroundColor: COLORS.white,
              padding: 10,
            },
          ]}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 40,
                  marginRight: 10,
                }}>
                <Avatar
                  rounded
                  source={
                    item.user.user_picture_url
                      ? {
                          uri: item.user.user_picture_url,
                        }
                      : profile
                  }
                  size={60}
                />
              </View>
              <View>
                <Text style={[FONTS.h2]}>{item.user.display_name}</Text>
                <View style={{width: 200}}>
                  <Text style={[FONTS.body4]}>
                    {dayjs(item.createdAt).format('วันที่ DD MMMM YYYY')}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 0.5,
                width: '80%',
                alignSelf: 'center',
                borderColor: 'rgba(0,0,0,0.3)',
                marginVertical: 10,
              }}
            />
            <View>
              <View style={{width: 200}}>
                <Text style={[FONTS.h3]}>{t('createpost.find')}</Text>
              </View>
              <View style={{width: 220, flexDirection: 'row'}}>
                <View style={{marginLeft: 20, flex: 1}}>
                  {item.form_team && (
                    <Text style={[FONTS.body4]}>
                      {t('createpost.form_team')}
                    </Text>
                  )}
                  {item.share_accommodation && (
                    <Text style={[FONTS.body4]}>
                      {t('createpost.share_accommodation')}
                    </Text>
                  )}

                  {item.share_transportation && (
                    <View>
                      <Text style={[FONTS.body4]}>
                        {t('createpost.share_transportation')}
                      </Text>
                      <Text style={[FONTS.body4, {marginLeft: 20}]}>
                        {t('createpost.province')}
                        {item.province}
                      </Text>
                    </View>
                  )}

                  {item.share_trip && (
                    <Text style={[FONTS.body4]}>
                      {t('createpost.share_trip')}
                    </Text>
                  )}
                </View>
                <View style={{marginLeft: 20}}>
                  {item.male && (
                    <Text style={[FONTS.body4]}>{t('createpost.male')}</Text>
                  )}
                  {item.female && (
                    <Text style={[FONTS.body4]}>{t('createpost.female')}</Text>
                  )}
                </View>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 0.5,
                width: '80%',
                alignSelf: 'center',
                borderColor: 'rgba(0,0,0,0.3)',
                marginVertical: 10,
              }}
            />
            <View>
              <View style={{width: 200}}>
                <Text style={[FONTS.h3]}>{t('createpost.description')}</Text>
              </View>
              <View style={{marginLeft: 20, flex: 1}}>
                <Text style={[FONTS.body4]}>{item.description}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/* {(index + 1) % 5 === 0 && <MinorAdvertise />} */}
    </Fragment>
  );
};

export default UserPostCard;
