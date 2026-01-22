import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = '@mynoteapp_notes';

export async function getNotes() {
  try {
    const json = await AsyncStorage.getItem(NOTES_KEY);
    const notes = json != null ? JSON.parse(json) : [];
    // Ajout du champ 'completed' par défaut pour rétrocompatibilité
    return notes.map(note => ({
      ...note,
      completed: note.completed || false,  // false par défaut si absent
    }));
  } catch (e) {
    console.error('Erreur getNotes', e);
    return [];
  }
}

export async function saveNote(note) {
  const notes = await getNotes();
  // Ajout du champ 'completed' lors de la sauvegarde
  const noteToSave = {
    ...note,
    completed: note.completed || false,  // false par défaut si absent
  };
  if (noteToSave.id) {
    // Modifier note existante
    const index = notes.findIndex(n => n.id === noteToSave.id);
    if (index > -1) notes[index] = noteToSave;
    else notes.push(noteToSave);
  } else {
    noteToSave.id = Date.now();
    notes.push(noteToSave);
  }
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export async function deleteNote(id) {
  let notes = await getNotes();
  notes = notes.filter(n => n.id !== id);
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}