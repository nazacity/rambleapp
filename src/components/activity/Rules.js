import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {FONTS, COLORS} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';
import Markdown from 'react-native-markdown-display';

const Rules = ({activity}) => {
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
    contentConvert(activity.rules1);
  }, []);

  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activity.rules')} />
      <View style={{paddingLeft: 20}}>
        <Markdown>{detail}</Markdown>
      </View>
    </View>
  );
};

export default Rules;
