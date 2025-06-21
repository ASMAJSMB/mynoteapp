import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import { saveNote } from '../storage/storage';
import Header from './Header';

export default function FormulaireNote({ navigation, route }) {
  // Récupère la note passée en paramètre si on édite
  const noteToEdit = route.params?.note;

  // États pour chaque champ du formulaire
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [importance, setImportance] = useState('low');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Remplit le formulaire si une note est passée en paramètre
  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setImportance(noteToEdit.importance);
      if (noteToEdit.date) {
        setDate(new Date(noteToEdit.date));
      }
    }
  }, [noteToEdit]);

  // Gestion du changement de date
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Enregistre ou met à jour une note
  const handleSave = async () => {
    const noteData = {
      id: noteToEdit?.id, // Garde l'id si c’est une modification
      title,
      content,
      importance,
      date: date.toISOString(),
    };
    await saveNote(noteData);
    navigation.navigate('Dashboard'); // Retour à la liste des notes
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{noteToEdit ? 'Edit Note' : 'Add Note'}</Text>

            <TextInput
              placeholder="Title"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              placeholder="Content"
              style={styles.input}
              value={content}
              onChangeText={setContent}
              multiline
            />

            <Text style={styles.label}>Importance</Text>
            <Picker
              selectedValue={importance}
              style={styles.input}
              onValueChange={(itemValue) => setImportance(itemValue)}
            >
              <Picker.Item label="Low" value="low" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="High" value="high" />
            </Picker>

            <Text style={styles.label}>Date</Text>
            <Button title={date.toLocaleDateString()} onPress={() => setShowDatePicker(true)} />

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}

            <Button title={noteToEdit ? 'Update' : 'Save'} onPress={handleSave} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
