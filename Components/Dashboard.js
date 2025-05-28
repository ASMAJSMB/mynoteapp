import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { getNotes } from '../storage/storage';

export default function DashboardPage({ navigation }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const storedNotes = await getNotes();
      setNotes(storedNotes);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Notes</Text>
      <Button title="Add a Note" onPress={() => navigation.navigate('AddNote')} />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.note} onPress={() => navigation.navigate('NoteDetails', { note: item })}>
            <Text style={styles.noteTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
