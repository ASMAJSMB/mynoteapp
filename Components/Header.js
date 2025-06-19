import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles'; // On importe les styles séparés

export default function Header() {
  return (
    <View style={styles.headerContainer}>
  <Text style={styles.headerTitle}>📝 MyNoteApp</Text>
</View>
  );
}
