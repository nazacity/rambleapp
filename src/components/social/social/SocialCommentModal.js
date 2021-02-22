import React, {useState} from 'react';
import {View, FlatList, Platform, Image, ScrollView, Text} from 'react-native';
import {Input, Avatar} from 'react-native-elements';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../../constants';
import LocalizationContext from '../../../screens/LocalizationContext';
import ModalCloseButton from '../../layout/ModalCloseButton';

const SocialCommentModal = ({open, handleClose}) => {
  const {t} = React.useContext(LocalizationContext);
  const [value, setValue] = useState('');
  const user = useSelector((state) => state.user);
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
          padding: 20,
        }}>
        <ModalCloseButton onPress={handleClose} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar rounded source={{uri: user.user_picture_url}} size={40} />
            <View style={{marginLeft: 10}}>
              <Text style={[FONTS.h2]}>{user.display_name}</Text>
            </View>
          </View>
          <View style={{marginBottom: 20}}>
            <Input
              placeholder={t('community.socialcomment.post')}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              onChangeText={(text) => {
                setValue(text);
              }}
              value={value}
              multiline
              numberOfLines={5}
              //   containerStyle={{
              //     backgroundColor: COLORS.lightGrey,

              //   }}
              style={[FONTS.body3, {textAlignVertical: 'top'}]}
            />
          </View>
          <View style={{marginBottom: 5}}>
            <Image
              source={{
                uri:
                  'https://www.marathon-world.com/wp-content/uploads/2019/04/Half-marathon.jpg',
              }}
              style={{
                width: SIZES.width - 40,
                height: SIZES.width - 40,
                borderRadius: 5,
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri:
                  'https://chiangmaimarathon.com/download/chiangmaimarathon_com/headerslide/header_slide_9_3306.jpg',
              }}
              style={{
                width: (SIZES.width - 45) / 2,
                height: (SIZES.width - 40) / 2,
                marginRight: 5,
                borderRadius: 5,
              }}
            />
            <Image
              source={{
                uri:
                  'https://i0.wp.com/www.vrunvride.com/wp-content/uploads/2019/07/Prague-Marathon.jpg?fit=1024%2C683&ssl=1',
              }}
              style={{
                width: (SIZES.width - 45) / 2,
                height: (SIZES.width - 40) / 2,
                borderRadius: 5,
              }}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SocialCommentModal;
