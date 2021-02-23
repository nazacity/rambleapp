import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';
import SocialCommentModal from '../../components/social/social/SocialCommentModal';
import SocialCommentTab from '../../components/social/social/SocialCommentTab';
import SocialPostFlatlist from '../../components/social/social/SocialPostFlatlist';

const SocialCategoryScreen = ({navigation, route}) => {
  const user = useSelector((state) => state.user);
  const {picture_url, title} = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
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
      <SocialPostFlatlist picture_url={picture_url} title={title} />
      <View style={{margin: 60}} />
      <SocialCommentModal open={open} handleClose={handleClose} />
      <SocialCommentTab setOpen={setOpen} bottom={20} />
    </View>
  );
};

export default SocialCategoryScreen;
