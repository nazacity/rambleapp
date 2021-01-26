import React, {useRef} from 'react';
import {StyleSheet, Text, View, FlatList, Animated} from 'react-native';
import moment from 'moment';
import 'moment/locale/th';
import {useSelector} from 'react-redux';

import {FONTS, COLORS, SIZES} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import ActivityCard from '../../components/activity/ActivityCard';
import MenuButton from '../../components/layout/MenuButton';
import LocalizationContext from '../LocalizationContext';

const CardHeight = ((SIZES.width - 80) * 2) / 3;

const HistoryActivityScreen = () => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const activities = useSelector((state) => state.activity.history_activities);
  const lang = useSelector((state) => state.appState.lang);
  moment.locale(lang);
  const HistoryActivityCard = ({item, index}) => {
    const scale = scrollY.interpolate({
      inputRange: [
        -1,
        0,
        (CardHeight / 0.8) * index,
        (CardHeight / 0.8) * (index + 1),
      ],
      outputRange: [1, 1, 1, 0.5],
    });
    return (
      <ActivityCard
        item={item}
        onPress={() => {
          navigation.navigate('ActivityHistory', {
            userActivity: item,
          });
        }}
        scale={scale}>
        <View style={{position: 'absolute', bottom: 20, left: 20}}>
          <Text style={[FONTS.h4, {color: '#fff'}]}>
            {item.activity.id.title}
          </Text>
          <Text style={[FONTS.h1, {color: '#fff'}]}>
            {moment(item.activity.id.actual_date).format('DD MMMM YYYY')}
          </Text>
        </View>
      </ActivityCard>
    );
  };

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <MenuButton />
      {activities.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[FONTS.h2, {color: COLORS.primary}]}>
            {t('history.noactivity')}
          </Text>
        </View>
      ) : (
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          data={activities}
          keyExtractor={(item) => `${item._id}`}
          renderItem={({item, index}) => {
            return <HistoryActivityCard item={item} index={index} />;
          }}
          ItemSeparatorComponent={() => <View style={{margin: 10}} />}
          style={{padding: 20, paddingTop: 60}}
          ListFooterComponent={() => (
            <View style={{marginBottom: CardHeight * 2}} />
          )}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
        />
      )}
    </View>
  );
};

export default HistoryActivityScreen;

const styles = StyleSheet.create({});
