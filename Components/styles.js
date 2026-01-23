import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  note: { backgroundColor: '#fff', padding: 15, marginVertical: 8, borderRadius: 12, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  noteTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#666', marginTop: 20 },
  input: { borderColor: '#ddd', borderWidth: 1, padding: 12, marginBottom: 10, borderRadius: 8, backgroundColor: '#fff' },
  inputError: { borderColor: '#e74c3c' },
  errorText: { color: '#e74c3c', fontSize: 14, marginBottom: 10 },
  label: { fontWeight: 'bold', marginTop: 10, marginBottom: 5, fontSize: 16, color: '#333' },
  dateButton: { borderColor: '#ddd', borderWidth: 1, padding: 12, marginBottom: 10, borderRadius: 8, backgroundColor: '#fff', justifyContent: 'center' },
 headerContainer: { 
    height: 80,  // Changé de 60 à 50 pour réduire la hauteur
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 12,  // Légèrement réduit de 16 à 12 pour plus d'espace
    backgroundColor: '#4F46E5', 
    elevation: 4 
  },
   headerTitle: { 
    fontSize: 20,  // Légèrement réduit de 20 à 18 pour s'adapter à la hauteur moindre
    fontWeight: 'bold', 
    marginTop: 30, 
    color: 'white' 
  },left: { flex: 1 }, 
  center: { flex: 2, alignItems: 'center' }, 
  right: { flex: 1 }, 
  backButton: { 
  padding: 20,
  marginTop: 20,   // ← descend le bouton de 10 pixels
},

  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  addButton: { marginBottom: 20 },
  saveButton: { marginTop: 20 },
  customButton: { backgroundColor: '#4F46E5', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignItems: 'center', justifyContent: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  buttonContent: { flexDirection: 'row', alignItems: 'center' },
  buttonIcon: { marginRight: 8 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 12, width: '80%', alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
  modalIcon: { marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  modalMessage: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#666' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  modalButton: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  cancelButton: { backgroundColor: '#95a5a6' },
  confirmButton: { backgroundColor: '#e74c3c' },
  modalButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  // Styles pour les modales (réutilisables pour DeleteModal et BackAlertModal)
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  width: '80%',
  alignItems: 'center',
},
modalIcon: {
  marginBottom: 10,
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#333',
},
modalMessage: {
  fontSize: 16,
  textAlign: 'center',
  marginBottom: 20,
  color: '#666',
},
modalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
modalButton: {
  flex: 1,
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  marginHorizontal: 5,
},
cancelButton: {
  backgroundColor: '#bdc3c7',
},
confirmButton: {
  backgroundColor: '#e74c3c',  // Rouge pour Quitter, ou orange si tu préfères
},
modalButtonText: {
  color: 'white',
  fontSize: 16,
},
});
