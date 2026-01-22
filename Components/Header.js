import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export default function Header({ title, showBack = false, onBackPress }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.center}>
        {title && <Text style={styles.headerTitle}>{title}</Text>}
      </View>
      <View style={styles.right} />
    </View>
  );
}
