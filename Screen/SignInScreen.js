import React, { useState, useContext } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context';
import { signIn } from '../API/sign';

export default function SignInScreen() {
  const [login, setLogin] = useState("");
  const [token, setToken] = useContext(TokenContext);
  const [username, setUsername] = useContext(UsernameContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const getSignedIn = () => {
    signIn(login, password)
      .then(token => {
        setUsername(login);
        setToken(token);
      })
      .catch(err => {
        console.log(err);
        if (err.message.includes('Network'))
          setError('Erreur réseau : impossible de contacter le serveur.');
        else if (err.message.includes('password'))
          setError('Mot de passe incorrect.');
        else if (err.message.includes('username'))
          setError('Nom d\'utilisateur inconnu.');
        else
          setError('Erreur inconnue.');
      });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Connexion</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          value={login}
          onChangeText={setLogin}
          autoCapitalize="none"
          returnKeyType="next"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={getSignedIn}
          returnKeyType="done"
        />
        
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        <TouchableOpacity style={styles.button} onPress={getSignedIn}>
          <Text style={styles.buttonText}>Se connecter</Text>
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
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
