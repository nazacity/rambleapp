import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import {COLORS, FONTS, SHADOW, SIZES} from '../../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import LocalizationContext from '../../../screens/LocalizationContext';

const SocialCommentTab = ({setOpen, onSubmit, bottom}) => {
  const [value, setValue] = useState('');
  const {t} = React.useContext(LocalizationContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      style={{
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: bottom ? bottom : 0,
        zIndex: 1500,
      }}>
      <View
        style={[
          {
            backgroundColor: COLORS.white,
            borderRadius: 5,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
          },
          SHADOW.default,
        ]}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{width: 30, height: 30}}
          onPress={() => {
            setOpen(true);
          }}>
          <Ionicons
            name="image-outline"
            size={24}
            color={COLORS.inputPlaceholderColor}
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: COLORS.lightGrey,
              borderRadius: 5,
              height: value.length > 30 ? undefined : 50,
              borderColor: COLORS.black,
              borderWidth: 0.5,
              borderRadius: 5,
              justifyContent: 'center',
              paddingLeft: 10,
            }}
            onPress={() => {
              setOpen(true);
            }}>
            <Text style={[FONTS.body3, {color: COLORS.inactiveColor}]}>
              {t('community.socialcomment.post')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SocialCommentTab;
