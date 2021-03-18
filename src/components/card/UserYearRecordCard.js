import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';
import {Title, Caption, Text} from 'react-native-paper';
import {Avatar, Icon} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

import {SIZES, FONTS, COLORS, SHADOW} from '../../constants';
import Distance from './recordcard/Distance1';
import {useNavigation} from '@react-navigation/native';

// import Average from './recordcard/Average';
// import Time from './recordcard/Time';

const UserYearRecordCard = ({data}) => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();

  return (
    <View
      style={[
        {
          backgroundColor: COLORS.white,
          borderRadius: 10,
          width: SIZES.width - 40,
        },
        SHADOW.default,
      ]}>
      <View style={{paddingTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 5,
          }}>
          <View
            style={[
              {
                marginHorizontal: 5,
                padding: 10,
                backgroundColor: COLORS.backgroundColor,
                borderRadius: 5,
                height: '100%',
                flex: 1,
                alignItems: 'center',
              },
              SHADOW.default,
            ]}>
            <Caption style={[FONTS.h4]}> {t('userrecord.year')}</Caption>
            <Text style={[FONTS.h3]}>{data.year}</Text>
          </View>
          <View
            style={[
              {
                marginHorizontal: 5,
                padding: 10,
                backgroundColor: COLORS.backgroundColor,
                borderRadius: 5,
                alignItems: 'center',
                flex: 1,
              },
              SHADOW.default,
            ]}>
            <Caption style={[FONTS.h4]}> {t('userrecord.activity')}</Caption>
            <Text style={[FONTS.h3]}> {data.activity_number}</Text>
            <Caption style={[FONTS.h4]}> {t('userrecord.work')}</Caption>
          </View>
          <View
            style={[
              {
                marginHorizontal: 5,
                padding: 10,
                backgroundColor: COLORS.backgroundColor,
                borderRadius: 5,
                alignItems: 'center',
                flex: 1,
              },
              SHADOW.default,
            ]}>
            <Caption style={[FONTS.h4]}>{t('userrecord.distance')}</Caption>
            <Text style={[FONTS.h3]}>{data.distance}</Text>
            <Caption style={[FONTS.h4]}>{t('userrecord.km')}</Caption>
          </View>
        </View>
      </View>
      <View>
        {data.user_activities.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
              margin: 20,
            }}>
            <Text style={[FONTS.h2, {color: COLORS.primary}]}>
              {t('history.noactivity')}
            </Text>
          </View>
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[
              ...data.user_activities,
              // ...item.user_activities,
              // ...item.user_activities,
            ]}
            keyExtractor={(item, index) => `${item._id} ${index}`}
            renderItem={({item, index}) => {
              return (
                <View
                  style={[
                    {
                      width: 100,
                      height: 100,
                      borderRadius: 100,
                      backgroundColor: COLORS.white,
                      marginRight:
                        index === data.user_activities.length - 1 ? 0 : 10,
                    },
                    SHADOW.image,
                  ]}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={[
                      {
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        overflow: 'hidden',
                      },
                      SHADOW.image,
                    ]}
                    onPress={() => {
                      navigation.navigate('ActivityHistory', {
                        userActivity: item,
                      });
                    }}>
                    <ImageBackground
                      source={{uri: item.activity.id.activity_picture_url}}
                      style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'cover',
                        borderRadius: 100,
                        overflow: 'hidden',
                      }}></ImageBackground>
                  </TouchableOpacity>
                </View>
              );
            }}
            contentContainerStyle={{padding: 10}}
          />
        )}
      </View>
    </View>
  );
};

export default UserYearRecordCard;
