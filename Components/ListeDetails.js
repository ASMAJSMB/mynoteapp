import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';
import { deleteNote } from '../storage/storage';
import Header from './Header';

export default function ListDetails({ route, navigation }) {
  // Récupère la note envoyée depuis la page précédente
  const { note } = route.params;

  // Supprime la note puis retourne à l'accueil
  const handleDelete = async () => {
    await deleteNote(note.id);
    navigation.navigate('Dashboard');
  };

  // Redirige vers le formulaire pour modifier la note
  const handleEdit = () => {
    navigation.navigate('AddNote', { note });
  };

  // Applique un style différent selon l’importance
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

        {/* Affiche la date si elle existe */}
        {note.date && <Text>Date: {note.date}</Text>}

        <Text style={importanceStyle}>{note.importance.toUpperCase()}</Text>

        {/* Boutons pour éditer, supprimer ou revenir */}
        <Button title="Edit" onPress={handleEdit} />
        <Button title="Delete" onPress={handleDelete} />
        <Button title="Back to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
      </View>
    </View>
  );
}
