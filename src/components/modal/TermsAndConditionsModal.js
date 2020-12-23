import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import {SIZES, FONTS, COLORS} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';

import Button from '../Button';

const TermsAndConditionsModal = ({open, handleClose, data, setAcceptTerm}) => {
  return (
    <Modal
      isVisible={open}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={handleClose}>
      <View
        style={{
          height: SIZES.height / 2,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          padding: 20,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: 20}}>
            <Text style={[FONTS.h2, {textAlign: 'center'}]}>
              เงื่อนไข และข้อตกลง
            </Text>
          </View>
          {data.map((item) => {
            return (
              <View key={item.id} style={{marginBottom: 20}}>
                <Text style={[FONTS.body4, {textAlign: 'center'}]}>
                  {item.description}
                </Text>
              </View>
            );
          })}
          <View
            style={{
              alignItems: 'center',
            }}>
            <Button
              label="ลงทะเบียน"
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
