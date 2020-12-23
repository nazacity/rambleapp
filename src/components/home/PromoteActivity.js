import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useNavigation} from '@react-navigation/native';
import {get} from '../../redux/actions/request';
import {SHADOW} from '../../constants';

const PromoteActivity = () => {
  const navigation = useNavigation();
  const [promote_activities, setPromote_activities] = useState([]);
  const fetchPromoteActivity = async () => {
    const res = await get('/api/users/getpromoteactivities');
    if (res.status === 200) {
      setPromote_activities(res.data);
    }
  };
  useEffect(() => {
    fetchPromoteActivity();
  }, []);
  const PromoteActivityCard = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('ActivityDetail', {
            activityId: item._id,
          });
        }}
        style={{
          width: 300,
          height: 200,
          marginRight: promote_activities.length === index + 1 ? 40 : 0,
          borderRadius: 10,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: item.activity_picture_url}}
          style={{width: 300, height: 200, borderRadius: 5}}
        />
      </TouchableOpacity>
    );
  };

  if (promote_activities.length === 0) {
    return (
      <View
        style={{height: 240, justifyContent: 'center', alignItems: 'center'}}>
        <Text>ยังไม่มีกิจกรรม</Text>
      </View>
    );
  }

  return (
    <View style={{height: 240}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={promote_activities}
        keyExtractor={(item) => `${item._id}`}
        renderItem={({item, index}) => {
          return <PromoteActivityCard item={item} index={index} />;
        }}
        ItemSeparatorComponent={() => <View style={{padding: 10}} />}
        style={{padding: 20}}
      />
    </View>
  );
};

export default PromoteActivity;

const styles = StyleSheet.create({});
