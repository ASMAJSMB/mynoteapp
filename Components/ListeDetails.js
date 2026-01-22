import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import styles from './styles';
import { deleteNote } from '../storage/storage';
import Header from './Header';
import DeleteModal from './DeleteModal';
import CustomButton from './CustomButton';

const importanceColors = {
  high: '#e74c3c',
  medium: '#f39c12',
  low: '#27ae60',
};

export default function ListDetails({ route, navigation }) {
  const note = route?.params?.note;
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!note) return <View style={styles.container}><Text>Note introuvable.</Text></View>;

  const handleEdit = () => {
    navigation.navigate('AddNote', { note }); // vers FormulaireNote
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteNote(note.id);
      setModalVisible(false);
      navigation.navigate('Dashboard');
    } catch {
      Alert.alert('Erreur', 'Impossible de supprimer la note.');
    } finally {
      setLoading(false);
    }
  };

  const color = importanceColors[note.importance] || '#95a5a6';

  return (
    <View style={{ flex: 1 }}>
      <Header title="Détails" showBack onBackPress={() => navigation.navigate('Dashboard')} />
      <View style={styles.container}>
        <View style={localStyles.titleRow}>
          <Text style={localStyles.title}>{note.title}</Text>
          <Text style={[localStyles.importance, { backgroundColor: color }]}>{note.importance.toUpperCase()}</Text>
        </View>
        <Text style={localStyles.content}>{note.content}</Text>
        {note.date && <Text style={localStyles.date}>Date : {new Date(note.date).toLocaleDateString()}</Text>}
        <View style={localStyles.buttonRow}>
          <CustomButton title="Modifier" icon="pencil" onPress={handleEdit} style={localStyles.button} />
          <CustomButton title="Supprimer" icon="trash" onPress={() => setModalVisible(true)} style={[localStyles.button, localStyles.deleteButton]} />
        </View>
        <CustomButton title="Retour au Dashboard" onPress={() => navigation.navigate('Dashboard')} style={localStyles.backButton} />
      </View>
      <DeleteModal visible={modalVisible} onCancel={() => setModalVisible(false)} onConfirm={handleDelete} loading={loading} />
    </View>
  );
}

const localStyles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginRight: 10, flexShrink: 1 },
  importance: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, color: 'white', fontWeight: 'bold', fontSize: 12 },
  content: { fontSize: 16, marginBottom: 16, lineHeight: 24 },
  date: { fontSize: 14, color: '#666', marginBottom: 20 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  button: { flex: 1, marginHorizontal: 5 },
  deleteButton: { backgroundColor: '#e74c3c' },
  backButton: { marginTop: 10 },
});
