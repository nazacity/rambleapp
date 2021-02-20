import React from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import Tabs from './mainslides/Tabs';
import {SIZES} from '../../constants';
import {ScrollView} from 'react-native';
import BlogSlide from './mainslides/BlogSlide';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native';
import SocialFlatlist from './social/SocialFlatlist';

const data = [
  {
    key: 'man',
    title: 'man',
    image:
      'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ref: React.createRef(),
  },
  {
    key: 'women',
    title: 'women',
    image:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ref: React.createRef(),
  },
  {
    key: 'kids',
    title: 'kids',
    image:
      'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ref: React.createRef(),
  },
  {
    key: 'help',
    title: 'help',
    image:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ref: React.createRef(),
  },
];

const MainSlide = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  const onItemPress = React.useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * SIZES.width,
    });
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.FlatList
          ref={ref}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.key}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          renderItem={({item}) => {
            return <BlogSlide item={item} />;
          }}
        />
        <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainSlide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
