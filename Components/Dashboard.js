import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { getNotes } from '../storage/storage';
import Header from './Header'; 

export default function DashboardPage({ navigation }) {
  // État local pour stocker les notes
  const [notes, setNotes] = useState([]);

  // useEffect pour récupérer les notes à chaque fois que l'écran est affiché
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const storedNotes = await getNotes();
      setNotes(storedNotes);
    });
    // Nettoyage de l'écouteur lorsqu'on quitte l'écran
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Header /> {/* Affichage du header personnalisé */}
      <View style={styles.container}>
        <Text style={styles.title}>My Notes</Text>

        {/* Bouton pour naviguer vers l'écran d'ajout de note */}
        <Button title="Add a Note" onPress={() => navigation.navigate('AddNote')} />

        {/* Liste des notes enregistrées */}
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.note}
              onPress={() => navigation.navigate('NoteDetails', { note: item })}
            >
              <Text style={styles.noteTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
