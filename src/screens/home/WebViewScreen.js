import React, {Fragment} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import BackButton from '../../components/layout/BackButton';
import HeaderImage from '../../components/activity/HeaderImage';

const WebViewScreen = ({route}) => {
  const {uri} = route.params;
  return (
    <View style={{flex: 1}}>
      <WebView source={{uri: uri}} showsVerticalScrollIndicator={false} />
    </View>
  );
};

export default WebViewScreen;
