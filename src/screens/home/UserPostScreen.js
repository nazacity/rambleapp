import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import MenuButton from '../../components/layout/MenuButton';
import {COLORS, FONTS} from '../../constants';
import OwnerUserPostCard from '../../components/card/OwnerUserPostCard';
import LocalizationContext from '../LocalizationContext';
import {ActivityIndicator} from 'react-native-paper';

const UserPostScreen = () => {
  const {t} = React.useContext(LocalizationContext);
  const user_posts = useSelector((state) => state.user.user_posts);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const filterUserPosts = () => {
    setLoading(true);
    const filtered = user_posts.filter((item) => {
      return (
        item.activity.state === 'registering' ||
        item.activity.state === 'end_register'
      );
    });

    setData(filtered);
    setLoading(false);
  };

  useEffect(() => {
    filterUserPosts();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        paddingTop: 60,
      }}>
      <MenuButton />
      {loading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => `${item._id}`}
        renderItem={({item, index}) => {
          return (
            <OwnerUserPostCard item={item} index={index} editState={true} />
          );
        }}
        ItemSeparatorComponent={() => <View style={{margin: 10}} />}
        style={{padding: 20}}
        contentContainerStyle={{paddingHorizontal: 5}}
        ListFooterComponent={() => (
          <View style={{marginBottom: 50}}>
            {data.length === 0 && !loading && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={[FONTS.h2, {color: COLORS.primary}]}>
                  {t('userpost.nopost')}
                </Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default UserPostScreen;

const styles = StyleSheet.create({});
