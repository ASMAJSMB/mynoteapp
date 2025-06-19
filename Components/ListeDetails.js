import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';
import { deleteNote } from '../storage/storage';
import Header from './Header';

export default function ListDetails({ route, navigation }) {
  const { note } = route.params;

  const handleDelete = async () => {
    await deleteNote(note.id);
    navigation.navigate('Dashboard');
  };

  const handleEdit = () => {
    navigation.navigate('AddNote', { note });
  };

  const importanceStyle = [
    styles.importance,
    note.importance === 'high' ? styles.high :
    note.importance === 'medium' ? styles.medium : styles.low
  ];

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>{note.title}</Text>
        <Text>{note.content}</Text>
        {note.date && <Text>Date: {note.date}</Text>}
        <Text style={importanceStyle}>{note.importance.toUpperCase()}</Text>

        <Button title="Edit" onPress={handleEdit} />
        <Button title="Delete" onPress={handleDelete} />
        <Button title="Back to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
      </View>
    </View>
  );
}
