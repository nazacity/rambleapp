import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import {COLORS, FONTS, SHADOW, SIZES} from '../../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import LocalizationContext from '../../../screens/LocalizationContext';
import {postSocial} from '../../../redux/actions/request';
import {Snackbar} from 'react-native-paper';

const CommentTab = ({setOpen, bottom, id, setData}) => {
  const [value, setValue] = useState('');
  const {t} = React.useContext(LocalizationContext);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const setErrorMessage = (msg) => {
    setError(true);
    setMessage(msg);
  };

  const handleComment = async () => {
    try {
      const res = await postSocial(`/api/users/createblogcomment/${id}`, {
        text: value,
      });

      if (res.status === 200) {
        setData(res.data);
        setValue('');
      }
      setErrorMessage(t('community.comment.commented'));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
      }}>
      <View
        style={[
          {
            backgroundColor: COLORS.white,
            padding: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>
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
          onPress={handleComment}>
          <MaterialIcons
            name="add-circle-outline"
            size={24}
            color={!value ? COLORS.inputPlaceholderColor : COLORS.primary}
          />
        </TouchableOpacity>
        {setOpen && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{width: 30, height: 30}}
            onPress={() => {
              setOpen(true);
            }}>
            <MaterialIcons name="more-vert" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
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
    </KeyboardAvoidingView>
  );
};

export default CommentTab;
