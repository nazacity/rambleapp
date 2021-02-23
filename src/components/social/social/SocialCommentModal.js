import React, {useState} from 'react';
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

const SocialCommentModal = ({open, handleClose}) => {
  const {t} = React.useContext(LocalizationContext);
  const [value, setValue] = useState('');
  const user = useSelector((state) => state.user);
  const [images, setImages] = useState([]);

  const choosePhotoFromLibrary = async () => {
    const result = await ImagePicker.openPicker({
      multiple: true,
      maxFiles: 3,
    });

    let data = [];
    result.map((item) => {
      data.push({
        url: Platform.OS === 'ios' ? item.sourceURL : item.path,
      });
    });
    setImages(data);
  };

  const handleReset = () => {
    setValue('');
    setImages([]);
    handleClose();
  };

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
          <View style={{marginBottom: 20}}>
            <Input
              placeholder={t('community.socialcomment.post')}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              onChangeText={(text) => {
                setValue(text);
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
          </View>
          {images.length === 1 && (
            <View style={{marginBottom: 5}}>
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
                    <Image
                      key={index}
                      source={{uri: pic.url}}
                      style={{
                        height: 150,
                        width: 150,
                        borderRadius: 5,
                        marginRight: index === images.length - 1 ? 0 : 10,
                      }}
                    />
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
