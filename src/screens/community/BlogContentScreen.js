import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {WebView} from 'react-native-webview';
import LoveButton from '../../components/blog/layout/LoveButton';
import CommentModal from '../../components/blog/mainslides/CommentModal';
import CommentTab from '../../components/blog/mainslides/CommentTab';
import BackButton from '../../components/layout/BackButton';
import {COLORS, SIZES} from '../../constants';

const BlogContentScreen = ({navigation, route}) => {
  const {uri} = route.params;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  if (Platform.OS === 'ios') {
    return (
      <ScrollView
        style={{backgroundColor: COLORS.white}}
        showsVerticalScrollIndicator={false}>
        <BackButton />
        <LoveButton top={40} size={30} />
        <View
          style={{
            height: Platform.OS === 'ios' ? SIZES.height : SIZES.height - 60,
          }}>
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

          <CommentTab setOpen={setOpen} bottom={100} />
        </View>

        <CommentModal open={open} handleClose={handleClose} />
      </ScrollView>
    );
  }

  return (
    <View
      style={{backgroundColor: COLORS.white, flex: 1}}
      showsVerticalScrollIndicator={false}>
      <BackButton />
      <LoveButton top={40} size={30} />
      <View
        style={{
          height: Platform.OS === 'ios' ? SIZES.height : SIZES.height - 60,
        }}>
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
      <CommentTab setOpen={setOpen} bottom={20} />

      <CommentModal open={open} handleClose={handleClose} />
    </View>
  );
};

export default BlogContentScreen;
