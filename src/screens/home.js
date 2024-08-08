import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  View,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';

import {fetchTodos} from '../redux/actions/remoteTodos';

const TodosList = ({todos, onEndReached}) => (
  <FlatList
    data={todos}
    renderItem={renderItem}
    keyExtractor={item => item.id.toString()}
    contentContainerStyle={{
      margin: 8,
    }}
    onEndReached={onEndReached}
    onEndReachedThreshold={0.5}
  />
);

const renderItem = ({item}) => {
  // console.log('item: ', item);
  return (
    <TouchableOpacity onPress={() => alert(item.id)} style={styles.item}>
      <Text style={styles.title}>{item.id}</Text>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const dispatch = useDispatch();
  const {status, error, todos} = useSelector(state => state.remoteTodos);
  // console.log('todos: ', todos);

  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 10,
    title: '',
  });

  useEffect(() => {
    dispatch(fetchTodos(searchParams, searchParams.page === 1));
  }, [dispatch, searchParams]);

  const loadMore = () => {
    setSearchParams(prev => ({...prev, page: prev.page + 1}));
  };

  const debouncedSearch = _.debounce(query => {
    setSearchParams(prev => ({...prev, page: 1, title: query}));
  }, 500);

  return (
    <View style={{flex: 1}}>
      <TextInput
        style={styles.input}
        onChangeText={query => debouncedSearch(query)}
        placeholder="Search todos..."
      />
      <TodosList todos={todos} onEndReached={loadMore} />
      {status === 'loading' && <ActivityIndicator />}
      {status === 'failed' && <Text>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: 'tomato',
    height: 200,
    margin: 8,
    padding: 16,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    margin: 8,
    padding: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
});
