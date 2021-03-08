import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import {SIZES, FONTS, COLORS} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';
import Markdown from 'react-native-markdown-display';
import Button from '../Button';
import LocalizationContext from '../../screens/LocalizationContext';

const TermsAndConditionsModal = ({open, handleClose, data, setAcceptTerm}) => {
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
    contentConvert(data);
  }, []);

  return (
    <Modal
      isVisible={open}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      avoidKeyboard
      onSwipeComplete={handleClose}
      useNativeDriverForBackdrop
      swipeDirection={['down']}>
      <View
        style={{
          height: SIZES.height / 1.5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{padding: 20}}>
            <View style={{marginBottom: 20}}>
              <Text style={[FONTS.h2, {textAlign: 'center'}]}>
                {t('activity.conditionandterms')}
              </Text>
            </View>
            <Markdown>{detail}</Markdown>
            <View
              style={{
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Button
                label={t('activity.accept')}
                color={COLORS.pinkPastel}
                onPress={() => {
                  setAcceptTerm(true);
                  handleClose();
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default TermsAndConditionsModal;

const styles = StyleSheet.create({});
