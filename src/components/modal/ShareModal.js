import React, {useState, useEffect, useRef, Fragment} from 'react';
import {
  View,
  ViewStyle,
  Image,
  Alert,
  Linking,
  Platform,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import {ShareDialog} from 'react-native-fbsdk-next';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import CameraRoll from '@react-native-community/cameraroll';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SHADOW} from '../../constants';

const ShareModal = ({activity}) => {
  const [open, setOpen] = useState(false);
  const viewShotRef = useRef();
  const handleClose = () => {
    setOpen(false);
  };

  const shareToFacebook = async () => {
    const imageUrl = await viewShotRef.current.capture();

    const content = {
      contentType: 'photo',
      photos: [{imageUrl}],
    };

    ShareDialog.canShow(content).then((canShow) => {
      console.log(canShow);
      if (canShow) {
        return ShareDialog.show(content)
          .then((result) => {
            if (!result.isCancelled) {
              //onCompleted();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  // const shareToInstagram = async () => {
  //   const imageUrl = await viewShotRef.current.capture();

  //   const shareOptions = {
  //     url: imageUrl,
  //     social: Share.Social.INSTAGRAM,
  //   };

  //   return Share.shareSingle(shareOptions)
  //     .then(() => {
  //       //  onCompleted()
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const shareToLine = async () => {
    Linking.openURL(
      `https://social-plugins.line.me/lineit/share?url=https%3A%2F%2Fliff.line.me%2F1655591354-8d5Zzbm5%3Factivity%3D${activity._id}`,
    );
  };

  return (
    <Fragment>
      <View
        style={[
          {
            position: 'absolute',
            top: 10,
            right: 10,
            borderRadius: 50,
            width: 30,
            height: 30,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          },
          SHADOW.default,
        ]}>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Ionicons name="share-social" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={open}
        style={{margin: 0, justifyContent: 'flex-end', zIndex: 1}}
        onBackdropPress={handleClose}
        onBackButtonPress={handleClose}
        avoidKeyboard
        onSwipeComplete={handleClose}
        useNativeDriverForBackdrop
        swipeDirection={['down']}>
        <View style={{backgroundColor: COLORS.white, paddingTop: 20}}>
          <ViewShot
            ref={viewShotRef}
            options={{format: 'jpg', quality: 1}}
            style={{
              backgroundColor: COLORS.white,
              alignSelf: 'center',
            }}>
            <Image
              source={{uri: activity.activity_picture_url}}
              style={{
                height: 200,
                width: 300,
              }}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/logo/ramble512.png')}
                style={{width: 30, height: 30}}
              />
              <Text style={(FONTS.body5, {color: COLORS.black})}>
                www.ramble-club.com
              </Text>
            </View>
          </ViewShot>
          <View
            style={{
              flexDirection: 'row',
              padding: 20,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={shareToFacebook}
              style={{marginRight: 10}}>
              <Image
                source={require('../../../assets/socialicon/facebook.png')}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              activeOpacity={1}
              onPress={shareToInstagram}
              style={{marginRight: 10}}>
              <Image
                source={require('../../../assets/socialicon/instagram.png')}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity> */}
            <TouchableOpacity activeOpacity={1} onPress={shareToLine}>
              <Image
                source={require('../../../assets/socialicon/line.png')}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Fragment>
  );
};

export default ShareModal;
