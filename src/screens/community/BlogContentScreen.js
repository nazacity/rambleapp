import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {WebView} from 'react-native-webview';
import LoveButton from '../../components/blog/layout/LoveButton';
import CommentModal from '../../components/blog/mainslides/CommentModal';
import CommentTab from '../../components/blog/mainslides/CommentTab';
import BackButton from '../../components/layout/BackButton';
import {COLORS} from '../../constants';

const BlogContentScreen = ({navigation, route}) => {
  const {uri} = route.params;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <BackButton />
      <LoveButton top={40} size={30} />
      <WebView
        source={{uri: uri}}
        showsVerticalScrollIndicator={false}
        startInLoadingState={true}
        renderLoading={() => (
          <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={{
              color: '#FFF',
            }}
            color={COLORS.primary}
          />
        )}
      />
      <CommentTab setOpen={setOpen} />
      <CommentModal open={open} handleClose={handleClose} />
    </View>
  );
};

export default BlogContentScreen;
