import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Text,
} from 'react-native';
// import {useSelector} from 'react-redux';

import {FONTS, COLORS, SIZES} from '../../constants';
// import LocalizationContext from '../LocalizationContext';
import CreatePostForm from '../../components/form/CreatePostForm';
import {HeaderBackButton} from '@react-navigation/stack';

const CreatePostScreen = ({navigation, route}) => {
  const {activity} = route.params;
  // const lang = useSelector((state) => state.appState.lang);
  // const {t} = React.useContext(LocalizationContext);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          {
            borderBottomRightRadius: 75,
            backgroundColor: COLORS.pinkPastel,
          },
        ]}>
        <View style={{position: 'absolute', top: 10}}>
          <HeaderBackButton
            tintColor="#fff"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={{marginVertical: 20, borderRadius: 10}}>
          <Image
            source={{uri: activity.activity_picture_url}}
            style={{
              alignSelf: 'center',
              width: 300,
              height: 200,
              resizeMode: 'contain',
              borderRadius: 10,
            }}
          />
        </View>
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: COLORS.pinkPastel,
          }}></View>
        <CreatePostForm title={activity.title} />
      </View>
    </ScrollView>
  );
};

export default CreatePostScreen;
