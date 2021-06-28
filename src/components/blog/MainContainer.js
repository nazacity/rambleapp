import React, {useEffect, useState} from 'react';
import {View, Animated, ActivityIndicator} from 'react-native';
import Tabs from './mainslides/Tabs';
import {COLORS, SIZES} from '../../constants';
import BlogSlide from './mainslides/BlogSlide';
import {useDispatch} from 'react-redux';
import {getSocial} from '../../redux/actions/request';
import {useNavigation} from '@react-navigation/native';
import {Fragment} from 'react';

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
  const [loading, setLoading] = useState(true);

  const fetchBlogCategories = async () => {
    // dispatch(setLoading(true));
    try {
      const res = await getSocial('/api/users/getblogcategories');

      if (res.status === 200) {
        const newData = res.data.map((item) => {
          return {...item};
        });

        setBlogCategories(newData);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchBlogCategories();
    });

    return unsubscribe;
  }, []);

  return (
    <Fragment>
      {loading ? (
        <View
          style={{alignItems: 'center', justifyContent: 'center', height: 460}}>
          <ActivityIndicator
            color={COLORS.primary}
            size={24}
            style={{marginTop: 30}}
          />
        </View>
      ) : (
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
      )}
    </Fragment>
  );
};

export default MainContainer;
