import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

const UserPostScreen = () => {
  const user_posts = useSelector((state) => state.user.user_posts);
  console.log(user_posts);
  return (
    <View>
      <Text>UserPostScreen</Text>
    </View>
  );
};

export default UserPostScreen;

const styles = StyleSheet.create({});
