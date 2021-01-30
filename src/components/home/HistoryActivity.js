import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';
import {RectButton, TouchableOpacity} from 'react-native-gesture-handler';

import {useSelector, useDispatch} from 'react-redux';

import {FONTS, COLORS, SHADOW} from '../../constants';
import {Icon} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import {setHisActivities} from '../../redux/actions/ActivityAction';
import TitleHeader from '../layout/TitleHeader';

const HistoryActivity = () => {
  const {t} = React.useContext(LocalizationContext);
  const user_activities = useSelector((state) => state.user.user_activities);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [historyActivities, setHistoryActivities] = useState([]);

  const checkHistoryActivityState = () => {
    const finishedActivities = user_activities.filter(
      (item) => item.state === 'history',
    );
    if (finishedActivities) {
      dispatch(setHisActivities(finishedActivities));
      setHistoryActivities(finishedActivities.slice(0, 5));
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkHistoryActivityState();
    });

    return unsubscribe;
  }, [user_activities]);

  const HistoryActivityCard = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('ActivityHistory', {
            userActivity: item,
          });
        }}
        style={{
          padding: 10,
          marginRight: historyActivities.length === index + 1 ? 40 : 0,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: COLORS.backgroundColor,
        }}>
        <View style={[SHADOW.image]}>
          <Image
            source={{uri: item.activity.id.activity_picture_url}}
            style={{width: 150, height: 150, borderRadius: 5}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TitleHeader
        title={t('home.historyactivity')}
        seeAll={() => {
          navigation.jumpTo('home', {
            screen: 'HistoryActivity',
          });
        }}
        paddingHorizontal={20}
      />
      {loading ? (
        <View
          style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      ) : !loading && historyActivities.length === 0 ? (
        <View
          style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[FONTS.body4, {color: COLORS.black}]}>
            {t('history.noactivity')}
          </Text>
        </View>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={historyActivities}
          keyExtractor={(item) => `${item._id}`}
          renderItem={({item, index}) => {
            return <HistoryActivityCard item={item} index={index} />;
          }}
          // ItemSeparatorComponent={() => <View style={{padding: 10}} />}
          style={{paddingHorizontal: 20}}
        />
      )}
    </View>
  );
};

export default HistoryActivity;

const styles = StyleSheet.create({});
