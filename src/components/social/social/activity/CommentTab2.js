import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, Alert} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import LocalizationContext from '../../../../screens/LocalizationContext';
import {postSocial} from '../../../../redux/actions/request';
import {Snackbar} from 'react-native-paper';
import {COLORS, FONTS} from '../../../../constants';
import LinearGradient from 'react-native-linear-gradient';

const CommentTab = ({onSubmit, bottom}) => {
  const [value, setValue] = useState('');
  const {t} = React.useContext(LocalizationContext);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const setErrorMessage = (msg) => {
    setError(true);
    setMessage(msg);
  };

  return (
    <View
      style={[
        {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        },
      ]}>
      <LinearGradient
        colors={['rgba(255,255,255,0.0)', 'rgba(255,255,255,1)']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        useAngle
        angle={180}
        style={{
          height: 20,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: COLORS.white,
          padding: 10,
          paddingHorizontal: 20,
        }}>
        <View style={{flex: 1}}>
          <Input
            placeholder={t('community.comment.commentblog')}
            inputContainerStyle={{
              borderBottomWidth: 0,
              top: Platform.OS === 'ios' ? 5 : 0,
            }}
            onChangeText={(text) => {
              if (text.length > 500) {
                Alert.alert(t('community.comment.textmorethan'), '', [
                  {
                    text: t('community.comment.okay'),
                    onPress: () => console.log('okay'),
                  },
                ]);
              } else {
                setValue(text);
              }
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
          <Text style={[FONTS.body4, {textAlign: 'right'}]}>
            {value.length} / 500
          </Text>
        </View>
        <TouchableOpacity
          disabled={!value}
          activeOpacity={0.8}
          style={{width: 30, height: 30, marginLeft: 10}}
          onPress={() => onSubmit(value, setValue)}>
          <MaterialIcons
            name="add-circle-outline"
            size={24}
            color={!value ? COLORS.inputPlaceholderColor : COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <Snackbar
        visible={error}
        onDismiss={() => {
          setError(false);
        }}
        style={{
          backgroundColor: '#5cb85c',
        }}
        duration={1500}>
        {message}
      </Snackbar>
    </View>
  );
};

export default CommentTab;
