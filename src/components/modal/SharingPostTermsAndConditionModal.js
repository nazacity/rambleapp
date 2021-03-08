import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import {SIZES, FONTS, COLORS} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';
import Markdown from 'react-native-markdown-display';
import Button from '../Button';
import LocalizationContext from '../../screens/LocalizationContext';

const SharingPostTermsAndConditionsModal = ({
  open,
  handleClose,
  setAcceptTerm,
}) => {
  const {t} = React.useContext(LocalizationContext);

  return (
    <Modal
      isVisible={open}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
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
            <View>
              <Text style={[FONTS.body4]}>
                1. ข้าพเจ้ายินดีเปิดเผยข้อมูล
                สำหรับการติดต่อเพื่อจุดประสงค์ในการแชร์ริ่ง
              </Text>
              <Text style={[FONTS.body4]}>
                2. ข้าพเจ้ายอมรับว่าการตกลงการแชร์ริ่งเป็นไประหว่างตัวข้าพ
                และผู้ใช้งานท่านอื่นเอง แพลตฟอร์มทำหน้าที่เป็นตัวกลางเท่านั้น
                ไม่ได้มีส่วนได้ส่วนเสียกับเหตุการณ์ที่จะเกิดขึ้น
              </Text>
              <Text style={[FONTS.body4]}>
                3. ข้าพเจ้ายินดีให้แพลตฟอร์มเปิดเผยข้อมูลผู้ใช้งานได้
                หากมีเหตุจำเป็น เช่น มีการเรียกร้องจากผู้ใช้งานท่านอื่นๆ
                ที่ได้รับการยืนยันการจากแจ้งความ เป็นต้น
              </Text>
              <Text style={[FONTS.body4]}>
                4. ข้าพเจ้ายอมรับว่า
                แพลตฟอร์มไม่มีส่วนเกี่ยวข้องในการรับผิดชอบต่อเหตุการณ์ที่จะเกิดขึ้น
              </Text>
            </View>

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

export default SharingPostTermsAndConditionsModal;

const styles = StyleSheet.create({});
