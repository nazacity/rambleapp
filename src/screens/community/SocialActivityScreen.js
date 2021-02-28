import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';
import SocialCommentModal from '../../components/social/social/activity/SocialCommentModal';
import SocialCommentTab from '../../components/social/social/activity/SocialCommentTab';
import SocialPostFlatlist from '../../components/social/social/activity/SocialPostFlatlist';
import {getSocial, postSocial} from '../../redux/actions/request';
import {COLORS} from '../../constants';

const SocialActivityScreen = ({navigation, route}) => {
  const user = useSelector((state) => state.user);
  const {activity} = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [postsId, setPostsId] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [noMore, setNoMore] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await getSocial(
        `/api/users/getsocialactivity/${activity._id}`,
      );
      if (res.status === 200) {
        setPostsId(res.data.activity_posts);
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
      const res = await getSocial(
        `/api/users/getsocialactivity/${activity._id}`,
      );

      if (res.status === 200) {
        setPostsId(res.data.activity_posts);

        setNoMore(false);

        const ids = res.data.activity_posts.slice(0, 10);
        setLoading(true);
        try {
          const res1 = await postSocial(
            '/api/users/getsocialactivityposts',
            ids,
          );
          if (res1.status === 200) {
            setData(res1.data);
          }
          setPage(1);
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
          const res = await postSocial(
            '/api/users/getsocialactivityposts',
            ids,
          );

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
          const res = await postSocial(
            '/api/users/getsocialactivityposts',
            ids,
          );

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
        picture_url={activity.activity_picture_url}
        title={activity.title}
        postsId={postsId}
        loading={loading}
        data={data}
        fetchPosts2={fetchPosts2}
        fetchPosts3={fetchPosts3}
        reset={reset}
      />
      <SocialCommentModal
        open={open}
        handleClose={handleClose}
        setImagePicker={setImagePicker}
        imagePicker={imagePicker}
        socialId={activity._id}
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

export default SocialActivityScreen;
