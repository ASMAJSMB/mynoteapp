import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts } from 'expo-font';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';

import DashboardPage from './Components/Dashboard';
import FormulaireNote from './Components/FormList';
import ListDetails from './Components/ListeDetails';

import style from './style.js';

const Stack = createNativeStackNavigator();

export default function App() {
  // ✅ Chargement des polices
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  //  Tant que les polices ne sont pas chargées, on affiche un écran d'attente
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  //  L'application s'affiche normalement quand les polices sont prêtes
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
