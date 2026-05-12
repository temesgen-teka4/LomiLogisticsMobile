import 'react-native-gesture-handler'; // MUST be the first line
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

// Context Providers
import { TaskProvider } from './src/context/TaskContext';
import { LanguageProvider } from './src/context/LanguageContext';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import LoginFormScreen from './src/screens/LoginFormScreen';
import RegisterScreen from './src/screens/RegisterScreen'; 
import AdminPanelScreen from './src/screens/AdminPanelScreen'; 
import VehicleCapabilityScreen from './src/screens/VehicleCapabilityScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Types
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  console.log("Lomi Logistics Initializing..."); 

  return (
    <LanguageProvider>
      <TaskProvider>
        <NavigationContainer>
          {/* StatusBar setup for the dark theme */}
          <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
          
          <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{
              headerShown: false, 
              headerStyle: { 
                backgroundColor: '#0F172A',
                elevation: 0, // Remove shadow on Android
                shadowOpacity: 0, // Remove shadow on iOS
              },
              headerTintColor: '#FFF',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            {/* 1. AUTHENTICATION FLOW */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="LoginForm" component={LoginFormScreen} /> 
            <Stack.Screen name="Register" component={RegisterScreen} />
            
            {/* 2. ADMIN INTERFACE */}
            <Stack.Screen 
              name="AdminPanel" 
              component={AdminPanelScreen} 
              options={{ 
                headerShown: true, 
                title: 'System Administration',
                headerLeft: () => null, // Prevents accidental swipe back during admin view
              }}
            />

            {/* 3. MAIN APPLICATION */}
            <Stack.Screen name="VehicleCapability" component={VehicleCapabilityScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            
            <Stack.Screen 
              name="Details" 
              component={DetailsScreen} 
              options={{ 
                headerShown: true, 
                title: 'Load Details' 
              }}
            />

            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </LanguageProvider>
  );
}