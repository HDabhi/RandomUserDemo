import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import ItemSeparatorComponent from '../component/ItemSeparatorComponent';
import UserItem from '../component/UserItem';
import {User} from '../model/user';
import {RootStackParamList} from '../navigation';
import {RootState} from '../store/rootReducer';
import Loader from '../component/Loader';
import { Profile } from '../navigation/ScreenNames';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [usersList, setUsersList] = useState<User[]>([]);

  const dispatch = useDispatch();
  const {users, loading, error} = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    dispatch({type: 'users/fetchUsers', payload: currentPage});
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (currentPage == 0) {
      setUsersList(users);
      setIsFetchingMore(false);
    } else {
      setUsersList(prevUsers => [...prevUsers, ...users]);
      setIsFetchingMore(false);
    }
  }, [users, currentPage]);

  useEffect(() => {
    if (!loading) {
      setRefreshing(false);
    }
  }, [loading]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCurrentPage(0);
    dispatch({type: 'users/fetchUsers', payload: 0});
  }, [dispatch]);

  const onUserItemTap = useCallback(
    (user: User) => {
      navigation.navigate(Profile, {selectedEmail: user.email});
    },
    [navigation],
  );

  const handleLoadMore = useCallback(() => {
    if (!isFetchingMore && !loading) {
      setIsFetchingMore(true);
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [isFetchingMore, loading]);

  const renderItem = useCallback(
    ({item}: {item: User}) => (
      <UserItem item={item} handlePress={onUserItemTap} />
    ),
    [onUserItemTap],
  );

  return (
    <View style={styles.containerStyle}>
      {loading && <Loader isLoading={loading} message="Loading Data..." />}
      {error && <Text>Error: {error}</Text>}

      <FlatList
        data={usersList}
        keyExtractor={(item, index) => `${item.login.md5} _${index}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={() => <ItemSeparatorComponent />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    flex: 1,
  },
});
