// ============================================================
// LOMI Dispatch — Root Navigation
// ============================================================
// Install: @react-navigation/native @react-navigation/native-stack
// + react-native-screens react-native-safe-area-context

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

import LoginScreen    from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DetailsScreen  from '../screens/DetailsScreen';
import ProfileScreen  from '../screens/ProfileScreen';
import HistoryScreen  from '../screens/HistoryScreen';
import { Colors } from '../theme/Colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.bg },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Login"     component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Details"   component={DetailsScreen} />
        <Stack.Screen name="Profile"   component={ProfileScreen} />
        <Stack.Screen name="History"   component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
