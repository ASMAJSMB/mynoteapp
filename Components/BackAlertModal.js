import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export default function BackAlertModal({ visible, onCancel, onConfirm }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Ionicons name="alert-circle" size={48} color="#f39c12" style={styles.modalIcon} />
          <Text style={styles.modalTitle}>Quitter la note</Text>
          <Text style={styles.modalMessage}>
            Les modifications ne seront pas enregistrées. Êtes-vous sûr de vouloir quitter ?
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.modalButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={onConfirm}>
              <Text style={styles.modalButtonText}>Quitter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}