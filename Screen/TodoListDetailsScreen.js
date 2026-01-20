import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Switch, TouchableOpacity, Button, Image, Alert, TextInput } from 'react-native';
import { TokenContext } from '../Context/Context';
import Input from '../components/UI/Input';
import { createTodo, getTodos, deleteTodo, updateTodo } from '../API/todo';

export default function TodoListDetailsScreen({ route }) {
  const { id, title } = route.params || {};
  const [token] = useContext(TokenContext);
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  
  // Barre de progression des tâches
  const ProgressBar = ({ done, total }) => {
    const pourcentage = total > 0 ? (done / total) * 100 : 0;
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${pourcentage}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {done} / {total} tâches terminées ({Math.round(pourcentage)}%)
        </Text>
      </View>
    );
  };

  // Changement de la tache
  const switchTodo = (todoId, currentStatus) => {
  updateTodo(todoId, { done: !currentStatus }, token)
    .then(updatedTodo => {
      setTodos(todos.map(todo => 
        todo.id === todoId ? updatedTodo : todo
      ));
    })
    .catch(error => {
      console.log("Erreur lors de la mise à jour", error);
      Alert.alert("Erreur", "Impossible de mettre à jour la tâche");
    });
};

  // Modification de l'état de la tâche
  const allDone = () => {
      const promises = todos
        .filter(t => !t.done)
        .map(t => updateTodo(t.id, { done: true }, token));
      
      Promise.all(promises)
        .then(() => {
          setTodos(todos.map(t => ({ ...t, done: true })));
        })
        .catch(error => {
          console.log("Erreur lors de la mise à jour multiple", error);
          Alert.alert("Erreur", "Impossible de tout cocher");
        });
    };

  // Toutes les taches à non fait
  const allUndone = () => {
      const promises = todos
        .filter(t => t.done)
        .map(t => updateTodo(t.id, { done: false }, token));
      
      Promise.all(promises)
        .then(() => {
          setTodos(todos.map(t => ({ ...t, done: false })));
        })
        .catch(error => {
          console.log("Erreur lors de la mise à jour multiple", error);
          Alert.alert("Erreur", "Impossible de tout décocher");
        });
    };

  // Ajout d'une tache
  const addTodo = (content) => {
    createTodo(content, id, token)
      .then(newTodo => {
        setTodos([...todos, newTodo]);
      })
      .catch(error => {
        console.log("Erreur lors de l'ajout", error);
        Alert.alert("Erreur", "Impossible d'ajouter la tâche");
      });
  };

  // Suppression d'une tache
  const removeTodo = (todoId) => {
    deleteTodo(todoId, token)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== todoId));
      })
      .catch(error => {
        console.log("Erreur lors de la suppression", error);
        Alert.alert("Erreur", "Impossible de supprimer la tâche");
      });
  };

  const confirmerSuppression = (id, content) => {
  const result = window.confirm(`Voulez-vous vraiment supprimer la tâche "${content}" ?`);
      if (result) {
        console.log("Suppression confirmée");
        removeTodo(id);
      } else {
        console.log("Suppression annulée");
      }
    };

  // Édition d'une tâche
  const startEdit = (todoId, currentContent) => {
    setEditingId(todoId);
    setEditText(currentContent);
  };

  const saveEdit = (todoId) => {
      if (editText.trim() === '') {
        Alert.alert("Erreur", "Le contenu ne peut pas être vide");
        return;
      }
      
      updateTodo(todoId, { content: editText }, token)
        .then(updatedTodo => {
          setTodos(todos.map(todo => 
            todo.id === todoId ? updatedTodo : todo
          ));
          setEditingId(null);
          setEditText('');
        })
        .catch(error => {
          console.log("Erreur lors de la modification", error);
          Alert.alert("Erreur", "Impossible de modifier la tâche");
        });
    };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  // Filtres
  const getFilteredTodos = () => {
    if (filter === "done") return todos.filter(t => t.done);
    if (filter === "undone") return todos.filter(t => !t.done);
    return todos;
  };

  useEffect(() => {
    if (!id || !token) return;
    setLoading(true);
    getTodos(id, token)
      .then((data) => {
        setTodos(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        Alert.alert("Erreur", "Impossible de charger les tâches");
      });
  }, [id, token]);

  if(loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#2196F3" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'Sans titre'}</Text>
      
      <ProgressBar 
        done={todos.filter(t => t.done).length} 
        total={todos.length} 
      />
      
      <Input 
        onSubmit={addTodo} 
        placeholder="Nouvelle tâche..." 
      />

      <View style={styles.filtres}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === "all" && styles.filterActive]}
          onPress={() => setFilter("all")}
        >
          <Text style={[styles.filterText, filter === "all" && styles.filterTextActive]}>
            Tout ({todos.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === "done" && styles.filterActive]}
          onPress={() => setFilter("done")}
        >
          <Text style={[styles.filterText, filter === "done" && styles.filterTextActive]}>
            Fait ({todos.filter(t => t.done).length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === "undone" && styles.filterActive]}
          onPress={() => setFilter("undone")}
        >
          <Text style={[styles.filterText, filter === "undone" && styles.filterTextActive]}>
            À faire ({todos.filter(t => !t.done).length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getFilteredTodos()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            {editingId === item.id ? (
              // Mode édition
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={editText}
                  onChangeText={setEditText}
                  autoFocus
                />
                <TouchableOpacity 
                  onPress={() => saveEdit(item.id)}
                  style={styles.editButton}
                >
                  <Text style={styles.editButtonText}>✓</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={cancelEdit}
                  style={[styles.editButton, styles.cancelButton]}
                >
                  <Text style={styles.editButtonText}>✗</Text>
                </TouchableOpacity>
              </View>
            ) : (
              // Mode normal
              <>
                <Text style={[
                  styles.todoText,
                  item.done && styles.todoDone
                ]}>
                  {item.content}
                </Text>
                <View style={styles.actionButtons}>
                  <Switch
                    value={item.done}
                    onValueChange={() => switchTodo(item.id, item.done)}
                  />
                  <TouchableOpacity 
                    onPress={() => startEdit(item.id, item.content)}
                    style={styles.iconButton}
                  >
                    <Image 
                      source={require('../assets/pencil-outline.png')} 
                      style={styles.icon} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => confirmerSuppression(item.id, item.content)}
                    style={styles.iconButton}
                  >
                    <Image 
                      source={require('../assets/trash-can-outline.png')} 
                      style={styles.icon} 
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}></Text>
            <Text style={styles.emptyText}>
              {filter === "all" 
                ? "Aucune tâche pour le moment" 
                : filter === "done"
                ? "Aucune tâche terminée"
                : "Aucune tâche à faire"}
            </Text>
          </View>
        }
      />

      {todos.length > 0 && (
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              styles.actionButtonGreen,
              todos.every(t => t.done) && styles.actionButtonDisabled
            ]}
            onPress={allDone}
            disabled={todos.every(t => t.done)}
          >
            <Text style={styles.actionButtonText}> Tout cocher</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              styles.actionButtonRed,
              todos.every(t => !t.done) && styles.actionButtonDisabled
            ]}
            onPress={allUndone}
            disabled={todos.every(t => !t.done)}
          >
            <Text style={styles.actionButtonText}> Tout décocher</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7,
    textAlign: 'center',
    color: '#333',
  },
  progressContainer: {
    backgroundColor: '#fff',
    padding: 7,
    borderRadius: 4,
    marginBottom: 5,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  filtres: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  filterButton: {
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterText: {
    fontSize: 12,
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginVertical: 5,
  },
  todoText: {
    flex: 1,
    fontSize: 14,
    marginRight: 5,
    color: '#333',
  },
  todoDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
    marginLeft: 4,
  },
  icon: {
    height: 16,
    width: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  emptyIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    paddingVertical: 7,
  },
  actionButton: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 4,
    alignItems: 'center',
  },
  actionButtonGreen: {
    backgroundColor: '#4CAF50',
  },
  actionButtonRed: {
    backgroundColor: '#f44336',
  },
  actionButtonDisabled: {
    backgroundColor: '#cccccc',
    opacity: 0.5,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  editContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 5,
    padding: 8,
    marginRight: 5,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    minWidth: 20,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
