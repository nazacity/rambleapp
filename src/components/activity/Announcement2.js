import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';

import {useDispatch, useSelector} from 'react-redux';

import {FONTS, COLORS, SIZES, SHADOW} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {get} from '../../redux/actions/request';
import {refresh} from '../../redux/actions/UserAction';
import AnnouncementModal from '../modal/AnnouncementModal';
import {checkTimeFromPast} from '../../services/util';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native';
import {Platform} from 'react-native';

const Announcement2 = ({activity, handleClose, open1}) => {
  const {t} = React.useContext(LocalizationContext);

  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    title: '',
    description: '',
    picture_url: '',
  });

  const handleModalClose = async () => {
    setOpen(false);
  };

  const handleModalOpen = (item) => {
    setData(item);
    setOpen(true);
  };

  const AnnouncementCard = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor:
            item.state === 'not_read'
              ? COLORS.notificationNotRead
              : COLORS.backgroundColor,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (item.description.length > 100) {
              handleModalOpen(item);
            }
          }}
          style={[
            {
              overflow: 'hidden',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
            },
          ]}>
          <Image
            source={{
              uri: item.picture_url
                ? item.picture_url
                : activity.activity_picture_url,
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 40,
            }}
          />
          <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[FONTS.h5]}>{item.title}</Text>
              <Text style={[FONTS.body5]}>
                {checkTimeFromPast(item.createdAt)}
              </Text>
            </View>
            <Text style={[FONTS.body5, {width: SIZES.width - 100}]}>
              {item.description.length > 100
                ? `${item.description.substring(0, 80)}...`
                : item.description}
            </Text>
          </View>
          {item.description.length > 100 && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                handleModalOpen(item);
              }}
              style={{position: 'absolute', bottom: 5, right: 10}}>
              <Text style={[FONTS.body5, {color: COLORS.primary}]}>
                {t('activity.readmore')}
              </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: 'rgba(0,0,0,0.2)',
            alignSelf: 'center',
            width: 250,
            marginVertical: 4,
          }}
        />
      </View>
    );
  };

  return (
    <Modal
      animationIn="slideInDown"
      animationOut="slideOutUp"
      isVisible={open1}
      style={{margin: 0, justifyContent: 'flex-start'}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      avoidKeyboard
      // onSwipeComplete={handleClose}
      // useNativeDriverForBackdrop
      // swipeDirection={Platform.OS === 'ios' ? null : ['up']}
    >
      <AnnouncementModal
        open={open}
        handleClose={handleModalClose}
        data={data}
        activityPictureUrl={activity.activity_picture_url}
      />
      <View
        style={{
          backgroundColor: COLORS.backgroundColor,
          height:
            activity.announcement.length > 5
              ? (SIZES.height / 3) * 2
              : undefined,
        }}>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {activity.announcement.length === 0 ? (
              <View
                style={{
                  height: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>{t('activity.noannouncement')}</Text>
              </View>
            ) : (
              <View>
                {activity.announcement
                  .sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                  })
                  .map((item, index) => {
                    return (
                      <AnnouncementCard
                        key={item._id}
                        item={item}
                        index={index}
                      />
                    );
                  })}
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default Announcement2;
