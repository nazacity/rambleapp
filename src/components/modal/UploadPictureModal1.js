import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';

import Modal from 'react-native-modal';
import {FONTS, COLORS} from '../../constants';

import ImagePicker from 'react-native-image-crop-picker';
import {
  setUploadPictureModal,
  setLoading,
  setSnackbarDisplay,
} from '../../redux/actions/AppStateAction';
import {useSelector, useDispatch} from 'react-redux';
import {uploadSecretKey} from '../../services/uploadpicture';
// import fs from 'react-native-fs';
// import {decode} from 'base64-arraybuffer';
// import {v4 as uuidv4} from 'uuid';
import 'react-native-get-random-values';
import {everyPost, post} from '../../redux/actions/request';
import {refresh} from '../../redux/actions/UserAction';
import {Platform} from 'react-native';

const storage_config = {
  digitalOceanSpaces: 'https://ramble.nyc3.digitaloceanspaces.com/',
  bucket_name: 'ramble',
};

const UploadPictureModal = ({
  takePhotoFromCamera,
  choosePhotoFromLibrary,
  open,
  handleClose,
}) => {
  const {t} = React.useContext(LocalizationContext);

  return (
    <Modal
      isVisible={open}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      avoidKeyboard
      onSwipeComplete={handleClose}
      useNativeDriverForBackdrop
      swipeDirection={['down']}>
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          padding: 20,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={[
              {
                fontSize: 17,
                fontWeight: 'bold',
                color: 'white',
              },
              FONTS.h4,
            ]}>
            {t('uploadpicture.uploadPhoto')}
          </Text>
          <Text
            style={[
              {
                fontSize: 17,
                fontWeight: 'bold',
                color: 'white',
              },
              FONTS.h4,
            ]}>
            {t('uploadpicture.choosePhoto')}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            padding: 13,
            borderRadius: 10,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            marginVertical: 7,
          }}
          onPress={takePhotoFromCamera}
          activeOpacity={0.8}>
          <Text
            style={[
              {
                fontSize: 17,
                fontWeight: 'bold',
                color: 'white',
              },
              FONTS.h4,
            ]}>
            {t('uploadpicture.takePhoto')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 13,
            borderRadius: 10,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            marginVertical: 7,
          }}
          onPress={choosePhotoFromLibrary}
          activeOpacity={0.8}>
          <Text
            style={[
              {
                fontSize: 17,
                fontWeight: 'bold',
                color: 'white',
              },
              FONTS.h4,
            ]}>
            {t('uploadpicture.chooseLibrary')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 13,
            borderRadius: 10,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            marginVertical: 7,
          }}
          onPress={handleClose}
          activeOpacity={0.8}>
          <Text
            style={[
              {
                fontSize: 17,
                fontWeight: 'bold',
                color: 'white',
              },
              FONTS.h4,
            ]}>
            {t('uploadpicture.cancel')}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default UploadPictureModal;
