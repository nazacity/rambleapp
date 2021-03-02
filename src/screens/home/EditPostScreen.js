import React from 'react';
// import {useSelector} from 'react-redux';

// import LocalizationContext from '../LocalizationContext';
import EditPostForm from '../../components/form/EditPostForm';
import HeaderImage from '../../components/activity/HeaderImage';

const CreatePostScreen = ({navigation, route}) => {
  const {item} = route.params;

  return (
    <HeaderImage activity={item.activity} location={false}>
      <EditPostForm item={item} />
    </HeaderImage>
  );
};

export default CreatePostScreen;
