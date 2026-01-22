import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { getNotes, saveNote } from '../storage/storage';  // Ajout de saveNote
import Header from './Header';
import CustomButton from './CustomButton';

export default function DashboardPage({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Couleurs pour les priorités (comme dans NoteDetails)
  const importanceColors = {
    high: '#e74c3c',
    medium: '#f39c12',
    low: '#27ae60',
  };

  // Fonction pour obtenir l'ordre de tri (high = 1, medium = 2, low = 3)
  const getPriorityOrder = (priority) => {
    switch (priority) {
      case 'high':
        return 1;
      case 'medium':
        return 2;
      case 'low':
      default:
        return 3;
    }
  };

  const loadNotes = useCallback(async () => {
    try {
      const storedNotes = await getNotes();
      // Trier les notes par priorité (high en haut)
      const sortedNotes = storedNotes.sort((a, b) => {
        const orderA = getPriorityOrder(a.importance || 'low');
        const orderB = getPriorityOrder(b.importance || 'low');
        return orderA - orderB;
      });
      setNotes(sortedNotes);
    } catch {
      Alert.alert('Erreur', 'Impossible de charger les notes.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Nouvelle fonction : Toggle la checkbox et sauvegarde
  const toggleCompleted = async (noteId) => {
    try {
      const updatedNotes = notes.map(note =>
        note.id === noteId ? { ...note, completed: !note.completed } : note
      );
      setNotes(updatedNotes);  // Mise à jour locale immédiate
      const noteToUpdate = updatedNotes.find(note => note.id === noteId);
      await saveNote(noteToUpdate);  // Sauvegarde persistante
    } catch {
      Alert.alert('Erreur', 'Impossible de mettre à jour la note.');
      loadNotes();  // Recharge en cas d'erreur pour restaurer l'état
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadNotes);
    return unsubscribe;
  }, [navigation, loadNotes]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title="📝 MyNoteApp" />
      <View style={styles.container}>
        <Text style={styles.title}>Mes Notes</Text>
        <CustomButton
          title="Ajouter une Note"
          icon="add"
          onPress={() => navigation.navigate('AddNote')}
          style={styles.addButton}
        />
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
  <TouchableOpacity
    style={styles.note}
    onPress={() => navigation.navigate('NoteDetails', { note: item })}
  >
    {/* Checkbox à gauche */}
    <TouchableOpacity
      style={localStyles.checkbox}
      onPress={() => toggleCompleted(item.id)}
    >
      <Ionicons
        name={item.completed ? 'checkbox' : 'checkbox-outline'}
        size={24}
        color={item.completed ? '#4F46E5' : '#666'}
      />
    </TouchableOpacity>
    {/* Titre avec badge d'importance à côté */}
    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
      {/* Titre tronqué pour prendre l'espace restant */}
      <View style={{ flex: 1 }}>
        <Text 
          style={[styles.noteTitle, item.completed && localStyles.completedText]} 
          numberOfLines={1} 
          ellipsizeMode='tail'
        >
          {item.title}
        </Text>
      </View>
      {/* Badge d'importance, toujours visible à droite */}
      <View style={{ marginLeft: 10 }}>
        <Text style={[localStyles.importanceBadge, { backgroundColor: importanceColors[item.importance] || importanceColors.low }]}>
          {item.importance ? item.importance.charAt(0).toUpperCase() + item.importance.slice(1) : 'Low'}
        </Text>
      </View>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#666" />
  </TouchableOpacity>
)}
          ListEmptyComponent={<Text style={styles.emptyText}>Aucune note pour le moment.</Text>}
        />
      </View>
    </View>
  );
}

// Styles locaux pour le badge d'importance et la checkbox
const localStyles = StyleSheet.create({
  importanceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  checkbox: {
    marginRight: 10,  // Espace entre checkbox et titre
  },
  completedText: {
    textDecorationLine: 'line-through',  // Barré si complété (optionnel, pour visuel)
    color: '#999',  // Gris si complété
  },
});