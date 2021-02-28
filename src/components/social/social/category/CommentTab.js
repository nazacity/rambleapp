import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import {COLORS, FONTS, SHADOW, SIZES} from '../../../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import LocalizationContext from '../../../../screens/LocalizationContext';

const CommentTab = ({setOpen, onSubmit, bottom}) => {
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
        zIndex: 100,
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
        <View style={{flex: 1}}>
          <Input
            placeholder={t('community.socialcomment.commentpost')}
            inputContainerStyle={{
              borderBottomWidth: 0,
              top: Platform.OS === 'ios' ? 5 : 0,
            }}
            onChangeText={(text) => {
              setValue(text);
            }}
            value={value}
            multiline
            containerStyle={{
              backgroundColor: COLORS.lightGrey,
              borderRadius: 5,
              height: value.length > 30 ? undefined : 50,
              borderColor: COLORS.black,
              borderWidth: 0.5,
              borderRadius: 5,
            }}
            style={[FONTS.body3]}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{width: 30, height: 30, marginLeft: 10}}
          onPress={() => onSubmit(value, setValue)}>
          <MaterialIcons
            name="add-circle-outline"
            size={24}
            color={COLORS.inputPlaceholderColor}
          />
        </TouchableOpacity>
        {setOpen && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{width: 30, height: 30}}
            onPress={() => {
              setOpen(true);
            }}>
            <MaterialIcons
              name="more-vert"
              size={24}
              color={COLORS.inputPlaceholderColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentTab;
