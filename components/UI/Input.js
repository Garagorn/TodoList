import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function Input({ onSubmit, placeholder }) {
  const [text, setText] = useState('');
  
  const handlePress = () => {
    if (text.trim() !== '') {
      onSubmit(text);
      setText('');
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handlePress}
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2196F3',
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
