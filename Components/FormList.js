import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView,
  TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import { saveNote } from '../storage/storage';
import Header from './Header';
import CustomButton from './CustomButton';

export default function FormulaireNote({ navigation, route }) {
  const noteToEdit = route?.params?.note;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [importance, setImportance] = useState('low');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setImportance(noteToEdit.importance);
      if (noteToEdit.date) setDate(new Date(noteToEdit.date));
    }
  }, [noteToEdit]);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Le titre est requis.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = useCallback(async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const noteData = {
        id: noteToEdit?.id,
        title: title.trim(),
        content: content.trim(),
        importance,
        date: date.toISOString(),
      };
      await saveNote(noteData);
      navigation.navigate('Dashboard');
    } catch {
      Alert.alert('Erreur', 'Impossible de sauvegarder la note.');
    } finally {
      setLoading(false);
    }
  }, [title, content, importance, date, noteToEdit, navigation]);

  const hasChanges = title.trim() || content.trim() || importance !== 'low';
  const resetForm = () => { setTitle(''); setContent(''); setImportance('low'); setDate(new Date()); setErrors({}); };
  const handleBackToDashboard = () => {
    if (hasChanges) {
      Alert.alert(
        'Quitter la note',
        'Les modifications ne seront pas enregistrées.',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Quitter', style: 'destructive', onPress: () => { resetForm(); navigation.navigate('Dashboard'); } },
        ]
      );
    } else navigation.navigate('Dashboard');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="📝 MyNoteApp" showBack onBackPress={handleBackToDashboard} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={90}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{noteToEdit ? 'Modifier la Note' : 'Ajouter une Note'}</Text>
            <TextInput placeholder="Titre" style={[styles.input, errors.title && styles.inputError]} value={title}
              onChangeText={(text) => { setTitle(text); if (errors.title) setErrors({ ...errors, title: null }); }} />
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
            <TextInput placeholder="Contenu" style={styles.input} value={content} onChangeText={setContent} multiline />
            <Text style={styles.label}>Importance</Text>
            <Picker selectedValue={importance} style={styles.input} onValueChange={setImportance}>
              <Picker.Item label="Faible" value="low" />
              <Picker.Item label="Moyenne" value="medium" />
              <Picker.Item label="Élevée" value="high" />
            </Picker>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
              <Text>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && <DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} />}
            <CustomButton title={noteToEdit ? 'Mettre à Jour' : 'Sauvegarder'} icon="save" onPress={handleSave} loading={loading} style={styles.saveButton} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
