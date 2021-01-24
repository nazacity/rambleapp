import React from 'react';
// import {useSelector} from 'react-redux';

// import LocalizationContext from '../LocalizationContext';
import CreatePostForm from '../../components/form/CreatePostForm';
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
