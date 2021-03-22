import React from 'react';
import CreatePostForm from '../../components/form/CreatePostForm';
import HeaderImage from '../../components/activity/HeaderImage';
import {KeyboardAvoidingView, Platform} from 'react-native';

const CreatePostScreen = ({navigation, route}) => {
  const {activity, userActivityId} = route.params;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <HeaderImage activity={activity} location={false}>
        <CreatePostForm
          activityId={activity._id}
          userActivityId={userActivityId}
        />
      </HeaderImage>
    </KeyboardAvoidingView>
  );
};

export default CreatePostScreen;
