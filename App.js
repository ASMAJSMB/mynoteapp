import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardPage from './components/DashboardPage';
import FormulaireNote from './components/FormulaireNote';
import ListDetails from './components/ListDetails';
import styles from './styles'; // sans .css


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardPage} />
        <Stack.Screen name="AddNote" component={FormulaireNote} />
        <Stack.Screen name="NoteDetails" component={ListDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}