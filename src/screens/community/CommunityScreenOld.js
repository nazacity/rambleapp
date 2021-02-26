import React, {Fragment} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';

import MinorAdvertise from '../../components/advertise/MinorAdvertise';
import {FONTS, COLORS, SIZES} from '../../constants';

import LocalizationContext from '../LocalizationContext';
import FilterButton from '../../components/layout/FilterButton';
import {useSelector} from 'react-redux';
import UserPostCard from '../../components/card/UserPostCard';
import BackButton from '../../components/layout/BackButton';

const CommunityScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const user_posts = useSelector(
    (state) => state.community.user_post_by_activity,
  );

  const CommunityCard = ({item, index}) => {
    return (
      <Fragment>
        <UserPostCard item={item} />
        {/* {(index + 1) % 5 === 0 && <MinorAdvertise />} */}
      </Fragment>
    );
  };

  return (
    <View style={{backgroundColor: COLORS.backgroundColor, flex: 1}}>
      <BackButton />
      <FilterButton onPress={() => navigation.navigate('CommunityFilter')} />
      {user_posts.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[FONTS.h2, {color: COLORS.primary}]}>
            {t('community.nopost')}
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={user_posts}
          keyExtractor={(item) => item._id}
          renderItem={({item, index}) => {
            return <CommunityCard item={item} index={index} />;
          }}
          ItemSeparatorComponent={() => <View style={{padding: 10}} />}
          style={{padding: 20, paddingTop: 60}}
          contentContainerStyle={{paddingHorizontal: 5}}
          ListFooterComponent={() => <View style={{marginBottom: 50}} />}
        />
      )}
    </View>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({});
