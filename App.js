import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardPage from './Components/Dashboard';
import FormulaireNote from './Components/FormList';
import ListDetails from './Components/ListeDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={DashboardPage} />
        <Stack.Screen name="AddNote" component={FormulaireNote} />
        <Stack.Screen name="NoteDetails" component={ListDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
