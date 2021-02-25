import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SHADOW} from '../../../constants';
import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {checkTimeFromPast, shortText} from '../../../services/util';
import {Fragment} from 'react';
import LocalizationContext from '../../../screens/LocalizationContext';

const CommentCard = ({item, index}) => {
  const {t} = React.useContext(LocalizationContext);
  const [text, setText] = useState('');
  const [seeAll, setSeeAll] = useState(false);
  const lang = useSelector((state) => state.appState.lang);

  useEffect(() => {
    if (item.text.length > 150) {
      setText(shortText(item.text, 150));
      setSeeAll(true);
    } else {
      setText(item.text);
    }
  }, []);

  const handleSeeAll = () => {
    setText(item.text);
  };
  const handleSeeLess = () => {
    setText(shortText(item.text, 150));
  };
  return (
    <Fragment>
      <View
        style={[
          {
            marginVertical: 5,
            backgroundColor: COLORS.white,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            marginBottom: !seeAll ? 20 : 0,
          },
        ]}>
        <View>
          <Avatar
            rounded
            source={{
              uri: item.user.user_picture_url,
            }}
            containerStyle={{backgroundColor: '#fff', marginRight: 5}}
            size={60}
          />
        </View>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[FONTS.h3]}>{item.user.display_name}</Text>
            <Text style={[FONTS.body3]}>
              {checkTimeFromPast(item.createdAt)}
            </Text>
          </View>
          <View>
            <Text style={[FONTS.body3]}>{text}</Text>
          </View>
          {seeAll && (
            <Fragment>
              <View style={{alignItems: 'flex-end'}}>
                {text.length === 153 ? (
                  <TouchableOpacity activeOpacity={0.8} onPress={handleSeeAll}>
                    <Text style={[FONTS.body4]}>
                      {t('community.comment.seeall')}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity activeOpacity={0.8} onPress={handleSeeLess}>
                    <Text style={[FONTS.body4]}>
                      {t('community.comment.seeless')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </Fragment>
          )}
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 0.5,
          width: '80%',
          alignSelf: 'center',
          borderColor: 'rgba(0,0,0,0.3)',
        }}
      />
    </Fragment>
  );
};

export default CommentCard;
