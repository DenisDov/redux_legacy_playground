import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {fetchTodos} from '../redux/actions/remoteTodos';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const {status, error, todos} = useSelector(state => state.remoteTodos);

  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 5,
    name: '',
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

  return renderContent();
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
});
