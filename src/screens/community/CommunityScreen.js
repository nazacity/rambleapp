import React, {Fragment, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {community_posts} from '../../config/data';
import MinorAdvertise from '../../components/advertise/MinorAdvertise';
import ImageModal from 'react-native-image-modal';
import {FONTS, COLORS, SIZES} from '../../constants';

import moment from 'moment';
import 'moment/locale/th';
import LocalizationContext from '../LocalizationContext';
import MenuButton from '../../components/layout/MenuButton';
import FilterButton from '../../components/layout/FilterButton';
moment.locale('th');

const CommunityScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const CommunityCard = ({item, index}) => {
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
                <ImageModal
                  resizeMode="contain"
                  imageBackgroundColor={COLORS.background}
                  overlayBackgroundColor="rgba(0,0,0,0.3)"
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 40,
                  }}
                  source={{uri: item.user.picture_url}}
                  borderRadius={40}
                />
              </View>
            </View>
            <View>
              <Text style={[FONTS.h2]}>{item.user.display_name}</Text>
              <View style={{width: 330}}>
                <Text style={[FONTS.body5]}>{item.activity.title}</Text>
              </View>
              <View style={{width: 200}}>
                <Text style={[FONTS.body4]}>
                  {moment(item.activity.activity_date).format(
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
                    <Text style={[FONTS.body4]}>
                      {t('createpost.form_team')}
                    </Text>
                  )}
                  {item.share_accomodation && (
                    <Text style={[FONTS.body4]}>
                      {t('createpost.share_accomodation')}
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

  return (
    <View
      style={{alignItems: 'center', backgroundColor: COLORS.backgroundColor}}>
      <MenuButton />
      <FilterButton onPress={() => navigation.navigate('CommunityFilter')} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={community_posts}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({item, index}) => {
          return <CommunityCard item={item} index={index} />;
        }}
        ItemSeparatorComponent={() => <View style={{padding: 10}} />}
        style={{padding: 20}}
      />
    </View>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({});
