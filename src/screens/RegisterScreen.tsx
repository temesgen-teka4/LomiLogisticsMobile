import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import Storage
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Colors } from '../theme/Colors';
import { useLanguage } from '../context/LanguageContext';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation }: Props) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [plate, setPlate] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // 1. Basic Validation
    if (!name || !email || !plate || !password) {
      Alert.alert("Error", "Please fill in all fields to register.");
      return;
    }

    try {
      // 2. Check if user already exists
      const existingUser = await AsyncStorage.getItem(`user_${email}`);
      if (existingUser) {
        Alert.alert("Error", "This email is already registered.");
        return;
      }

      // 3. Create the User Object
      const newUser = {
        name,
        email: email.toLowerCase(),
        plate,
        password, // In a real app, you would hash this!
      };

      // 4. Save to AsyncStorage
      await AsyncStorage.setItem(`user_${email.toLowerCase()}`, JSON.stringify(newUser));
      
      console.log("User successfully saved to storage");
      
      Alert.alert(
        "Success", 
        "Account created! You can now login.",
        [{ text: "OK", onPress: () => navigation.navigate('LoginForm') }]
      );
    } catch (error) {
      Alert.alert("Security Error", "Could not save user data to the device.");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
            <Text style={styles.logo}>LOMI</Text>
            <Text style={styles.title}>{t('welcome') || 'Join Lomi Logistics'}</Text>
            <Text style={styles.subtitle}>Create an account to start earning</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={Colors.textFaint}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="example@mail.com"
                placeholderTextColor={Colors.textFaint}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>License Plate</Text>
              <TextInput
                style={styles.input}
                placeholder="AA 3-A12345"
                placeholderTextColor={Colors.textFaint}
                autoCapitalize="characters"
                value={plate}
                onChangeText={setPlate}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={Colors.textFaint}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
              <Text style={styles.registerText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => navigation.navigate('LoginForm')}
              style={styles.loginLink}
            >
              <Text style={styles.loginLinkText}>
                Already have an account? <Text style={{ color: Colors.primary }}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flexGrow: 1, padding: 25, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { fontSize: 42, fontWeight: '900', color: Colors.primary, letterSpacing: -2 },
  title: { fontSize: 22, fontWeight: '700', color: Colors.text, marginTop: 10 },
  subtitle: { fontSize: 14, color: Colors.textMuted, marginTop: 5 },
  form: { gap: 20 },
  inputContainer: { gap: 8 },
  label: { color: Colors.text, fontSize: 14, fontWeight: '600', marginLeft: 4 },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 15,
    padding: 16,
    color: Colors.text,
    fontSize: 16,
  },
  registerBtn: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  registerText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  loginLink: { marginTop: 15, alignItems: 'center' },
  loginLinkText: { color: Colors.textMuted, fontSize: 14 },
});