import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Text,
} from 'react-native';
// import {useSelector} from 'react-redux';

import {FONTS, COLORS, SIZES} from '../../constants';
// import LocalizationContext from '../LocalizationContext';
import CreatePostForm from '../../components/form/CreatePostForm';
import {HeaderBackButton} from '@react-navigation/stack';
import HeaderImage from '../../components/activity/HeaderImage';

const CreatePostScreen = ({navigation, route}) => {
  const {activity, userActivityId} = route.params;

  return (
    <HeaderImage activity={activity} location={false}>
      <CreatePostForm
        activityId={activity._id}
        userActivityId={userActivityId}
      />
    </HeaderImage>
  );
};

export default CreatePostScreen;
