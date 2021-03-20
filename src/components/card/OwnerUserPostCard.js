import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import LocalizationContext from '../../screens/LocalizationContext';
import {FONTS, COLORS, SIZES, SHADOW} from '../../constants';
import {Avatar} from 'react-native-elements';
import profile from '../../../assets/profile/profile.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {post} from '../../redux/actions/request';
import {changeUserPostState} from '../../redux/actions/UserAction';

const OwnerUserPostCard = ({item, editState}) => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
                    source={{uri: item.activity.activity_picture_url}}
                    size={60}
                  />
                </View>
                <View>
                  <Text style={[FONTS.h2]}>{item.activity.title}</Text>
                  <View style={{width: 200}}>
                    <Text style={[FONTS.body4]}>
                      {t('createpost.actualdate') + ' '}
                      {dayjs(item.activity.actual_date).format('D MMMM YYYY')}
                    </Text>
                  </View>
                  <View style={{width: 200}}>
                    <Text style={[FONTS.body4]}>
                      {t('createpost.postdate') + ' '}
                      {dayjs(item.createdAt).format('D MMMM YYYY')}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 5,
                  }}
                  onPress={() => {
                    navigation.navigate('EditPost', {
                      item: item,
                    });
                  }}>
                  <MaterialIcons name="edit" color={COLORS.primary} size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 5,
                  }}
                  onPress={async () => {
                    if (item.state === 'finding') {
                      dispatch(
                        changeUserPostState(item._id, {state: 'closed'}, t),
                      );
                    }

                    if (item.state === 'closed') {
                      dispatch(
                        changeUserPostState(item._id, {state: 'finding'}, t),
                      );
                    }
                  }}>
                  {item.state === 'finding' && (
                    <MaterialCommunityIcons
                      name="eye-off"
                      color={COLORS.primary}
                      size={20}
                    />
                  )}
                  {item.state === 'closed' && (
                    <MaterialCommunityIcons
                      name="eye-check-outline"
                      color={COLORS.primary}
                      size={20}
                    />
                  )}
                </TouchableOpacity>
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

export default OwnerUserPostCard;
