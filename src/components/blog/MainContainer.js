import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import Tabs from './mainslides/Tabs';
import {SIZES} from '../../constants';
import {ScrollView} from 'react-native';
import BlogSlide from './mainslides/BlogSlide';
import {SafeAreaView} from 'react-native';
import {blog_categories} from './data';

const MainContainer = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  const onItemPress = React.useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * SIZES.width,
    });
  });
  let blogCategories = blog_categories.map((item) => {
    return {...item, ref: React.createRef()};
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{height: 460}}>
          <Animated.FlatList
            ref={ref}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={blogCategories}
            keyExtractor={(item) => item._id}
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
          <Tabs
            scrollX={scrollX}
            data={blogCategories}
            onItemPress={onItemPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
