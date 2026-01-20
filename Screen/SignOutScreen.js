import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context';

export default function SignOutScreen() {
  const [, setToken] = useContext(TokenContext);
  const [, setUsername] = useContext(UsernameContext);
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Déconnexion</Text>
        <Text style={styles.message}>
          Voulez-vous vraiment vous déconnecter ?
        </Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            setToken(null);
            setUsername(null);
          }}
        >
          <Text style={styles.buttonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
