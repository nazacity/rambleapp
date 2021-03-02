import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import MenuButton from '../../components/layout/MenuButton';
import {COLORS, FONTS} from '../../constants';
import OwnerUserPostCard from '../../components/card/OwnerUserPostCard';
import LocalizationContext from '../LocalizationContext';

const UserPostScreen = () => {
  const {t} = React.useContext(LocalizationContext);
  const user_posts = useSelector((state) => state.user.user_posts);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        paddingTop: 60,
      }}>
      <MenuButton />
      {user_posts.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[FONTS.h2, {color: COLORS.primary}]}>
            {t('userpost.nopost')}
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={user_posts}
          keyExtractor={(item) => `${item._id}`}
          renderItem={({item, index}) => {
            return (
              <OwnerUserPostCard item={item} index={index} editState={true} />
            );
          }}
          ItemSeparatorComponent={() => <View style={{margin: 10}} />}
          style={{padding: 20}}
          contentContainerStyle={{paddingHorizontal: 5}}
          ListFooterComponent={() => <View style={{marginBottom: 50}} />}
        />
      )}
    </View>
  );
};

export default UserPostScreen;

const styles = StyleSheet.create({});
