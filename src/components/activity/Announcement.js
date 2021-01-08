import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';

import {useDispatch, useSelector} from 'react-redux';

import {FONTS, COLORS, SIZES, SHADOW} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {get} from '../../redux/actions/request';
import {refresh} from '../../redux/actions/UserAction';
import AnnouncementModal from '../modal/AnnouncementModal';
import TitleHeader from '../layout/TitleHeader';
import moment from 'moment';
import 'moment/locale/th';

const UpcomingActivity = ({userActivity, setUserActivity}) => {
  const {t} = React.useContext(LocalizationContext);
  const lang = useSelector((state) => state.appState.lang);
  moment.locale(lang);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    title: '',
    description: '',
    picture_url: '',
  });

  const updateReadState = async (id, state) => {
    if (state === 'not_read') {
      const res = await get(
        `/api/users/updatereadstate/${userActivity._id}/${id}`,
      );
      if (res.status === 200) {
        dispatch(refresh());
        setUserActivity(res.data);
      }
    }
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleModalOpen = (item) => {
    setData(item);
    setOpen(true);
  };

  const AnnouncementCard = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          updateReadState(item._id, item.state);
          if (item.description.length > 100) {
            handleModalOpen(item);
          }
        }}
        style={[
          {
            borderRadius: 10,
            overflow: 'hidden',
            flexDirection: 'row',
            backgroundColor: item.state === 'not_read' ? '#fff9c4' : '#fff',
          },
          SHADOW.default,
        ]}>
        <Image
          source={{
            uri: item.picture_url
              ? item.picture_url
              : userActivity.activity.id.activity_picture_url,
          }}
          style={{
            width: 100,
            height: 100,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
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
              {moment(item.createdAt).fromNow()}
            </Text>
          </View>
          <Text style={[FONTS.body5, {width: SIZES.width - 180}]}>
            {item.description.length > 100
              ? `${item.description.substring(0, 80)}...`
              : item.description}
          </Text>
        </View>
        {item.description.length > 100 && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              updateReadState(item._id, item.state);
              handleModalOpen(item);
            }}
            style={{position: 'absolute', bottom: 5, right: 10}}>
            <Text style={[FONTS.body5, {color: COLORS.primary}]}>
              {t('activity.readmore')}
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <AnnouncementModal
        open={open}
        handleClose={handleModalClose}
        data={data}
        activityPictureUrl={userActivity.activity.id.activity_picture_url}
      />
      {userActivity.announcement.length === 0 ? (
        <View
          style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{t('activity.noannouncement')}</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={userActivity.announcement.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })}
            keyExtractor={(item) => `${item._id}`}
            renderItem={({item, index}) => {
              return <AnnouncementCard item={item} index={index} />;
            }}
            ItemSeparatorComponent={() => <View style={{padding: 10}} />}
            contentContainerStyle={{padding: 10}}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default UpcomingActivity;

const styles = StyleSheet.create({});
