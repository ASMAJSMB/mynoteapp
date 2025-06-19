import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    fontFamily: 'Montserrat_700Bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat_700Bold',
  },
  note: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    fontFamily: 'Montserrat_700Bold',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700Bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    fontFamily: 'Montserrat_700Bold',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontFamily: 'Montserrat_700Bold',
  },
  importance: {
    padding: 4,
    borderRadius: 4,
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'Montserrat_700Bold',
  },
  high: {
    backgroundColor: 'red',
    color: 'white',
    fontFamily: 'Montserrat_700Bold',
  },
  medium: {
    backgroundColor: 'orange',
    color: 'white',
    fontFamily: 'Montserrat_700Bold',
  },
  low: {
    backgroundColor: 'green',
    color: 'white',
    fontFamily: 'Montserrat_700Bold',
  },
});