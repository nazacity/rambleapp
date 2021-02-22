import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, SHADOW, SIZES} from '../../../constants';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-elements';
import {Image} from 'react-native';
import {checkTimeFromPast} from '../../../services/util';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import relativeTime from 'dayjs/plugin/relativeTime';
import LoveButton from './LoveButton';
import {t} from 'i18n-js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommentModal from './CommentModal';

dayjs.extend(relativeTime);

const SocialFlatlist = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const data = [
    {
      _id: '1',
      user_picture_url: 'https://img.kapook.com/u/2019/jutharat/w1/za23_8.jpg',
      display_name: 'Ramble',
      text:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      pictures: [
        {
          _id: '1',
          url:
            'https://images.unsplash.com/photo-1600712662084-e54770a9668e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        },
      ],
      createdAt: new Date('2021-01-21'),
    },
    {
      _id: '2',
      user_picture_url: 'https://img.kapook.com/u/2019/jutharat/w1/za23_8.jpg',
      display_name: 'Ramble',
      text:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has',
      pictures: [
        {
          _id: '1',
          url:
            'https://images.unsplash.com/photo-1600712662084-e54770a9668e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        },
        {
          _id: '2',
          url:
            'https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80',
        },
        {
          _id: '3',
          url:
            'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80',
        },
      ],
      createdAt: new Date('2021-02-21'),
    },
    {
      _id: '3',
      user_picture_url: 'https://img.kapook.com/u/2019/jutharat/w1/za23_8.jpg',
      display_name: 'Ramble',
      text:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ',
      pictures: [
        {
          _id: '2',
          url:
            'https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80',
        },
        {
          _id: '3',
          url:
            'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80',
        },
      ],
      createdAt: new Date('2021-02-11'),
    },
    {
      _id: '4',
      user_picture_url: 'https://img.kapook.com/u/2019/jutharat/w1/za23_8.jpg',
      display_name: 'Ramble',
      text:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ',
      pictures: [],
      createdAt: new Date('2021-02-15'),
    },
    {
      _id: '5',
      user_picture_url: 'https://img.kapook.com/u/2019/jutharat/w1/za23_8.jpg',
      display_name: 'Ramble',
      text:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has',
      pictures: [
        {
          _id: '1',
          url:
            'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80',
        },
        {
          _id: '2',
          url:
            'https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80',
        },
      ],
      createdAt: new Date('2021-02-22'),
    },
  ];

  const SocialPostCard = ({item, index}) => {
    return (
      <View
        style={[
          {
            borderRadius: 10,
            overflow: 'hidden',
            backgroundColor: COLORS.white,
            padding: 10,
          },
          SHADOW.image,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar rounded source={{uri: item.user_picture_url}} size={40} />
            <View style={{marginLeft: 10}}>
              <Text style={[FONTS.h2]}>{item.display_name}</Text>
            </View>
          </View>

          <View>
            <Text style={[FONTS.body3]}>
              {checkTimeFromPast(item.createdAt)
                ? dayjs(item.createdAt).format('DD MMMM YYYY')
                : dayjs(item.createdAt).fromNow()}
            </Text>
          </View>
        </View>
        <View>
          <Text style={[FONTS.body3]}>{item.text}</Text>
        </View>
        <View style={{marginTop: 10}}>
          {item.pictures.length === 1 && (
            <Image
              source={{uri: item.pictures[0].url}}
              style={{height: 300, borderRadius: 5}}
            />
          )}
          {item.pictures.length > 1 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {item.pictures.map((pic, index) => {
                  return (
                    <Image
                      key={pic._id}
                      source={{uri: pic.url}}
                      style={{
                        height: 150,
                        width: 150,
                        borderRadius: 5,
                        marginRight:
                          index === item.pictures.length - 1 ? 0 : 10,
                      }}
                    />
                  );
                })}
              </View>
            </ScrollView>
          )}
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <LoveButton />
            <Text style={[FONTS.body3, {marginLeft: 5}]}>11</Text>
          </View>
          <View
            style={{
              marginRight: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginRight: 10}}
              onPress={() => {
                setOpen(true);
              }}>
              <MaterialIcons
                name="add-circle-outline"
                size={24}
                color={COLORS.inputPlaceholderColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{flexDirection: 'row'}}
              onPress={() => {
                setOpen(true);
              }}>
              <Text style={[FONTS.body3, {marginRight: 5}]}>8</Text>
              <Text style={[FONTS.body3]}>
                {t('community.socialcomment.comments')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <CommentModal open={open} handleClose={handleClose} />
      </View>
    );
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{width: SIZES.width}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 10}}
          // keyExtractor={(item,index) => item._id}
          keyExtractor={(item, index) => `${index}`}
          ItemSeparatorComponent={() => <View style={{margin: 10}} />}
          renderItem={({item, index}) => {
            return <SocialPostCard item={item} index={index} />;
          }}
        />
      </View>
    </ScrollView>
  );
};

export default SocialFlatlist;
