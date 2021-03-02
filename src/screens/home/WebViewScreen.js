import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import {COLORS} from '../../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import BackButton from '../../components/layout/BackButton';

const WebViewScreen = ({route}) => {
  const {uri} = route.params;
  return (
    <View style={{flex: 1}}>
      <BackButton />
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
