import React from 'react';
import { Modal, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export default function DeleteModal({ visible, onCancel, onConfirm, loading = false }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Ionicons name="warning" size={48} color="#e74c3c" style={styles.modalIcon} />
          <Text style={styles.modalTitle}>Confirmer la suppression</Text>
          <Text style={styles.modalMessage}>
            Êtes-vous sûr de vouloir supprimer cette note ? Cette action est irréversible.
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.modalButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={onConfirm} disabled={loading}>
              {loading ? <ActivityIndicator color="white" /> : <Text style={styles.modalButtonText}>Supprimer</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
