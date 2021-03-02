import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';
import SocialCommentModal from '../../components/social/social/category/SocialCommentModal';
import SocialCommentTab from '../../components/social/social/category/SocialCommentTab';
import SocialPostFlatlist from '../../components/social/social/category/SocialPostFlatlist';
import {getSocial, postSocial} from '../../redux/actions/request';
import {COLORS} from '../../constants';

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
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await getSocial(`/api/users/getsocialcategory/${socialId}`);
      if (res.status === 200) {
        setPostsId(res.data.social_posts);
        setPage(0);
        setNoMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reset = () => {
    setNoMore(false);
    setData([]);
    setPage(1);
  };

  const fetchPosts3 = async () => {
    try {
      const res = await getSocial(`/api/users/getsocialcategory/${socialId}`);

      if (res.status === 200) {
        setPostsId(res.data.social_posts);

        const ids = res.data.social_posts.slice(0, 10);
        setLoading(true);
        try {
          const res1 = await postSocial('/api/users/getposts', ids);
          if (res1.status === 200) {
            setData(res1.data);
          }

          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchPosts2 = async () => {
    setLoading(true);
    if ((page + 1) * 10 > postsId.length) {
      setNoMore(true);
      if (!noMore && !loading) {
        const ids = postsId.slice(page * 10, postsId.length);
        try {
          const res = await postSocial('/api/users/getposts', ids);

          if (res.status === 200) {
            setData([...data, ...res.data]);
          }
          setPage(page + 1);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
      setLoading(false);
    } else {
      if (!noMore && !loading) {
        const ids = postsId.slice(page * 10, (page + 1) * 10);

        try {
          const res = await postSocial('/api/users/getposts', ids);

          if (res.status === 200) {
            setData([...data, ...res.data]);
          }
          setPage(page + 1);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
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
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <SocialPostFlatlist
        picture_url={picture_url}
        title={title}
        postsId={postsId}
        loading={loading}
        data={data}
        fetchPosts2={fetchPosts2}
        fetchPosts3={fetchPosts3}
        reset={reset}
      />
      <View style={{margin: 60}} />
      <SocialCommentModal
        open={open}
        handleClose={handleClose}
        setImagePicker={setImagePicker}
        imagePicker={imagePicker}
        socialId={socialId}
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
