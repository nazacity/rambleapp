import React, {Fragment, useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {FONTS, COLORS, theme, SIZES, SHADOW} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../Button';

import {
  setLoading,
  setSnackbarDisplay,
} from '../../redux/actions/AppStateAction';
import UploadPictureModal from '../modal/UploadPictureModal1';
import ImagePicker from 'react-native-image-crop-picker';
import {Platform} from 'react-native';
import {Image} from 'react-native';
import {Alert} from 'react-native';
import {setUser} from '../../redux/actions/UserAction';
import {post} from '../../redux/actions/request';
import ModalCloseButton from '../layout/ModalCloseButton';

const VerifyVaccineModal = ({handleClose, open}) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const handleUploadModalClose = () => {
    setUploadModalOpen(false);
  };
  const [image, setImage] = useState({
    uri: '',
  });
  // FOCUSES
  //   const [focus, setFocus] = useState({});

  //   const setErrorMessage = (msg) => {
  //     setError(true);
  //     setMessage(msg);
  //   };

  //   const onSubmit = async (data) => {
  //     if (data.new_password.length < 8) {
  //       setErrorMessage(t('signup.password8'));
  //     } else if (data.new_password !== data.confirm_password) {
  //       setErrorMessage(t('signup.passwordnotmatch'));
  //     } else {
  //       dispatch(
  //         changePasssword(
  //           {
  //             old_password: data.old_password,
  //             new_password: data.new_password,
  //           },
  //           t,
  //           handleClose,
  //           setErrorMessage,
  //         ),
  //       );
  //     }
  //   };

  const handleSubmit = async () => {
    if (image.uri === '') {
      Alert.alert(t('editprofile.uploadpicture'), '', [
        {
          text: t('editprofile.okay'),
          onPress: () => {},
        },
      ]);
      return;
    }

    const formData = new FormData();
    formData.append('covid', image);

    try {
      dispatch(setLoading(true));
      const res = await post('/api/users/sendcovidresult', formData);

      if (res.status === 200) {
        dispatch(setUser(res.data));
      }
      dispatch(setLoading(false));
      dispatch(
        setSnackbarDisplay({
          state: 'success',
          message: t('editprofile.sentinformation'),
        }),
      );
      handleResetClose();
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  const takePhotoFromCamera = async () => {
    const result = await ImagePicker.openCamera({
      width: 900,
      height: 600,
      cropping: true,
    });

    const photo = {
      uri:
        Platform.OS === 'android'
          ? result.path
          : result.path.replace('file://', ''),
      type: result.mime,
      name: result.path.substring(result.path.lastIndexOf('/') + 1),
    };

    setImage(photo);

    setUploadModalOpen(false);
  };

  const choosePhotoFromLibrary = async () => {
    const result = await ImagePicker.openPicker({
      width: 900,
      height: 600,
      cropping: true,
    });

    const photo = {
      uri:
        Platform.OS === 'android'
          ? result.path
          : result.path.replace('file://', ''),
      type: result.mime,
      name: result.path.substring(result.path.lastIndexOf('/') + 1),
    };

    setImage(photo);
    setUploadModalOpen(false);
  };

  const handleResetClose = () => {
    setImage({
      uri: '',
    });
    handleClose();
  };

  return (
    <Modal
      isVisible={open}
      style={{margin: 0}}
      onBackdropPress={handleResetClose}
      onBackButtonPress={handleResetClose}>
      <SafeAreaView
        style={{
          backgroundColor: COLORS.backgroundColor,
          flex: 1,
        }}>
        <View
          style={{flex: 1, alignItems: 'center', padding: 20, paddingTop: 40}}>
          <ModalCloseButton onPress={handleResetClose} />
          <View style={[SHADOW.default, {borderRadius: 5, marginBottom: 20}]}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                {
                  width: 300,
                  height: 200,
                  borderRadius: 5,
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                SHADOW.default,
              ]}
              onPress={() => {
                setUploadModalOpen(true);
              }}>
              {/* <Image
                source={
                  image.uri
                    ? {uri: image.uri}
                    : require('../../../assets/logo/ramble512.png')
                }
                style={{
                  width: 300,
                  height: 200,
                  borderRadius: 5,
                }}
              /> */}
              <Text style={[FONTS.h3, {textAlign: 'center'}]}>
                {t('editprofile.vaccinedoc')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}} />
          <Button
            label={t('editprofile.sendinfo')}
            color={COLORS.pinkPastel}
            onPress={handleSubmit}
          />
        </View>
        {/* <Snackbar
        visible={error}
        onDismiss={() => {
          setError(false);
        }}
        style={{
          backgroundColor: '#d9534f',
        }}
        duration={1500}>
        {message}
      </Snackbar> */}
      </SafeAreaView>
      <UploadPictureModal
        takePhotoFromCamera={takePhotoFromCamera}
        choosePhotoFromLibrary={choosePhotoFromLibrary}
        open={uploadModalOpen}
        handleClose={handleUploadModalClose}
      />
    </Modal>
  );
};

export default VerifyVaccineModal;
