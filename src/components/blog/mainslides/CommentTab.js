import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {COLORS, FONTS, SHADOW, SIZES} from '../../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import LocalizationContext from '../../../screens/LocalizationContext';

const CommentTab = ({setOpen, onSubmit}) => {
  const [value, setValue] = useState('');
  const {t} = React.useContext(LocalizationContext);
  return (
    <View
      style={[
        {
          width: SIZES.width - 40,
          backgroundColor: COLORS.white,
          borderRadius: 5,
          alignSelf: 'center',
          position: 'absolute',
          bottom: 10,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 100,
        },
        SHADOW.default,
      ]}>
      <View style={{flex: 1}}>
        <Input
          placeholder={t('community.comment.commentblog')}
          inputContainerStyle={{borderBottomWidth: 0}}
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
        onSubmit={onSubmit}>
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
  );
};

export default CommentTab;
