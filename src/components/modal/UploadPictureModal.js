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
import 'react-native-get-random-values';
import {everyPost, post} from '../../redux/actions/request';
import {refresh} from '../../redux/actions/UserAction';
import {Platform} from 'react-native';

const storage_config = {
  digitalOceanSpaces: 'https://ramble.nyc3.digitaloceanspaces.com/',
  bucket_name: 'ramble',
};

const UploadPictureModal = ({setImage, upload, delFile}) => {
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  const uploadPictureModal = useSelector(
    (state) => state.appState.uploadPictureModal,
  );

  const handleClose = () => {
    dispatch(setUploadPictureModal(false));
  };

  const handleUploadImage = async (result) => {
    if (result) {
      const photo = {
        uri:
          Platform.OS === 'android'
            ? result.path
            : result.path.replace('file://', ''),
        type: result.mime,
        name: result.path.substring(result.path.lastIndexOf('/') + 1),
      };

      const formData = new FormData();
      formData.append('upload', photo);

      try {
        dispatch(setLoading(true));
        const res = await everyPost('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            secretKey: `Bearer ${uploadSecretKey}`,
          },
        });

        if (res.data === 'File uploaded successfully') {
          const imageUrl =
            `${storage_config.digitalOceanSpaces}user_profile/` + photo.name;
          if (setImage) {
            setImage(imageUrl);
            dispatch(setLoading(false));
            handleClose();
          } else if (upload === 'uploadUserPictureProfile') {
            const res = await post('/api/users/edituser', {
              type: 'editUserPictureProfile',
              user_picture_url: imageUrl,
            });

            if (res.status === 200) {
              dispatch(refresh());
              dispatch(
                setSnackbarDisplay({
                  state: 'success',
                  message: t('editprofile.imageuploadsuccessed'),
                }),
              );
            }
            if (delFile) {
              if (
                delFile.includes('https://ramble.nyc3.digitaloceanspaces.com/')
              ) {
                const shouldDeleteFile = delFile.replace(
                  'https://ramble.nyc3.digitaloceanspaces.com/',
                  '',
                );

                const res1 = await post('/api/users/deleteimage', {
                  fileName: shouldDeleteFile,
                });
              }
            }
            dispatch(setLoading(false));
            handleClose();
          } else if (upload === 'uploadUserBackgroundPictureProfile') {
            const res = await post('/api/users/edituser', {
              type: 'editUserBackgroundPictureProfile',
              user_background_picture_url: imageUrl,
            });

            if (res.status === 200) {
              dispatch(refresh());
              dispatch(
                setSnackbarDisplay({
                  state: 'success',
                  message: t('editprofile.imageuploadsuccessed'),
                }),
              );
            }
            if (delFile) {
              if (
                delFile.includes('https://ramble.nyc3.digitaloceanspaces.com/')
              ) {
                const shouldDeleteFile = delFile.replace(
                  'https://ramble.nyc3.digitaloceanspaces.com/',
                  '',
                );
                const res1 = await post('/api/users/deleteimage', {
                  fileName: shouldDeleteFile,
                });
              }
            }
            dispatch(setLoading(false));
            handleClose();
          }
        }
      } catch (error) {
        console.log(error);
      }

      // const name = result.path.substring(result.path.lastIndexOf('/') + 1);
      // const blob = result;

      // const fPath = blob.path;
      // const base64 = await fs.readFile(fPath, 'base64');
      // const arrayBuffer = decode(base64);
      // const params = {
      //   Body: arrayBuffer,
      //   Bucket: `${storage_config.bucket_name}`,
      //   Key: `user_picture/${name}`,
      // };

      // S3.putObject(params)
      //   .on('build', (request) => {
      //     request.httpRequest.headers.Host = `${storage_config.digitalOceanSpaces}`;
      //     request.httpRequest.headers['Content-Length'] = blob.size;
      //     request.httpRequest.headers['Content-Type'] = blob.mime;
      //     request.httpRequest.headers['x-amz-acl'] = 'public-read-write';
      //   })
      //   .send(async (err) => {
      //     if (err) {
      //       console.log(err);
      //       dispatch(setLoading(false));
      //     } else if (setImage) {
      //       const imageUrl =
      //         `${storage_config.digitalOceanSpaces}user_picture/` + name;

      //       setImage(imageUrl);
      //       dispatch(setLoading(false));
      //       handleClose();
      //     } else if (upload === 'uploadUserPictureProfile') {
      //       const imageUrl =
      //         `${storage_config.digitalOceanSpaces}user_picture/` + name;

      //       const res = await post('/api/users/edituser', {
      //         type: 'editUserPictureProfile',
      //         user_picture_url: imageUrl,
      //       });

      //       if (res.status === 200) {
      //         dispatch(refresh());
      //         dispatch(
      //           setSnackbarDisplay({
      //             state: 'success',
      //             message: t('editprofile.imageuploadsuccessed'),
      //           }),
      //         );
      //       }
      //       if (delFile) {
      //         const shouldDeleteFile = delFile.replace(
      //           'https://ramble.nyc3.digitaloceanspaces.com/',
      //           '',
      //         );
      //         const delParams = {
      //           Bucket: `${storage_config.bucket_name}`,
      //           Key: `${shouldDeleteFile}`,
      //         };
      //         S3.deleteObject(delParams, function (err, data) {
      //           if (err) {
      //             console.log(err, err.stack);
      //           }
      //         });
      //       }
      //       dispatch(setLoading(false));
      //       handleClose();
      //     } else if (upload === 'uploadUserBackgroundPictureProfile') {
      //       const imageUrl =
      //         `${storage_config.digitalOceanSpaces}user_picture/` + name;

      //       const res = await post('/api/users/edituser', {
      //         type: 'editUserBackgroundPictureProfile',
      //         user_background_picture_url: imageUrl,
      //       });

      //       if (res.status === 200) {
      //         dispatch(refresh());
      //         dispatch(
      //           setSnackbarDisplay({
      //             state: 'success',
      //             message: t('editprofile.imageuploadsuccessed'),
      //           }),
      //         );
      //       }
      //       if (delFile) {
      //         const shouldDeleteFile = delFile.replace(
      //           'https://ramble.nyc3.digitaloceanspaces.com/',
      //           '',
      //         );
      //         const delParams = {
      //           Bucket: `${storage_config.bucket_name}`,
      //           Key: `${shouldDeleteFile}`,
      //         };
      //         S3.deleteObject(delParams, function (err, data) {
      //           if (err) {
      //             console.log(err, err.stack);
      //           }
      //         });
      //       }
      //       dispatch(setLoading(false));
      //       handleClose();
      //     }
      //   });
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
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}>
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
