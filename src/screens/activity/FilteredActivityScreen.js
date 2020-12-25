import React, {Fragment, useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import MinorAdvertise from '../../components/advertise/MinorAdvertise';

import {FONTS, COLORS, SIZES} from '../../constants';
import FilterButton from '../../components/layout/FilterButton';
import {get} from '../../redux/actions/request';
import {useSelector, useDispatch} from 'react-redux';
import {setFilActivities} from '../../redux/actions/ActivityAction';
import {setLoading} from '../../redux/actions/AppStateAction';
import LocalizationContext from '../LocalizationContext';
import Button from '../../components/Button';
import moment from 'moment';
import 'moment/locale/th';
import ActivityCard from '../../components/activity/ActivityCard';
import BackButton from '../../components/layout/BackButton';

const FilteredActivityScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const activities = useSelector((state) => state.activity.filtered_activities);
  const isLoading = useSelector((state) => state.appState.isLoading);
  const lang = useSelector((state) => state.appState.lang);
  moment.locale(lang);

  const ActivityCardDetail = ({item, index}) => {
    return (
      <Fragment>
        <ActivityCard
          item={{activity: {id: item}}}
          onPress={() => {
            navigation.navigate('ActivityDetail', {
              activityId: item._id,
            });
          }}>
          <View style={{position: 'absolute', bottom: 20, left: 20}}>
            <Text style={[FONTS.h4, {color: '#fff'}]}>{item.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={[FONTS.h5, {color: '#fff', marginRight: 10}]}>
                {item.location.place_name}
              </Text>
              <Text style={[FONTS.h5, {color: '#fff'}]}>
                {item.location.province}
              </Text>
            </View>
            <Text style={[FONTS.h1, {color: '#fff'}]}>
              {moment(item.actual_date).format('DD MMMM YY')}
            </Text>
          </View>
        </ActivityCard>
        {/* {(index + 1) % 5 === 0 && <MinorAdvertise />} */}
      </Fragment>
    );
  };

  if (activities.length === 0 && !isLoading) {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: COLORS.backgroundColor,
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text style={[FONTS.h2]}>{t('activityfilter.noactivity')}</Text>
        <Button
          label={t('activityfilter.clickhere')}
          color={COLORS.pinkPastel}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: COLORS.backgroundColor,
        flex: 1,
      }}>
      <BackButton backTo={'Activity'} />
      <FilterButton onPress={() => navigation.navigate('ActivityFilter')} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={activities}
        keyExtractor={(item) => `${item._id}`}
        renderItem={({item, index}) => {
          return <ActivityCardDetail item={item} index={index} />;
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{borderBottomColor: COLORS.primary, borderBottomWidth: 2}}
          />
        )}
      />
    </View>
  );
};

export default FilteredActivityScreen;

const styles = StyleSheet.create({});
