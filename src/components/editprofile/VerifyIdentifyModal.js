import React, {Fragment, useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {FONTS, COLORS, theme, SIZES, SHADOW} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useForm, Controller} from 'react-hook-form';
import FloatingLabelInput from '../floatinglabelinput/FloatingLabelInput';
import {useDispatch, useSelector} from 'react-redux';
import {changePasssword, refresh} from '../../redux/actions/UserAction';
import Button from '../Button';
import {Icon} from 'react-native-elements';
import {Snackbar} from 'react-native-paper';
import WebView from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import {Linking} from 'react-native';
import {
  setLoading,
  setSnackbarDisplay,
} from '../../redux/actions/AppStateAction';
import UploadPictureModal from '../modal/UploadPictureModal1';
import ImagePicker from 'react-native-image-crop-picker';
import {Platform} from 'react-native';
import {Image} from 'react-native';

const VerifyIdentifyModal = ({handleClose, open}) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [uploadModalOpen, setUploadModalOpen] = useState({
    type: 'id_card',
    open: false,
  });
  const handleUploadModalClose = () => {
    setUploadModalOpen({...uploadModalOpen, open: false});
  };
  const [images, setImages] = useState({
    id_card: {
      uri: '',
    },
    id_card_with_person: {
      uri: '',
    },
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

  const handleSubmit = async (result) => {
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
    }
  };

  const takePhotoFromCamera = async () => {
    const result = await ImagePicker.openCamera({
      width: 300,
      height: 200,
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
    if (uploadModalOpen.type === 'id_card') {
      setImages({
        ...images,
        id_card: photo,
      });
    } else if (uploadModalOpen.type === 'id_card_with_person') {
      setImages({
        ...images,
        id_card_with_person: photo,
      });
    }
    setUploadModalOpen(false);
  };

  const choosePhotoFromLibrary = async () => {
    const result = await ImagePicker.openPicker({
      width: 300,
      height: 200,
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

    if (uploadModalOpen.type === 'id_card') {
      setImages({
        ...images,
        id_card: photo,
      });
    } else if (uploadModalOpen.type === 'id_card_with_person') {
      setImages({
        ...images,
        id_card_with_person: photo,
      });
    }
    setUploadModalOpen(false);
  };

  const handleResetClose = () => {
    setImages({
      id_card: {
        uri: '',
      },
      id_card_with_person: {
        uri: '',
      },
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
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              position: 'absolute',
              zIndex: 100,
              top: 10,
              right: 10,
            }}
            onPress={handleResetClose}>
            <MaterialIcons name="cancel" color={COLORS.buttonBlue} size={24} />
          </TouchableOpacity>
          <View style={[SHADOW.default, {borderRadius: 5, marginBottom: 20}]}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                {
                  width: 300,
                  height: 200,
                  borderRadius: 5,
                  backgroundColor: COLORS.white,
                },
                SHADOW.default,
              ]}
              onPress={() => {
                setUploadModalOpen({
                  type: 'id_card',
                  open: true,
                });
              }}>
              <Image
                source={
                  images.id_card.uri
                    ? {uri: images.id_card.uri}
                    : require('../../../assets/logo/ramble512.png')
                }
                style={{
                  width: 300,
                  height: 200,
                  borderRadius: 5,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={[SHADOW.default, {borderRadius: 5}]}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                {
                  width: 300,
                  height: 200,
                  borderRadius: 5,
                  backgroundColor: COLORS.white,
                },
                SHADOW.default,
              ]}
              onPress={() => {
                setUploadModalOpen({
                  type: 'id_card_with_person',
                  open: true,
                });
              }}>
              <Image
                source={
                  images.id_card_with_person.uri
                    ? {uri: images.id_card_with_person.uri}
                    : require('../../../assets/logo/ramble512.png')
                }
                style={{
                  width: 300,
                  height: 200,
                  borderRadius: 5,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}} />
          <Button
            label={t('editprofile.sendinfo')}
            color={COLORS.pinkPastel}
            // onPress={handleSubmit(onSubmit)}
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
        open={uploadModalOpen.open}
        handleClose={handleUploadModalClose}
      />
    </Modal>
  );
};

export default VerifyIdentifyModal;
