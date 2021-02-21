import React from 'react';
import {View, Text} from 'react-native';
import {COLORS, SHADOW} from '../../../constants';
import {Avatar} from 'react-native-elements';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import {useSelector} from 'react-redux';
import {checkTimeFromPast} from '../../../services/util';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const CommentCard = ({item, index}) => {
  const lang = useSelector((state) => state.appState.lang);
  dayjs.locale(lang);
  return (
    <View
      style={[
        {
          marginVertical: 5,
          backgroundColor: COLORS.white,
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        },
        SHADOW.default,
      ]}>
      <View>
        <Avatar
          rounded
          source={{
            uri: item.user.user_picture_url,
          }}
          containerStyle={{backgroundColor: '#fff', marginRight: 5}}
          size={60}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{item.user.display_name}</Text>
          <Text>
            {checkTimeFromPast(item.createdAt)
              ? dayjs(item.createdAt).format('DD MMMM YYYY')
              : dayjs(item.createdAt).fromNow()}
          </Text>
        </View>
        <View>
          <Text>{item.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default CommentCard;
