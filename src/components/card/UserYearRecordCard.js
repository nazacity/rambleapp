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

const UserYearRecordCard = ({item}) => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();

  return (
    <View
      style={[
        {
          backgroundColor: COLORS.white,
          marginBottom: 10,
          borderRadius: 15,
          width: SIZES.width - 40,
        },
        SHADOW.default,
      ]}>
      <View style={{paddingTop: 20, paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={[
              {
                marginHorizontal: 10,
                padding: 10,
                backgroundColor: COLORS.backgroundColor,
                borderRadius: 5,
              },
              SHADOW.default,
            ]}>
            <Text style={[FONTS.h3]}>ปี {item.year}</Text>
          </View>
          <View
            style={[
              {
                marginHorizontal: 10,
                padding: 10,
                backgroundColor: COLORS.backgroundColor,
                borderRadius: 5,
              },
              SHADOW.default,
            ]}>
            <Text style={[FONTS.body4]}>
              กิจกรรม {item.activity_number} งาน
            </Text>
          </View>
          <View
            style={[
              {
                marginHorizontal: 10,
                padding: 10,
                backgroundColor: COLORS.backgroundColor,
                borderRadius: 5,
              },
              SHADOW.default,
            ]}>
            <Text style={[FONTS.body4]}>ระยะทาง {item.distance} กม</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: 'rgba(0,0,0,0.2)',
            marginTop: 20,
          }}
        />
      </View>
      <View>
        {item.user_activities.length === 0 ? (
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
              ...item.user_activities,
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
            ItemSeparatorComponent={() => <View style={{margin: 5}} />}
            style={{padding: 20}}
          />
        )}
      </View>
    </View>
  );
};

export default UserYearRecordCard;
