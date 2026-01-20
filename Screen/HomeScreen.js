import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UsernameContext } from '../Context/Context';

export default function HomeScreen() {
  const [username] = useContext(UsernameContext);
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.welcomeTitle}>Bienvenue !</Text>
        <Text style={styles.username}>Connecté en tant que</Text>
        <Text style={styles.usernameHighlight}>{username}</Text>
      </View>
      
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Gérez vos tâches</Text>
        <Text style={styles.infoText}>
          Créez des listes et ajoutez des tâches.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  username: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  usernameHighlight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  infoCard: {
    backgroundColor: '#2196F3',
    borderRadius: 15,
    padding: 15,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
});
