import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {loadSocial} from '../../redux/actions/SocialAction';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {socialurl} from '../../redux/actions/request';
import axios from 'axios';
import MainSlide from '../../components/blog/MainSlides';
import SocialFlatlist from '../../components/blog/social/SocialFlatlist';
import {ScrollView} from 'react-native';
import {COLORS} from '../../constants';

const CommunityScreen = ({navigation}) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  // const setupSocket = async () => {
  //   const token = await AsyncStorage.getItem('accessToken');
  //   if (token && !socket) {
  //     const newSocket = io(socialurl, {
  //       query: {
  //         token: token,
  //       },
  //     });

  //     newSocket.on('disconnect', () => {
  //       setSocket(null);
  //       setTimeout(setupSocket, 3000);
  //     });

  //     newSocket.on('connect', () => {
  //       console.log('successed');
  //     });

  //     setSocket(newSocket);
  //   }
  // };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setupSocket();
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <ScrollView
      style={{backgroundColor: COLORS.backgroundColor}}
      showsVerticalScrollIndicator={false}>
      <MainSlide />
      <View>
        <View style={{margin: 20}}>
          <Text>Social</Text>
        </View>
        <SocialFlatlist />
        <View style={{margin: 10}} />
      </View>
    </ScrollView>
  );
};

export default CommunityScreen;
