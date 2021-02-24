import React from 'react';
import {View, FlatList, Platform, Text, ScrollView} from 'react-native';
import Modal from 'react-native-modal';

import {COLORS, FONTS, SIZES} from '../../../constants';
import LocalizationContext from '../../../screens/LocalizationContext';
import CommentTab from './CommentTab';
import ModalCloseButton from '../../layout/ModalCloseButton';
import CommentCard from './CommentCard';
import {Avatar} from 'react-native-elements';
import {checkTimeFromPast} from '../../../services/util';
import LoveButton from './LoveButton';
import ImageModal from 'react-native-image-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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

const CommentModal = ({open, handleClose, item}) => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <Modal
      isVisible={open}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <ModalCloseButton onPress={handleClose} />
        <FlatList
          ListHeaderComponent={
            <View
              style={[
                {
                  backgroundColor: COLORS.white,
                  padding: 10,
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Avatar
                    rounded
                    source={{uri: item.user_picture_url}}
                    size={40}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text style={[FONTS.h2]}>{item.display_name}</Text>
                  </View>
                </View>

                <View>
                  <Text style={[FONTS.body3]}>
                    {checkTimeFromPast(item.createdAt)}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={[FONTS.body3]}>{item.text}</Text>
              </View>
              <View style={{marginTop: 10}}>
                {item.pictures.length === 1 && (
                  <ImageModal
                    resizeMode="contain"
                    imageBackgroundColor={COLORS.background}
                    overlayBackgroundColor="rgba(0,0,0,0.3)"
                    style={{
                      height: 300,
                      width: SIZES.width - 40,
                      borderRadius: 5,
                    }}
                    borderRadius={10}
                    source={{
                      uri: item.pictures[0].url,
                    }}
                  />
                )}
                {item.pictures.length > 1 && (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View
                      style={{flexDirection: 'row', justifyContent: 'center'}}>
                      {item.pictures.map((pic, index) => {
                        return (
                          <View
                            key={pic._id}
                            style={{
                              height: 150,
                              width: 150,
                              borderRadius: 5,
                              marginRight:
                                index === item.pictures.length - 1 ? 0 : 10,
                            }}>
                            <ImageModal
                              resizeMode="contain"
                              imageBackgroundColor={COLORS.background}
                              overlayBackgroundColor="rgba(0,0,0,0.3)"
                              style={{
                                height: 150,
                                width: 150,
                                borderRadius: 10,
                              }}
                              borderRadius={10}
                              source={{
                                uri: pic.url,
                              }}
                            />
                          </View>
                        );
                      })}
                    </View>
                  </ScrollView>
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <LoveButton />
                  <Text style={[FONTS.body3, {marginLeft: 5}]}>11</Text>
                </View>
                <View
                  style={{
                    marginRight: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View activeOpacity={0.8} style={{marginRight: 10}}>
                    <FontAwesome
                      name="comment-o"
                      size={20}
                      color={COLORS.opcaityBlack}
                    />
                  </View>
                  <View activeOpacity={0.8} style={{flexDirection: 'row'}}>
                    <Text style={[FONTS.body3, {marginRight: 5}]}>8</Text>
                    <Text style={[FONTS.body3]}>
                      {t('community.socialcomment.comments')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          }
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
