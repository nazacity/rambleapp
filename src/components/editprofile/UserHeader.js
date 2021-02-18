import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import {Avatar} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UploadPictureModal from '../../components/modal/UploadPictureModal';
import {setUploadPictureModal} from '../../redux/actions/AppStateAction';
import {useDispatch} from 'react-redux';
import profile from '../../../assets/profile/profile.png';
import backgroundprofile from '../../../assets/profile/backgroundprofile.png';

const UserHeader = ({user}) => {
  const dispatch = useDispatch();
  const [upload, setUpload] = useState('uploadUserPictureProfile');
  const [delFile, setDelFile] = useState(null);

  return (
    <SafeAreaView style={{width: SIZES.width, height: SIZES.width / 2}}>
      <ImageBackground
        source={
          user.user_background_picture_url
            ? {uri: user.user_background_picture_url}
            : backgroundprofile
        }
        style={{resizeMode: 'cover', flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 25,
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <View>
            <Avatar
              rounded
              source={
                user.user_picture_url ? {uri: user.user_picture_url} : profile
              }
              size={80}
              containerStyle={{
                borderColor: COLORS.primary,
                borderWidth: 2,
                backgroundColor: COLORS.white,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                position: 'absolute',
                bottom: -5,
                right: -5,
                borderColor: 20,
                zIndex: 100,
                width: 30,
                height: 30,
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setUpload('uploadUserPictureProfile');
                if (user.user_picture_url) {
                  setDelFile(user.user_picture_url);
                } else {
                  setDelFile(null);
                }
                dispatch(setUploadPictureModal(true));
              }}>
              <MaterialCommunityIcons
                name="camera"
                color={COLORS.inputPlaceholderColor}
                size={20}
                style={{
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            borderColor: 20,
            zIndex: 100,
            width: 30,
            height: 30,
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setUpload('uploadUserBackgroundPictureProfile');
            if (user.user_picture_url) {
              setDelFile(user.user_background_picture_url);
            } else {
              setDelFile(null);
            }
            dispatch(setUploadPictureModal(true));
          }}>
          <MaterialCommunityIcons
            name="camera"
            color={COLORS.inputPlaceholderColor}
            size={20}
            style={{
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      </ImageBackground>
      <UploadPictureModal upload={upload} delFile={delFile} />
    </SafeAreaView>
  );
};

export default UserHeader;
