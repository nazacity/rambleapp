import React from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import Modal from 'react-native-modal';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../constants';

const PolicyModal = ({open, handleClose}) => {
  return (
    <Modal
      isVisible={open}
      style={{margin: 0}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}>
      <View style={{flex: 1}}>
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
          onPress={() => {
            handleClose();
          }}>
          <MaterialIcons name="cancel" color={COLORS.buttonBlue} size={24} />
        </TouchableOpacity>
        <WebView
          source={{uri: 'https://staging.teenaii.com/mobile/user_agreement'}}
        />
      </View>
    </Modal>
  );
};

export default PolicyModal;
