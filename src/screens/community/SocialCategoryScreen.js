import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';
import HeaderImage from '../../components/social/social/HeaderImage';

const SocialCategoryScreen = ({navigation, route}) => {
  const user = useSelector((state) => state.user);
  const {picture_url, title} = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (userActivity.state === 'history') {
    //   navigation.replace('ActivityHistory', {
    //     userActivity: userActivity,
    //   });
    // }
    // const unsubscribe = navigation.addListener('focus', () => {
    //   dispatch(getActivityById(activityId, setLoading, checkUserActivities));
    // });
    // return unsubscribe;
  }, [user]);

  if (loading) {
    return (
      <Spinner
        visible={true}
        textContent={'Loading...'}
        textStyle={{
          color: '#FFF',
        }}
        color={COLORS.pinkPastel}
      />
    );
  }

  return (
    <View style={{flex: 1}}>
      <HeaderImage picture_url={picture_url} title={title}>
        <View style={{height: 1000}}></View>
      </HeaderImage>
    </View>
  );
};

export default SocialCategoryScreen;

const styles = StyleSheet.create({});
