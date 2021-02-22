import React from 'react';
import {View, FlatList, Platform} from 'react-native';
import Modal from 'react-native-modal';

import {COLORS, FONTS, SIZES} from '../../../constants';
import LocalizationContext from '../../../screens/LocalizationContext';
import CommentTab from './CommentTab';
import ModalCloseButton from '../../layout/ModalCloseButton';
import CommentCard from './CommentCard';

const comments = [
  {
    _id: '1',
    user: {
      user_picture_url:
        'https://s.isanook.com/mv/0/rp/r/w850/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvMjEvMTA1OTQxL2NvbGxhZ2UuanBn.jpg',
      display_name: 'ramble',
    },
    text:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ',
    createdAt: new Date('2021-01-25'),
  },
  {
    _id: '2',
    user: {
      user_picture_url:
        'https://s.isanook.com/mv/0/rp/r/w850/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvMjEvMTA1OTQxL2NvbGxhZ2UuanBn.jpg',
      display_name: 'ramble',
    },
    text:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    createdAt: new Date('2021-02-19'),
  },
  {
    _id: '3',
    user: {
      user_picture_url:
        'https://s.isanook.com/mv/0/rp/r/w850/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvMjEvMTA1OTQxL2NvbGxhZ2UuanBn.jpg',
      display_name: 'ramble',
    },
    text:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has',
    createdAt: new Date('2021-01-31'),
  },
  {
    _id: '4',
    user: {
      user_picture_url:
        'https://s.isanook.com/mv/0/rp/r/w850/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvMjEvMTA1OTQxL2NvbGxhZ2UuanBn.jpg',
      display_name: 'ramble',
    },
    text:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ',
    createdAt: new Date('2021-02-20'),
  },
  {
    _id: '5',
    user: {
      user_picture_url:
        'https://s.isanook.com/mv/0/rp/r/w850/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvMjEvMTA1OTQxL2NvbGxhZ2UuanBn.jpg',
      display_name: 'ramble',
    },
    text:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has',
    createdAt: new Date('2021-02-19'),
  },
];

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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={comments}
          style={{marginTop: 40}}
          contentContainerStyle={{padding: 10}}
          keyExtractor={(item) => item._id}
          renderItem={({item, index}) => {
            return <CommentCard item={item} index={index} />;
          }}
          ListFooterComponent={<View style={{margin: 60}} />}
        />
      </View>
      <CommentTab bottom={Platform.OS === 'ios' ? 40 : 20} />
    </Modal>
  );
};

export default CommentModal;
