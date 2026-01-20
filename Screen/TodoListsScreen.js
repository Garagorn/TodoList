import React, { useState, useContext, useEffect } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context';
import Input from '../components/UI/Input';
import TodoListItem from '../components/Item/TodoListItem';
import { createTodoList, getTodoLists, deleteTodoList } from '../API/todoList';

export default function TodoListsScreen({ navigation }) {
  const [username] = useContext(UsernameContext);
  const [token] = useContext(TokenContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTodoLists();
  }, []);

  const loadTodoLists = () => {
    getTodoLists(username, token)
      .then(todoLists => {
        setData(todoLists);
        setIsLoading(false);
      })
      .catch(error => {
        console.log("Erreur d'API", error);
        setIsLoading(false);
      });
  };

  const newTodoList = title => {
    createTodoList(username, title, token)
      .then(newList => {
        setData([...data, newList]);
      })
      .catch(error => {
        console.log("Erreur lors de la création", error);
      });
  };

  const confirmerSuppression = (id, title) => {
    const result = window.confirm(`Voulez-vous vraiment supprimer la liste "${title}" ?`);
    if (result) {
      removeTodoList(id);
    }
  };

  const removeTodoList = id => {
    deleteTodoList(id, token)
      .then(() => {
        setData(data.filter(list => list.id !== id));
      })
      .catch(error => {
        console.log("Erreur lors de la suppression", error);
      });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Input 
        onSubmit={newTodoList} 
        placeholder="Nouvelle liste..." 
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoListItem
            title={item.title}
            onPress={() => navigation.navigate('Details', { 
              id: item.id,
              title: item.title 
            })}
            onDelete={() => confirmerSuppression(item.id, item.title)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucune liste pour le moment</Text>
            <Text style={styles.emptySubtext}>Créez votre première liste ci-dessus</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
    textAlign: 'center',
  },
});
