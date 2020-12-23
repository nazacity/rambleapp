import React, {Fragment, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {activities} from '../../config/data';
import MinorAdvertise from '../../components/advertise/MinorAdvertise';

import {FONTS, COLORS} from '../../constants';

const ActivityScreen = ({navigation}) => {
  const ActivityCard = ({item, index}) => {
    return (
      <Fragment>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('ActivityDetail', {
              activity_state: 'unregister',
            });
          }}
          style={{
            width: 300,
            height: 200,
            borderRadius: 10,
            overflow: 'hidden',
            alignSelf: 'center',
          }}>
          <Image
            source={{uri: item.activity_picture_url}}
            style={{width: 300, height: 200, borderRadius: 5}}
          />
        </TouchableOpacity>
        {(index + 1) % 5 === 0 && <MinorAdvertise />}
      </Fragment>
    );
  };

  return (
    <View style={{alignItems: 'center', backgroundColor: COLORS.background}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={activities}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({item, index}) => {
          return <ActivityCard item={item} index={index} />;
        }}
        ItemSeparatorComponent={() => <View style={{padding: 10}} />}
        style={{padding: 20}}
      />
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({});
