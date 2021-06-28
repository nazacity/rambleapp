import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {setPDPAModal} from '../../redux/actions/AppStateAction';
import Button from '../Button';
import LocalizationContext from '../../screens/LocalizationContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PDPAModal = ({closable}) => {
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  const open = useSelector((state) => state.PDPA);
  const handleClose = () => {
    dispatch(setPDPAModal(false));
  };
  return (
    <Modal
      isVisible={open}
      style={{margin: 0}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}>
      {closable && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            position: 'absolute',
            zIndex: 100,
            top: 10,
            right: 10,
          }}
          onPress={() => {
            handleClose();
          }}>
          <MaterialIcons name="cancel" color={COLORS.buttonBlue} size={24} />
        </TouchableOpacity>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: COLORS.backgroundColor, padding: 20}}>
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.h1]}>ความยินยอมข้อมูลส่วนบุคคลของท่าน</Text>
          <Text style={[FONTS.body3]}>
            Ramble พัฒนา Platform
            และระบบของเราอยู่ตลอดเวลาเพื่อให้เชื่อมต่อกับผู้ใช้งานได้เข้าสู่สิ่งดีๆได้ดียิ่งขึ้น
            และส่วนสำคัญที่เราใช้พัฒนาระบบ คือ ข้อมูลต่างๆ
          </Text>
          <Text style={[FONTS.body3]}>
            ในขณะเดียวกัน Ramble ให้ความสำคัญต่อความเป็นส่วนตัว
            เราจะทำงานอย่างดีที่สุดเพื่อรักษาความลับ
            และควบคุมข้อมูลส่วนบุคคลของท่านให้ปลอดภัย
            โดยที่ท่านสามารถเลือกที่จะให้หรือไม่ให้ความยินยอมก็ได้
            โดยความยินยอมและการจัดการข้อมูลส่วนบุคคลจะถูกแบ่งเป็น 3 หัวข้อ
            เพื่อให้สิทธิอย่างเต็มที่
          </Text>
          <Text style={[FONTS.body3, {marginLeft: 20}]}>
            1.ความยินยอมในการอำนวยความสะดวก และพัฒนาการใช้บริการ
          </Text>
          <Text style={[FONTS.body3, {marginLeft: 20}]}>
            2.ความยินยอมในการให้เสนอ และแจกสินค้า บริการ และโปรโมชั่นพิเศษต่างๆ
          </Text>
          <Text style={[FONTS.body3, {marginLeft: 20}]}>
            3.ความยินยอมในการทำการตลาด โฆษณา และนำเสนอสินค้า
            หรือบริการแบบคัดสรรสำหรับท่าน
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.h1]}>
            ความยินยอมในการอำนวยความสะดวก และพัฒนาการใช้บริการ
          </Text>
          <Text style={[FONTS.body3]}>
            เพื่อให้ท่านใช้งานได้สะดวก ตรงตามต้องการมากขึ้น
            เราอาจเก็บข้อมูลของท่าน และนำมาวิเคราะห์ เพื่อปรับปรุงบริการของเรา
            รวมไปถึงการอำนวยความสะดวก
            เพื่อให้ประสบการณ์ใช้งานของท่านใช้งานที่รวดเร็วยิ่งขึ้น
            ตอบสนองต่อความต้องการ และเพื่อความพึงพอใจของท่าน ท่านยินยอมให้
            Ramble เก็บรวบรวมข้อมูล นำไปใช้
            และเปิดเผยข้อมูลของท่านเพื่อจุดประสงค์ที่กล่าวมาข้างต้น
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.h1]}>
            ความยินยอมในการให้เสนอ และแจกสินค้า บริการ และโปรโมชั่นพิเศษต่างๆ
          </Text>
          <Text style={[FONTS.body3]}>
            เพื่อให้ท่านได้รับส่วนลด โปรโมชั่น สิทธิพิเศษ หรือบริการต่างๆ ของ
            Ramble หรือบริษัทนาซ่า ซิตี้ จำกัด และพันธมิตรคู่ค้าของเรา
            คุณยินยอมให้ Ramble เก็บรวบรวม นำไปใช้ และเปิดเผยข้อมูลของท่าน
            เพื่อจุดประสงค์ที่กล่าวมาข้างต้น
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={[FONTS.h1]}>
            ความยินยอมในการทำการตลาด โฆษณา และนำเสนอสินค้า
            หรือบริการแบบคัดสรรสำหรับท่าน
          </Text>
          <Text style={[FONTS.body3]}>
            เพื่อให้คุณได้รับข้อเสนอ โปรโมชัน เนื้อหา สิ้นค้า
            หรือบริการที่คัดสรร สำหรับท่านดดยเฉพาะ และเพื่อปรับปรุง
            และพัฒนาการให้บริการให้มีความทันสมัย และตอบโจทย์ของท่านมากยิ่งขึ้น
            เราอาจเก็บข้อมูลของท่านมาวิเคราะห์ รวมถึงทำการโฆษณาต่างๆ
            ท่านยินยอมให้ Ramble เก็บรวบรวม นำไปใช้ และเปิดเผยข้อมูลของท่าน
            เพื่อจุดประสงค์ที่กล่าวมาข้างต้น
          </Text>
        </View>
        {!closable && (
          <View style={{alignItems: 'center', marginBottom: 50}}>
            <Button
              width={200}
              label={t('signup.agree')}
              color={COLORS.pinkPastel}
              onPress={handleClose}
            />
          </View>
        )}
      </ScrollView>
    </Modal>
  );
};

export default PDPAModal;
