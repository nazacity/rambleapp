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
import {FONTS, SIZES, COLORS} from '../../constants';

import ImagePicker from 'react-native-image-crop-picker';
import {
  setUploadPictureModal,
  setLoading,
} from '../../redux/actions/AppStateAction';
import {useSelector, useDispatch} from 'react-redux';
import S3 from '../../services/uploadpicture';
import fs from 'react-native-fs';
import {decode} from 'base64-arraybuffer';
import {v4 as uuidv4} from 'uuid';
import 'react-native-get-random-values';

const storage_config = {
  digitalOceanSpaces: 'https://ramble.nyc3.digitaloceanspaces.com/',
  bucket_name: 'ramble',
};

const UploadPictureModal = ({setImage}) => {
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  const uploadPictureModal = useSelector(
    (state) => state.appState.uploadPictureModal,
  );

  const handleClose = () => {
    dispatch(setUploadPictureModal(false));
  };

  const handleUploadImage = async (result) => {
    dispatch(setLoading(true));
    if (result) {
      const blob = result;
      const name = uuidv4();
      const fPath = blob.path;
      const base64 = await fs.readFile(fPath, 'base64');
      const arrayBuffer = decode(base64);
      const params = {
        Body: arrayBuffer,
        Bucket: `${storage_config.bucket_name}`,
        Key: `user_picture/${name}`,
      };

      S3.putObject(params)
        .on('build', (request) => {
          request.httpRequest.headers.Host = `${storage_config.digitalOceanSpaces}`;
          request.httpRequest.headers['Content-Length'] = blob.size;
          request.httpRequest.headers['Content-Type'] = blob.mime;
          request.httpRequest.headers['x-amz-acl'] = 'public-read-write';
        })
        .send((err) => {
          if (err) {
            console.log(err);
            dispatch(setLoading(false));
          } else {
            const imageUrl =
              `${storage_config.digitalOceanSpaces}user_picture/` + name;
            setImage(imageUrl, name);
            dispatch(setLoading(false));
            handleClose();
          }
        });
    }
  };
  const takePhotoFromCamera = async () => {
    const result = await ImagePicker.openCamera({
      width: 600,
      height: 600,
      cropping: true,
    });

    handleUploadImage(result);
  };

  const choosePhotoFromLibrary = async () => {
    const result = await ImagePicker.openPicker({
      width: 600,
      height: 600,
      cropping: true,
    });

    handleUploadImage(result);
  };

  return (
    <Modal
      isVisible={uploadPictureModal}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={handleClose}>
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
