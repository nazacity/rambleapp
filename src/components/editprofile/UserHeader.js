import React, {useState} from 'react';
import {Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import {Avatar} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UploadPictureModal from '../../components/modal/UploadPictureModal';
import {setUploadPictureModal} from '../../redux/actions/AppStateAction';
import {useDispatch} from 'react-redux';

const UserHeader = ({user}) => {
  const dispatch = useDispatch();
  const [upload, setUpload] = useState('uploadUserPictureProfile');
  return (
    <View style={{width: SIZES.width, height: SIZES.width / 2}}>
      <ImageBackground
        source={{uri: user.user_background_picture_url}}
        style={{resizeMode: 'cover', flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 25,
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}>
          <View>
            <Avatar
              rounded
              source={{uri: user.user_picture_url}}
              size={80}
              containerStyle={{
                borderColor: COLORS.primary,
                borderWidth: 2,
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
      <UploadPictureModal upload={upload} />
    </View>
  );
};

export default UserHeader;
