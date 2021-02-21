import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import LocalizationContext from '../../screens/LocalizationContext';
import {FONTS, COLORS, SIZES} from '../../constants';
import ImageModal from 'react-native-image-modal';
import {Avatar} from 'react-native-elements';

const UserPostCard = ({item, editState}) => {
  const user = useSelector((state) => state.user);
  const lang = useSelector((state) => state.appState.lang);
  dayjs.locale(lang);
  const {t} = React.useContext(LocalizationContext);
  return (
    <Fragment>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          // navigation.navigate('ActivityDetail', {
          //   activity_state: 'unregister',
          // });
        }}
        style={{
          borderRadius: 10,
          width: SIZES.width - 40,
          overflow: 'hidden',
          alignSelf: 'center',
          backgroundColor: COLORS.bluePastel,
          padding: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 70}}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 40,
                overflow: 'hidden',
                marginTop: 20,
              }}>
              <Avatar rounded source={{uri: user.user_picture_url}} size={60} />
            </View>
          </View>
          <View>
            <Text style={[FONTS.h2]}>{item.user.display_name}</Text>
            <View style={{width: 330}}>
              <Text style={[FONTS.body5]}>{item.activity.title}</Text>
            </View>
            <View style={{width: 200}}>
              <Text style={[FONTS.body4]}>
                {dayjs(item.activity.activity_date).format(
                  'วันที่ DD MMMM YYYY',
                )}
              </Text>
            </View>
            <View style={{width: 200}}>
              <Text style={[FONTS.h3]}>{t('createpost.find')}</Text>
            </View>
            <View style={{width: 220, flexDirection: 'row'}}>
              <View style={{marginLeft: 20, flex: 1}}>
                {item.form_team && (
                  <Text style={[FONTS.body4]}>{t('createpost.form_team')}</Text>
                )}
                {item.share_accommodation && (
                  <Text style={[FONTS.body4]}>
                    {t('createpost.share_accommodation')}
                  </Text>
                )}

                {item.share_transportation && (
                  <Text style={[FONTS.body4]}>
                    {t('createpost.share_transportation')}
                  </Text>
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
        </View>
      </TouchableOpacity>
      {/* {(index + 1) % 5 === 0 && <MinorAdvertise />} */}
    </Fragment>
  );
};

export default UserPostCard;
