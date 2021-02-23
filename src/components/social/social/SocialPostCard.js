import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS, SHADOW} from '../../../constants';
import {Avatar} from 'react-native-elements';
import {checkTimeFromPast} from '../../../services/util';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import relativeTime from 'dayjs/plugin/relativeTime';
import LoveButton from './LoveButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommentModal from './CommentModal';
import LocalizationContext from '../../../screens/LocalizationContext';

dayjs.extend(relativeTime);

const SocialPostCard = ({item, index}) => {
  const {t} = React.useContext(LocalizationContext);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <View
      style={[
        {
          borderRadius: 10,
          backgroundColor: COLORS.white,
          padding: 10,
          margin: 10,
        },
        SHADOW.image,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar rounded source={{uri: item.user_picture_url}} size={40} />
          <View style={{marginLeft: 10}}>
            <Text style={[FONTS.h2]}>{item.display_name}</Text>
          </View>
        </View>

        <View>
          <Text style={[FONTS.body3]}>
            {checkTimeFromPast(item.createdAt)
              ? dayjs(item.createdAt).format('DD MMMM YYYY')
              : dayjs(item.createdAt).fromNow()}
          </Text>
        </View>
      </View>
      <View>
        <Text style={[FONTS.body3]}>{item.text}</Text>
      </View>
      <View style={{marginTop: 10}}>
        {item.pictures.length === 1 && (
          <Image
            source={{uri: item.pictures[0].url}}
            style={{height: 300, borderRadius: 5}}
          />
        )}
        {item.pictures.length > 1 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              {item.pictures.map((pic, index) => {
                return (
                  <Image
                    key={pic._id}
                    source={{uri: pic.url}}
                    style={{
                      height: 150,
                      width: 150,
                      borderRadius: 5,
                      marginRight: index === item.pictures.length - 1 ? 0 : 10,
                    }}
                  />
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
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
          <TouchableOpacity
            activeOpacity={0.8}
            style={{marginRight: 10}}
            onPress={() => {
              setOpen(true);
            }}>
            <MaterialIcons
              name="add-circle-outline"
              size={24}
              color={COLORS.inputPlaceholderColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{flexDirection: 'row'}}
            onPress={() => {
              setOpen(true);
            }}>
            <Text style={[FONTS.body3, {marginRight: 5}]}>8</Text>
            <Text style={[FONTS.body3]}>
              {t('community.socialcomment.comments')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <CommentModal open={open} handleClose={handleClose} />
    </View>
  );
};

export default SocialPostCard;
