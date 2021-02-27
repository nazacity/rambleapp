import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';
import SocialCommentModal from '../../components/social/social/SocialCommentModal';
import SocialCommentTab from '../../components/social/social/SocialCommentTab';
import SocialPostFlatlist from '../../components/social/social/SocialPostFlatlist';
import {getSocial, postSocial} from '../../redux/actions/request';

const SocialCategoryScreen = ({navigation, route}) => {
  const user = useSelector((state) => state.user);
  const {picture_url, title, socialId} = route.params;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [postsId, setPostsId] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await getSocial(`/api/users/getsocialcategory/${socialId}`);
      if (res.status === 200) {
        setPostsId(res.data.social_posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts2 = async () => {
    setLoading(true);
    if ((page + 1) * 10 > postsId.length) {
      setNoMore(true);
    } else {
      setPage(page + 1);
    }
    if (!noMore) {
      const ids = postsId.slice(page * 10, (page + 1) * 10);

      try {
        const res = await postSocial('/api/users/getposts', ids);

        if (res.status === 200) {
          setData([...data, ...res.data]);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postsId.length > 0) {
      fetchPosts2();
    } else {
      setLoading(false);
    }
  }, [postsId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPosts();
    });
    return unsubscribe;
  }, []);

  return (
    <View style={{flex: 1}}>
      <SocialPostFlatlist
        picture_url={picture_url}
        title={title}
        postsId={postsId}
        loading={loading}
        data={data}
        fetchPosts={fetchPosts}
      />
      <View style={{margin: 60}} />
      <SocialCommentModal
        open={open}
        handleClose={handleClose}
        setImagePicker={setImagePicker}
        imagePicker={imagePicker}
        socialId={socialId}
        type="social_category"
        fetchPosts={fetchPosts}
        data={data}
        setData={setData}
      />
      <SocialCommentTab
        setOpen={setOpen}
        bottom={20}
        setImagePicker={setImagePicker}
      />
    </View>
  );
};

export default SocialCategoryScreen;
