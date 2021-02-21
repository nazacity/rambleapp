import React, {Fragment} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

//import MinorAdvertise from '../../components/advertise/MinorAdvertise';

import {FONTS, COLORS} from '../../constants';
import FilterButton from '../../components/layout/FilterButton';
import {useSelector} from 'react-redux';
import LocalizationContext from '../LocalizationContext';
import Button from '../../components/Button';
import BackButton from '../../components/layout/BackButton';
import UserPostCard from '../../components/card/UserPostCard';

const FilteredCommunityScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const user_posts = useSelector(
    (state) => state.community.filtered_user_posts,
  );
  const isLoading = useSelector((state) => state.appState.isLoading);
  const lang = useSelector((state) => state.appState.lang);

  const UserPostContainer = ({item, index}) => {
    return (
      <Fragment>
        <UserPostCard item={item} />

        {/* {(index + 1) % 5 === 0 && <MinorAdvertise />} */}
      </Fragment>
    );
  };

  if (user_posts.length === 0 && !isLoading) {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: COLORS.backgroundColor,
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text style={[FONTS.h2]}>{t('communityfilter.nouserpost')}</Text>
        <Button
          label={t('communityfilter.clickhere')}
          color={COLORS.pinkPastel}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: COLORS.backgroundColor,
        flex: 1,
        paddingTop: 60,
      }}>
      <BackButton backTo={'Community'} />
      <FilterButton onPress={() => navigation.navigate('CommunityFilter')} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={user_posts}
        keyExtractor={(item) => `${item._id}`}
        renderItem={({item, index}) => {
          return <UserPostContainer item={item} index={index} />;
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{borderBottomColor: COLORS.primary, borderBottomWidth: 2}}
          />
        )}
      />
    </View>
  );
};

export default FilteredCommunityScreen;

const styles = StyleSheet.create({});
