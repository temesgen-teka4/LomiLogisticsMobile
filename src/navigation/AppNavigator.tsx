import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

// Import your screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen'; 
import DashboardScreen from '../screens/DashboardScreen';
import VehicleCapabilityScreen from '../screens/VehicleCapabilityScreen';
import DetailsScreen from '../screens/DetailsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login" 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: '#0F172A' } // Matches your dark theme
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
      />
      
      <Stack.Screen name="VehicleCapability" component={VehicleCapabilityScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}