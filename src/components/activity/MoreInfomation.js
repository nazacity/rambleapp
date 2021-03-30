import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FONTS, COLORS} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';
import Markdown from 'react-native-markdown-display';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Linking} from 'react-native';

const MoreInfomation = ({activity}) => {
  const {t} = React.useContext(LocalizationContext);
  const [detail, setDetail] = useState('');

  const contentConvert = (textObject) => {
    let content = '';
    for (const [key, value] of Object.entries(textObject)) {
      content += value;
    }
    setDetail(content);
  };

  useEffect(() => {
    contentConvert(activity.more_detail);
  }, []);

  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activity.moredetail')} />
      <View style={{paddingLeft: 20}}>
        <Markdown>{detail}</Markdown>
      </View>
      <TitleHeader title={t('activity.contactorganizer')} />
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 20,
        }}>
        {activity.contact?.phone_number && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: 40,
              height: 40,
              backgroundColor: COLORS.pinkPastel,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
              marginRight: 10,
              borderRadius: 50,
            }}
            onPress={() => {
              Linking.openURL(`tel:${activity.contact.phone_number}`);
            }}>
            <FontAwesome name="phone" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        {activity.contact?.line && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: 40,
              height: 40,
              backgroundColor: COLORS.pinkPastel,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
              marginRight: 10,
              borderRadius: 50,
            }}
            onPress={() => {
              Linking.openURL(`http://line.me/ti/p/~${activity.contact.line}`);
            }}>
            <Fontisto name="line" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        {activity.contact?.facebook && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: 40,
              height: 40,
              backgroundColor: COLORS.pinkPastel,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}
            onPress={() => {
              Linking.openURL(`${activity.contact.facebook}`);
            }}>
            <Fontisto name="facebook" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MoreInfomation;
