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
} from 'react-native';
import {Input, Avatar} from 'react-native-elements';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../../constants';
import LocalizationContext from '../../../screens/LocalizationContext';
import ModalCloseButton from '../../layout/ModalCloseButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {Alert} from 'react-native';

const test = [
  {
    creationDate: '1344451932',
    cropRect: null,
    data: null,
    duration: null,
    exif: null,
    filename: 'IMG_0003.JPG',
    height: 2002,
    localIdentifier: '9F983DBA-EC35-42B8-8773-B597CF782EDD/L0/001',
    mime: 'image/jpeg',
    modificationDate: '1441224147',
    path:
      '/Users/nazacity/Library/Developer/CoreSimulator/Devices/5A377022-48E1-4970-92A3-56DDE0F03B70/data/Containers/Data/Application/37F8E6B3-A2F9-42D5-8EF3-7F981E15428A/tmp/react-native-image-crop-picker/2C5C98B7-53CE-4F18-9579-D5193A57F2E9.jpg',
    size: 2505426,
    sourceURL:
      'file:///Users/nazacity/Library/Developer/CoreSimulator/Devices/5A377022-48E1-4970-92A3-56DDE0F03B70/data/Media/DCIM/100APPLE/IMG_0003.JPG',
    width: 3000,
  },
  {
    creationDate: '1299975445',
    cropRect: null,
    data: null,
    duration: null,
    exif: null,
    filename: 'IMG_0001.JPG',
    height: 2848,
    localIdentifier: '106E99A1-4F6A-45A2-B320-B0AD4A8E8473/L0/001',
    mime: 'image/jpeg',
    modificationDate: '1441224147',
    path:
      '/Users/nazacity/Library/Developer/CoreSimulator/Devices/5A377022-48E1-4970-92A3-56DDE0F03B70/data/Containers/Data/Application/37F8E6B3-A2F9-42D5-8EF3-7F981E15428A/tmp/react-native-image-crop-picker/240D3A03-1F67-41A2-AF84-04972F86DA45.jpg',
    size: 1896240,
    sourceURL:
      'file:///Users/nazacity/Library/Developer/CoreSimulator/Devices/5A377022-48E1-4970-92A3-56DDE0F03B70/data/Media/DCIM/100APPLE/IMG_0001.JPG',
    width: 4288,
  },
  {
    creationDate: '1255122560',
    cropRect: null,
    data: null,
    duration: null,
    exif: null,
    filename: 'IMG_0002.JPG',
    height: 2848,
    localIdentifier: 'B84E8479-475C-4727-A4A4-B77AA9980897/L0/001',
    mime: 'image/jpeg',
    modificationDate: '1441224147',
    path:
      '/Users/nazacity/Library/Developer/CoreSimulator/Devices/5A377022-48E1-4970-92A3-56DDE0F03B70/data/Containers/Data/Application/37F8E6B3-A2F9-42D5-8EF3-7F981E15428A/tmp/react-native-image-crop-picker/0C7C77E8-E1DA-4B7E-9AC9-8C05DAD979D0.jpg',
    size: 2604768,
    sourceURL:
      'file:///Users/nazacity/Library/Developer/CoreSimulator/Devices/5A377022-48E1-4970-92A3-56DDE0F03B70/data/Media/DCIM/100APPLE/IMG_0002.JPG',
    width: 4288,
  },
];

const SocialCommentModal = ({
  open,
  handleClose,
  imagePicker,
  setImagePicker,
}) => {
  const {t} = React.useContext(LocalizationContext);
  const [value, setValue] = useState('');
  const user = useSelector((state) => state.user);
  const [images, setImages] = useState([]);

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
      {url: Platform.OS === 'ios' ? result.sourceURL : result.path},
    ]);
  };

  const choosePhotoFromLibrary = async () => {
    const result = await ImagePicker.openPicker({
      multiple: true,
      maxFiles: 3,
    });

    let data = [];

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
    }
    result.map((item) => {
      data.push({
        url: Platform.OS === 'ios' ? item.sourceURL : item.path,
      });
    });
    setImages([...images, ...data]);
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

  return (
    <Modal
      isVisible={open}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={handleReset}
      onBackButtonPress={handleReset}>
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

            <Text style={[FONTS.body4, {textAlign: 'right', marginBottom: 10}]}>
              {value.length} / 1500
            </Text>

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
                      (item) => item.url !== pic.url,
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
                  uri: images[0].url,
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
                              (item) => item.url !== pic.url,
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
                        }}>
                        <Ionicons size={20} name="close" color="#fff" />
                      </TouchableOpacity>
                      <Image
                        source={{uri: pic.url}}
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
    </Modal>
  );
};

export default SocialCommentModal;
