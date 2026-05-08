import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Context Providers
import { TaskProvider } from './src/context/TaskContext';
import { LanguageProvider } from './src/context/LanguageContext';

// Screens - Ensure these files end in .tsx
import LoginScreen from './src/screens/LoginScreen';
import VehicleCapabilityScreen from './src/screens/VehicleCapabilityScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import DetailsScreen from './src/screens/DetailsScreen';

import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  console.log("Lomi App Initializing..."); // Check your terminal for this!

  return (
    <LanguageProvider>
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{
              headerStyle: { backgroundColor: '#0F172A' },
              headerTintColor: '#FFF',
            }}
          >
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="VehicleCapability" 
              component={VehicleCapabilityScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Dashboard" 
              component={DashboardScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Details" 
              component={DetailsScreen} 
              options={{ title: 'Load Details' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </LanguageProvider>
  );
}