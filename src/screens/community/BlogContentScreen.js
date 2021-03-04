import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {WebView} from 'react-native-webview';
import LoveButton from '../../components/blog/layout/LoveButton';
import CommentModal from '../../components/blog/mainslides/CommentModal';
import CommentTab from '../../components/blog/mainslides/CommentTab';
import BackButton from '../../components/layout/BackButton';
import {COLORS, SIZES} from '../../constants';
import {getSocial} from '../../redux/actions/request';

const BlogContentScreen = ({navigation, route}) => {
  const {item} = route.params;
  const [data, setData] = useState({
    blog_comments: [],
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleLike = async () => {
    try {
      const res = await getSocial(`/api/users/likeblog/${item._id}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnlike = async () => {
    try {
      const res = await getSocial(`/api/users/unlikeblog/${item._id}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlog = async () => {
    try {
      const res = await getSocial(`/api/users/getblog/${item._id}`);

      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchBlog();
    });

    return unsubscribe;
  }, []);

  return (
    <View
      style={{backgroundColor: COLORS.white, flex: 1}}
      showsVerticalScrollIndicator={false}>
      <BackButton />
      <LoveButton
        top={40}
        size={30}
        likers={item.likers}
        handleLike={handleLike}
        handleUnlike={handleUnlike}
      />
      <WebView
        source={{uri: item.url}}
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
      <CommentTab
        setOpen={setOpen}
        bottom={20}
        id={data._id}
        setData={setData}
      />
      <CommentModal
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
      />
    </View>
  );
};

export default BlogContentScreen;
