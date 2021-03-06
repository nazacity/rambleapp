import React from 'react';
import {View, FlatList, Platform, SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';

import {COLORS, FONTS, SIZES} from '../../../constants';
import LocalizationContext from '../../../screens/LocalizationContext';
import CommentTab from './CommentTab2';
import ModalCloseButton from '../../layout/ModalCloseButton';
import CommentCard from './CommentCard';
import {KeyboardAvoidingView} from 'react-native';
import {Fragment} from 'react';

const CommentModal = ({open, handleClose, data, setData}) => {
  const {t} = React.useContext(LocalizationContext);

  return (
    <Modal
      isVisible={open}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      avoidKeyboard>
      <SafeAreaView
        style={{
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <ModalCloseButton onPress={handleClose} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.blog_comments}
          style={{marginTop: 40}}
          contentContainerStyle={{padding: 10}}
          keyExtractor={(item) => item._id}
          renderItem={({item, index}) => {
            return <CommentCard item={item} index={index} />;
          }}
          ListFooterComponent={<View style={{margin: 60}} />}
        />
      </SafeAreaView>
      <CommentTab
        bottom={Platform.OS === 'ios' ? 40 : 20}
        id={data._id}
        setData={setData}
      />
    </Modal>
  );
};

export default CommentModal;
