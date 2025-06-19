import AsyncStorage from '@react-native-async-storage/async-storage';

export const getNotes = async () => {
  const notes = await AsyncStorage.getItem('notes');
  return notes ? JSON.parse(notes) : [];
};

export const saveNote = async (note) => {
  const existing = await getNotes();

  if (note.id) {
    // Modification d'une note existante
    const updatedNotes = existing.map(n => (n.id === note.id ? note : n));
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  } else {
    // Création d'une nouvelle note
    const newNote = { ...note, id: Date.now() };
    await AsyncStorage.setItem('notes', JSON.stringify([newNote, ...existing]));
  }
};

export const deleteNote = async (id) => {
  const existing = await getNotes();
  const filtered = existing.filter(note => note.id !== id);
  await AsyncStorage.setItem('notes', JSON.stringify(filtered));
};
