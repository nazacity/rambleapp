import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Modal from 'react-native-modal';

import {SIZES, FONTS, COLORS} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';
import Markdown from 'react-native-markdown-display';
import Button from '../Button';
import LocalizationContext from '../../screens/LocalizationContext';

const AnnouncementModal = ({open, handleClose, data, activityPictureUrl}) => {
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
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: data.picture_url ? data.picture_url : activityPictureUrl,
          }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 5,
            marginBottom: 20,
          }}
        />
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.h2, {textAlign: 'center'}]}>{data.title}</Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.body4]}>{data.description}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default AnnouncementModal;

const styles = StyleSheet.create({});
