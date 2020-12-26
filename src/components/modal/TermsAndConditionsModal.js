import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import {SIZES, FONTS, COLORS} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';
import Markdown from 'react-native-markdown-display';
import Button from '../Button';
import LocalizationContext from '../../screens/LocalizationContext';

const TermsAndConditionsModal = ({open, handleClose, data, setAcceptTerm}) => {
  const {t} = React.useContext(LocalizationContext);
  const contentConvert = (textObject) => {
    let content = '';
    for (const [key, value] of Object.entries(textObject)) {
      content += value;
    }
    return content;
  };
  return (
    <Modal
      isVisible={open}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={handleClose}>
      <View
        style={{
          height: SIZES.height / 1.5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          padding: 20,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: 20}}>
            <Text style={[FONTS.h2, {textAlign: 'center'}]}>
              {t('activity.conditionandterms')}
            </Text>
          </View>
          <Markdown>{contentConvert(data[0])}</Markdown>
          <View
            style={{
              alignItems: 'center',
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
        </ScrollView>
      </View>
    </Modal>
  );
};

export default TermsAndConditionsModal;

const styles = StyleSheet.create({});
