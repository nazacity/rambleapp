import React from 'react';
// import {useSelector} from 'react-redux';

// import LocalizationContext from '../LocalizationContext';
import EditPostForm from '../../components/form/EditPostForm';
import HeaderImage from '../../components/activity/HeaderImage';
import {KeyboardAvoidingView, Platform} from 'react-native';

const CreatePostScreen = ({navigation, route}) => {
  const {item} = route.params;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <HeaderImage activity={item.activity} location={false}>
        <EditPostForm item={item} />
      </HeaderImage>
    </KeyboardAvoidingView>
  );
};

export default CreatePostScreen;
