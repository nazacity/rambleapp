import React from 'react';
import {View, FlatList} from 'react-native';
import {WebView} from 'react-native-webview';
import Modal from 'react-native-modal';
import {TouchableOpacity} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../constants';
import LocalizationContext from '../../../screens/LocalizationContext';
import CommentTab from './CommentTab';
import ModalCloseButton from '../../layout/ModalCloseButton';
import CommentCard from './CommentCard';
import {comments} from '../data';

const CommentModal = ({open, handleClose}) => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <Modal
      isVisible={open}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}>
      <View
        style={{
          height: SIZES.height / 1.1,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <ModalCloseButton onPress={handleClose} />
        <CommentTab />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={comments}
          style={{marginTop: 40}}
          contentContainerStyle={{padding: 10}}
          keyExtractor={(item) => item._id}
          renderItem={({item, index}) => {
            return <CommentCard item={item} index={index} />;
          }}
          ListFooterComponent={<View style={{margin: 40}} />}
        />
      </View>
    </Modal>
  );
};

export default CommentModal;
