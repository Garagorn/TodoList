import React, { useState, useContext } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context';
import { signUp } from '../API/sign';

export default function SignUpScreen() {
  const [token, setToken] = useContext(TokenContext);
  const [username, setUsername] = useContext(UsernameContext);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);
  
  const onSubmit = async () => {
    // Vérification locale
    if (password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const tok = await signUp(username, password);
      setToken(tok);
      setError('');
    } catch (err) {
      console.log(err);
      if (err.message) setError(err.message);
      else setError("Erreur d'inscription");
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Inscription</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          value={username || ''}
          onChangeText={setUsername}
          autoCapitalize="none"
          returnKeyType="next"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          returnKeyType="next"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmer le mot de passe"
          secureTextEntry
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          onSubmitEditing={onSubmit}
          returnKeyType="done"
        />
        
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>S'inscrire</Text>
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
    borderRadius: 12,
    padding: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 26,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    marginBottom: 13,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 8,
    borderRadius: 6,
    marginBottom: 13,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

