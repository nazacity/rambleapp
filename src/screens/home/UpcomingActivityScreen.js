import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import moment from 'moment';
import 'moment/locale/th';
import {useSelector} from 'react-redux';

import {FONTS, COLORS, SIZES, SHADOW} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import ActivityCard from '../../components/activity/ActivityCard';
import MenuButton from '../../components/layout/MenuButton';
import LocalizationContext from '../LocalizationContext';
import {Badge} from 'react-native-elements';

const UpcomingActivityScreen = () => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const activities = useSelector((state) => state.activity.upcoming_activities);
  const lang = useSelector((state) => state.appState.lang);
  moment.locale(lang);

  const UpcomingActivityCard = ({item, index}) => {
    const badgeNumber = item.announcement.filter(
      (item1) => item1.state === 'not_read',
    );
    return (
      <ActivityCard
        item={item}
        onPress={() => {
          navigation.navigate('ActivityUpcoming', {
            activityId: item.activity.id._id,
          });
        }}>
        <View style={{position: 'absolute', bottom: 20, left: 20}}>
          <Text style={[FONTS.h4, {color: '#fff'}]}>
            {item.activity.id.title}
          </Text>
          <Text style={[FONTS.h1, {color: '#fff'}]}>
            {moment(item.activity.id.actual_date).fromNow()}
          </Text>
        </View>
        {badgeNumber.length > 0 && (
          <Badge
            value={badgeNumber.length}
            status="error"
            containerStyle={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 200,
            }}
            badgeStyle={[
              {
                borderRadius: 15,
                width: 30,
                height: 30,
              },
              SHADOW.default,
            ]}
          />
        )}
      </ActivityCard>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        alignItems: 'center',
      }}>
      <MenuButton />
      {activities.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[FONTS.h2, {color: COLORS.primary}]}>
            {t('upcoming.noactivity')}
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={activities}
          keyExtractor={(item) => `${item._id}`}
          renderItem={({item, index}) => {
            return <UpcomingActivityCard item={item} index={index} />;
          }}
          ItemSeparatorComponent={() => <View style={{margin: 10}} />}
          style={{padding: 20, paddingTop: 60}}
          ListFooterComponent={() => <View style={{margin: 50}} />}
        />
      )}
    </View>
  );
};

export default UpcomingActivityScreen;

const styles = StyleSheet.create({});
