import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {COLORS, SHADOW, SIZES} from '../../../constants';
import FloatingLabelInput from '../../floatinglabelinput/FloatingLabelInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';

const CommentTab = ({setOpen}) => {
  const [value, setValue] = useState('');
  return (
    <View
      style={[
        {
          width: SIZES.width - 40,
          backgroundColor: COLORS.white,
          borderRadius: 5,
          height: 70,
          alignSelf: 'center',
          position: 'absolute',
          bottom: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 100,
        },
        SHADOW.default,
      ]}>
      <View style={{flex: 1}}>
        <FloatingLabelInput
          placeholder="Type something..."
          inputContainerStyle={{borderBottomWidth: 0}}
          onChangeText={(text) => {
            setValue(text);
          }}
          value={value}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{width: 30, height: 30, marginHorizontal: 10}}>
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
