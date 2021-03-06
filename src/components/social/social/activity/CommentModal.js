import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Platform,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';

import {COLORS, FONTS, SIZES} from '../../../../constants';
import LocalizationContext from '../../../../screens/LocalizationContext';
import CommentTab from './CommentTab2';
import ModalCloseButton from '../../../layout/ModalCloseButton';
import CommentCard from './CommentCard';
import {Avatar} from 'react-native-elements';
import {checkTimeFromPast} from '../../../../services/util';
import ImageModal from 'react-native-image-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getSocial, postSocial} from '../../../../redux/actions/request';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../../../redux/actions/AppStateAction';
import {Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const CommentModal = ({open, handleClose, item}) => {
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    _id: '',
    createdAt: '',
    likeCount: 0,
    likers: [],
    pictures: [],
    activity: '',
    activity_post_comments: [],
    state: '',
    text: '',
    updatedAt: '',
    user: {
      _id: '',
      display_name: '',
      user_picture_url: '',
    },
  });
  const [snackbarDisplay, setSnackbarDisplay] = useState(false);

  const fetchPost = async () => {
    try {
      // dispatch(setLoading(true));
      const res = await getSocial(
        `/api/users/getsocialactivitypost/${item._id}`,
      );
      if (res.status === 200) {
        setData(res.data);
      }
      // dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      // dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const onSubmit = async (value, setValue) => {
    try {
      dispatch(setLoading(true));
      const res = await postSocial(
        `/api/users/commentsocialactivitypost/${item._id}`,
        {
          text: value,
        },
      );
      if (res.status === 200) {
        setData(res.data);
        setSnackbarDisplay(true);
      }
      setValue('');
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  return (
    <Modal
      isVisible={open}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      avoidKeyboard>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <ModalCloseButton onPress={handleClose} />
        <FlatList
          ListHeaderComponent={
            <View
              style={[
                {
                  backgroundColor: COLORS.white,
                  padding: 10,
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Avatar
                    rounded
                    source={{uri: item.user.user_picture_url}}
                    size={40}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text style={[FONTS.h2]}>{item.user.display_name}</Text>
                  </View>
                </View>

                <View>
                  <Text style={[FONTS.body3]}>
                    {checkTimeFromPast(item.createdAt)}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={[FONTS.body3]}>{item.text}</Text>
              </View>
              <View style={{marginTop: 10}}>
                {item.pictures.length === 1 && (
                  <ImageModal
                    resizeMode="contain"
                    imageBackgroundColor={COLORS.background}
                    overlayBackgroundColor="rgba(0,0,0,0.3)"
                    style={{
                      height: 300,
                      width: SIZES.width - 40,
                      borderRadius: 5,
                    }}
                    borderRadius={10}
                    source={{
                      uri: item.pictures[0].picture_url,
                    }}
                  />
                )}
                {item.pictures.length > 1 && (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View
                      style={{flexDirection: 'row', justifyContent: 'center'}}>
                      {item.pictures.map((pic, index) => {
                        return (
                          <View
                            key={pic._id}
                            style={{
                              height: 150,
                              width: 150,
                              borderRadius: 10,
                              marginRight:
                                index === item.pictures.length - 1 ? 0 : 10,
                            }}>
                            <ImageModal
                              resizeMode="contain"
                              imageBackgroundColor={COLORS.background}
                              overlayBackgroundColor="rgba(0,0,0,0.3)"
                              style={{
                                height: 150,
                                width: 150,
                                borderRadius: 10,
                              }}
                              borderRadius={10}
                              source={{
                                uri: pic.picture_url,
                              }}
                            />
                          </View>
                        );
                      })}
                    </View>
                  </ScrollView>
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <LoveButton
                    id={item._id}
                    likers={item.likers}
                    handleLike={handleLike}
                    handleUnlike={handleUnlike}
                  />
                  <Text style={[FONTS.body3, {marginLeft: 5}]}>11</Text> */}
                </View>
                <View
                  style={{
                    marginRight: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View activeOpacity={0.8} style={{marginRight: 10}}>
                    <FontAwesome
                      name="comment-o"
                      size={20}
                      color={COLORS.opcaityBlack}
                    />
                  </View>
                  <View activeOpacity={0.8} style={{flexDirection: 'row'}}>
                    <Text style={[FONTS.body3, {marginRight: 5}]}>
                      {data.activity_post_comments.length}
                    </Text>
                    <Text style={[FONTS.body3]}>
                      {t('community.socialcomment.comments')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          }
          showsVerticalScrollIndicator={false}
          data={data.activity_post_comments}
          style={{marginTop: 40}}
          contentContainerStyle={{padding: 10}}
          keyExtractor={(item) => item._id}
          renderItem={({item, index}) => {
            return <CommentCard item={item} index={index} />;
          }}
          ListFooterComponent={<View style={{margin: 60}} />}
        />
      </SafeAreaView>
      <CommentTab
        bottom={Platform.OS === 'ios' ? 40 : 20}
        onSubmit={onSubmit}
      />
      <Snackbar
        visible={snackbarDisplay}
        onDismiss={() => {
          setSnackbarDisplay(false);
        }}
        style={{
          backgroundColor: '#5cb85c',
        }}
        duration={1500}>
        {t('community.socialcomment.commentsuccessed')}
      </Snackbar>
    </Modal>
  );
};

export default CommentModal;
