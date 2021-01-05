import React, {Fragment} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import BackButton from '../../components/layout/BackButton';
import HeaderImage from '../../components/activity/HeaderImage';
import {COLORS} from '../../constants';

const WebViewScreen = ({route}) => {
  const {uri} = route.params;
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: uri}}
        showsVerticalScrollIndicator={false}
        startInLoadingState={true}
        renderLoading={() => (
          <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={{
              color: '#FFF',
            }}
            color={COLORS.primary}
          />
        )}
      />
    </View>
  );
};

export default WebViewScreen;
