import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export default function CustomButton({ title, icon, onPress, loading = false, style }) {
  return (
    <TouchableOpacity style={[styles.customButton, style]} onPress={onPress} disabled={loading}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <View style={styles.buttonContent}>
          {icon && <Ionicons name={icon} size={20} color="white" style={styles.buttonIcon} />}
          <Text style={styles.buttonText}>{title}</Text>
          
        </View>
      )}
    </TouchableOpacity>
  );
}
