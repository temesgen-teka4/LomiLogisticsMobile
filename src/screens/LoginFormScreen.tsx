import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Alert, // CRITICAL: Ensure this is here
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'LoginForm'>;
};

export default function LoginFormScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // This is the function you were asking about
  const handleLoginAuth = async () => {
    const sanitizedEmail = email.trim().toLowerCase();
    
    if (!sanitizedEmail || !password) {
      Alert.alert("Required", "Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const userKey = `user_${sanitizedEmail}`;
      const storedUserData = await AsyncStorage.getItem(userKey);

      // Professional Alert Trigger
      const triggerError = () => {
        setIsLoading(false); 
        // We use a tiny timeout to ensure the loading spinner clears before the popup
        setTimeout(() => {
          Alert.alert(
            "Login Failed",
            "Invalid email or password. Please try again.",
            [{ text: "OK" }]
          );
        }, 100);
      };

      if (storedUserData) {
        const user = JSON.parse(storedUserData);

        if (user.password === password) {
          setIsLoading(false);
          navigation.navigate('VehicleCapability');
        } else {
          triggerError(); // Wrong password
        }
      } else {
        triggerError(); // Email not found
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("System Error", "Could not connect to local storage.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <View style={styles.inner}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Enter your details to log in</Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="driver@lomi.com"
                placeholderTextColor="#64748b"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#64748b"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* THE LOGIN BUTTON */}
            <TouchableOpacity 
              style={[styles.loginBtn, isLoading && { opacity: 0.7 }]} 
              onPress={handleLoginAuth}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#0F172A" />
              ) : (
                <Text style={styles.loginBtnText}>Secure Sign In</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  inner: { padding: 30 },
  title: { color: '#10B981', fontSize: 32, fontWeight: '900' },
  subtitle: { color: '#94A3B8', fontSize: 16, marginBottom: 35 },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  input: { 
    backgroundColor: '#1E293B', 
    color: '#FFF', 
    padding: 18, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#334155' 
  },
  loginBtn: { 
    backgroundColor: '#10B981', 
    padding: 20, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginTop: 10 
  },
  loginBtnText: { color: '#0F172A', fontWeight: '900', fontSize: 18 }
});