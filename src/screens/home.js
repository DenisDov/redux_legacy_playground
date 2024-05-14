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

export default function HomeScreen() {
  const dispatch = useDispatch();
  const {status, error, todos} = useSelector(state => state.remoteTodos);

  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 5,
    title: '',
  });

  useEffect(() => {
    dispatch(fetchTodos(searchParams));
  }, [dispatch, searchParams]);

  const renderContent = () => {
    switch (status) {
      case 'uninitialized':
        return null;
      case 'loading':
        return <ActivityIndicator />;
      case 'failed':
        return <Text>{error}</Text>;
      default:
        return <TodosList todos={todos} />;
    }
  };

  const TodosList = ({todos}) => (
    <FlatList
      data={todos}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{
        margin: 8,
      }}
    />
  );

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => alert(item.id)} style={styles.item}>
        <Text>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const debouncedSearch = _.debounce(query => {
    setSearchParams(prev => ({...prev, title: query}));
  }, 500);

  return (
    <View style={{flex: 1}}>
      <TextInput
        style={styles.input}
        onChangeText={query => debouncedSearch(query)}
      />
      {renderContent()}
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
  },
});
