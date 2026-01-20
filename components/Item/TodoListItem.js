import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TodoListItem({title, onPress, onDelete}){
  return (
    <View style={styles.content}>
      <TouchableOpacity onPress={onPress} style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Image 
          source={require('../../assets/trash-can-outline.png')} 
          style={styles.icon} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  deleteButton: {
    padding: 5,
  },
  icon: {
    height: 24,
    width: 24,
  },
});
