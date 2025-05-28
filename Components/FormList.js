import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from '../styles';
import { saveNote } from '../storage/storage';

export default function FormulaireNote({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [importance, setImportance] = useState('low');

  const handleSave = async () => {
    await saveNote({ title, content, importance });
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Note</Text>
      <TextInput placeholder="Title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Content" style={styles.input} value={content} onChangeText={setContent} multiline />
      <TextInput placeholder="Importance (low, medium, high)" style={styles.input} value={importance} onChangeText={setImportance} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

