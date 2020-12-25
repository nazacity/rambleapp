import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {get} from '../../redux/actions/request';
import ActivityCard from '../../components/activity/ActivityCard';
import MenuButton from '../../components/layout/MenuButton';
import moment from 'moment';
import 'moment/locale/th';
import {FONTS, COLORS, SIZES} from '../../constants';
import {FlatList} from 'react-native-gesture-handler';
import FilterButton from '../../components/layout/FilterButton';
import LinearGradient from 'react-native-linear-gradient';
import {listUserPostsByActivity} from '../../redux/actions/CommunityAction';
import LocalizationContext from '../LocalizationContext';

const CardSize = SIZES.width - 80;
const CardHeight = ((SIZES.width - 80) * 2) / 3;

const SelectActivityScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const user_activities = useSelector((state) => state.user.user_activities);
  const lang = useSelector((state) => state.appState.lang);
  moment.locale(lang);
  const dispatch = useDispatch();
  const [activities, setActivities] = useState([]);

  const checkActivityState = () => {
    let data = [];
    user_activities.map((item) => {
      if (
        item.activity.id.state === 'pre_register' ||
        item.activity.id.state === 'registering' ||
        item.activity.id.state === 'end_register'
      ) {
        data.push(item);
      }
    });

    setActivities(data);
  };

  const navigateUser = () => {
    navigation.navigate('Community');
  };

  const fetchUserPosts = (id) => {
    dispatch(listUserPostsByActivity(id, navigateUser));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkActivityState();
    });

    return unsubscribe;
  }, [user_activities]);

  const UserActivityCard = ({item, index}) => {
    return (
      <ActivityCard
        item={item}
        onPress={() => {
          fetchUserPosts(item.activity.id._id);
        }}>
        <View style={{position: 'absolute', bottom: 20, left: 20}}>
          <Text style={[FONTS.h4, {color: '#fff'}]}>
            {item.activity.id.title}
          </Text>
          <Text style={[FONTS.h1, {color: '#fff'}]}>
            {moment(item.activity.id.actual_date).fromNow()}
          </Text>
        </View>
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
      <FilterButton onPress={() => navigation.navigate('CommunityFilter')} />
      {activities.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[FONTS.h2, {color: COLORS.primary}]}>
            {t('community.noactivity')}
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={activities}
          keyExtractor={(item) => `${item._id}`}
          renderItem={({item, index}) => {
            return <UserActivityCard item={item} index={index} />;
          }}
          ItemSeparatorComponent={() => <View style={{margin: 10}} />}
          style={{padding: 20, paddingTop: 60}}
          ListFooterComponent={() => <View style={{margin: 50}} />}
        />
      )}
    </View>
  );
};

export default SelectActivityScreen;
