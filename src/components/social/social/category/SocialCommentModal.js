import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Platform,
  Image,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Input, Avatar} from 'react-native-elements';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../../../constants';
import LocalizationContext from '../../../../screens/LocalizationContext';
import ModalCloseButton from '../../../layout/ModalCloseButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {Alert} from 'react-native';
import Button from '../../../Button';
import {postSocial} from '../../../../redux/actions/request';
import {
  setLoading,
  setSnackbarDisplay,
} from '../../../../redux/actions/AppStateAction';
import ImageResizer from 'react-native-image-resizer';

const SocialCommentModal = ({
  open,
  handleClose,
  imagePicker,
  setImagePicker,
  socialId,
  data,
  setData,
}) => {
  const {t} = React.useContext(LocalizationContext);
  const [value, setValue] = useState('');
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.appState.isLoading);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (imagePicker) {
      choosePhotoFromLibrary();
      setImagePicker(false);
    }
  }, [imagePicker]);

  const takePhotoFromCamera = async () => {
    const result = await ImagePicker.openCamera({
      width: 600,
      height: 600,
      cropping: true,
    });

    setImages([
      ...images,
      {
        uri: Platform.OS === 'ios' ? result.sourceURL : result.path,
        type: result.mime,
        name: result.path.substring(result.path.lastIndexOf('/') + 1),
      },
    ]);
  };

  const choosePhotoFromLibrary = async () => {
    try {
      const result = await ImagePicker.openPicker({
        multiple: true,
        maxFiles: 3,
      });
      if (result.length > 3) {
        Alert.alert(
          t('community.socialcomment.imagenumbererror'),
          t('community.socialcomment.pleaseselectagain'),
          [
            {
              text: t('editprofile.okay'),
              onPress: () => {},
            },
          ],
        );
        return;
      } else {
        dispatch(setLoading(true));
        const convertImage = async () => {
          return Promise.all(
            result.map(async (item) => {
              const resizeItem = await ImageResizer.createResizedImage(
                Platform.OS === 'ios' ? item.sourceURL : item.path,
                900,
                900,
                'JPEG',
                100,
                0,
                undefined,
                false,
                {mode: 'contain', onlyScaleDown: false},
              );

              return {
                uri: resizeItem.uri,
                type: item.mime,
                name: resizeItem.name,
              };
            }),
          );
        };
        const data = await convertImage();
        setImages([...images, ...data]);
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error.message);
      if (error.message !== 'User cancelled image selection') {
        Alert.alert(t('community.socialcomment.selectimageerror'), '', [
          {
            text: t('editprofile.okay'),
            onPress: () => {
              const newImages = images.slice(0, 3);
              setImages(newImages);
            },
          },
        ]);
      }
      dispatch(setLoading(false));
    }
  };

  const handleReset = () => {
    setImagePicker(false);
    setValue('');
    setImages([]);
    handleClose();
  };

  useEffect(() => {
    if (images.length > 3) {
      Alert.alert(
        t('community.socialcomment.imagenumbererror'),
        t('community.socialcomment.pleaseselectagain'),
        [
          {
            text: t('editprofile.okay'),
            onPress: () => {
              const newImages = images.slice(0, 3);
              setImages(newImages);
            },
          },
        ],
      );
      return;
    }
  }, [images]);

  const onSubmit = async () => {
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append('images[]', {
        name: images[i].name,
        type: images[i].type,
        uri: images[i].uri,
      });
    }

    formData.append('text', value);
    formData.append('social_category', socialId);

    try {
      dispatch(setLoading(true));
      const res = await postSocial('/api/users/postsocialcategories', formData);

      if (res.status === 200) {
        setData([
          {
            ...res.data,
            user: {
              _id: user._id,
              display_name: user.display_name,
              user_picture_url: user.user_picture_url,
            },
          },
          ...data,
        ]);
      }
      dispatch(setLoading(false));
      dispatch(
        setSnackbarDisplay({
          state: 'success',
          message: t('community.socialcomment.postsuccessed'),
        }),
      );
      handleReset();
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  return (
    <Modal
      isVisible={open}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={handleReset}
      onBackButtonPress={handleReset}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <ModalCloseButton onPress={handleReset} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar rounded source={{uri: user.user_picture_url}} size={40} />
              <View style={{marginLeft: 10}}>
                <Text style={[FONTS.h2]}>{user.display_name}</Text>
              </View>
            </View>

            <View style={{marginBottom: 10}}>
              <Input
                placeholder={t('community.socialcomment.post')}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                }}
                onChangeText={(text) => {
                  if (text.length > 1500) {
                    Alert.alert(t('community.comment.socialcomment'), '', [
                      {
                        text: t('community.comment.okay'),
                        onPress: () => console.log('okay'),
                      },
                    ]);
                  } else {
                    setValue(text);
                  }
                }}
                value={value}
                multiline
                numberOfLines={5}
                //   containerStyle={{
                //     backgroundColor: COLORS.lightGrey,

                //   }}
                style={[FONTS.body3, {textAlignVertical: 'top'}]}
              />

              <View>
                <Text
                  style={[FONTS.body4, {textAlign: 'right', marginBottom: 10}]}>
                  {value.length} / 1500
                </Text>
                <TouchableOpacity
                  disabled={loading || value.length === 0 ? true : false}
                  style={{
                    backgroundColor:
                      loading || value.length === 0
                        ? COLORS.inputPlaceholderColor
                        : COLORS.primary,
                    paddingVertical: 5,
                    borderRadius: 2,
                    marginBottom: 10,
                    marginHorizontal: 20,
                  }}
                  onPress={onSubmit}>
                  <Text
                    style={[
                      FONTS.body4,
                      {color: COLORS.white, textAlign: 'center'},
                    ]}>
                    {t('community.socialcomment.post1')}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  borderBottomWidth: 0.5,
                  width: '100%',
                  alignSelf: 'center',
                  borderColor: 'rgba(0,0,0,0.3)',
                  marginBottom: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{width: 30, height: 30, marginRight: 5}}
                    onPress={() => {
                      takePhotoFromCamera();
                    }}>
                    <Ionicons
                      name="camera"
                      size={24}
                      color={COLORS.inputPlaceholderColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{width: 30, height: 30}}
                    onPress={() => {
                      choosePhotoFromLibrary();
                    }}>
                    <Ionicons
                      name="image-outline"
                      size={24}
                      color={COLORS.inputPlaceholderColor}
                    />
                  </TouchableOpacity>
                </View>
                <Text
                  style={[FONTS.body4, {textAlign: 'right', marginBottom: 10}]}>
                  {images.length} / 3
                </Text>
              </View>
            </View>

            {images.length === 1 && (
              <View style={{marginBottom: 5}}>
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => {
                    if (images.length === 1) {
                      setImages([]);
                    } else {
                      const newImages = images.filter(
                        (item) => item.uri !== pic.uri,
                      );

                      setImages([...newImages]);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    borderRadius: 10,
                    top: 5,
                    right: 5,
                    zIndex: 200,
                    backgroundColor: COLORS.primary,
                  }}>
                  <Ionicons
                    onPress={() => {
                      setImages([]);
                    }}
                    size={20}
                    name="close"
                    color="#fff"
                  />
                </TouchableOpacity>
                <Image
                  source={{
                    uri: images[0].uri,
                  }}
                  style={{
                    width: SIZES.width - 40,
                    height: SIZES.width - 40,
                    borderRadius: 5,
                  }}
                />
              </View>
            )}
            {images.length > 1 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  {images.map((pic, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          height: 150,
                          width: 150,
                          borderRadius: 5,
                          marginRight: index === images.length - 1 ? 0 : 10,
                        }}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            if (images.length === 1) {
                              setImages([]);
                            } else {
                              const newImages = images.filter(
                                (item) => item.uri !== pic.uri,
                              );

                              setImages([...newImages]);
                            }
                          }}
                          style={{
                            position: 'absolute',
                            borderRadius: 10,
                            top: 5,
                            right: 5,
                            zIndex: 200,
                            backgroundColor: COLORS.primary,
                          }}>
                          <Ionicons size={20} name="close" color="#fff" />
                        </TouchableOpacity>
                        <Image
                          source={{uri: pic.uri}}
                          style={{
                            height: 150,
                            width: 150,
                            borderRadius: 5,
                          }}
                        />
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SocialCommentModal;
