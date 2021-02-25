import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import Tabs from './mainslides/Tabs';
import {SIZES} from '../../constants';
import {ScrollView} from 'react-native';
import BlogSlide from './mainslides/BlogSlide';
import {SafeAreaView} from 'react-native';
import {blog_categories} from './data';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/actions/AppStateAction';
import {getSocial} from '../../redux/actions/request';
import {useNavigation} from '@react-navigation/native';

const MainContainer = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  const onItemPress = React.useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * SIZES.width,
    });
  });
  const [blogCategories, setBlogCategories] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchBlogCategories = async () => {
    dispatch(setLoading(true));
    try {
      const res = await getSocial('/api/users/getblogcategories');

      if (res.status === 200) {
        const newData = res.data.map((item) => {
          return {...item};
        });

        setBlogCategories(newData);
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchBlogCategories();
    });

    return unsubscribe;
  }, []);

  return (
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
  );
};

export default MainContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
