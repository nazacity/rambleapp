import React, {useState, useEffect, Fragment} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useSelector} from 'react-redux';

import {FONTS, COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const UpcomingActivityScreen = () => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const activities = useSelector((state) => state.activity.upcoming_activities);

  const UpcomingActivityCard = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('ActivityUpcoming', {
            activityId: item.activity.id._id,
          });
        }}
        style={{
          width: 150,
          height: 150,
          marginRight: index % 2 === 1 ? 0 : 20,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: 'black',
        }}>
        <Image
          source={{uri: item.activity.id.activity_picture_url}}
          style={{width: 150, height: 150, borderRadius: 5}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Fragment>
      {activities.length === 0 ? (
        <View
          style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
          <Text>ยังไม่มีกิจกรรม</Text>
        </View>
      ) : (
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={activities}
          keyExtractor={(item) => `${item._id}`}
          renderItem={({item, index}) => {
            return <UpcomingActivityCard item={item} index={index} />;
          }}
          ItemSeparatorComponent={() => <View style={{padding: 10}} />}
          style={{padding: 20}}
          columnWrapperStyle={{justifyContent: 'center'}}
          ListFooterComponent={<View style={{marginBottom: 40}} />}
        />
      )}
    </Fragment>
  );
};

export default UpcomingActivityScreen;

const styles = StyleSheet.create({});
