import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const { locale, setLocale, t } = useLanguage();

  const handleLoginPress = () => {
    navigation.navigate('LoginForm');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  // Hidden Admin access
  const handleAdminAccess = () => {
    navigation.navigate('AdminPanel');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Explicitly setting the bar style for the dark background */}
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      <View style={styles.content}>
        {/* SECRET ADMIN TRIGGER */}
        <TouchableOpacity 
          activeOpacity={1} 
          onLongPress={handleAdminAccess}
          delayLongPress={2500} // Slightly longer for better "stealth"
        >
          <Text style={styles.logo}>LOMI</Text>
        </TouchableOpacity>
        
        <Text style={styles.subtitle}>Logistics Management Interface</Text>
        
        {/* Language Selection Toggle */}
        <View style={styles.langRow}>
          <TouchableOpacity 
            activeOpacity={0.8}
            style={[styles.langBtn, locale === 'en' && styles.activeLang]} 
            onPress={() => setLocale('en')}
          >
            <Text style={[styles.langText, { color: locale === 'en' ? '#0F172A' : '#fff' }]}>English</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={0.8}
            style={[styles.langBtn, locale === 'am' && styles.activeLang]} 
            onPress={() => setLocale('am')}
          >
            <Text style={[styles.langText, { color: locale === 'am' ? '#0F172A' : '#fff' }]}>አማርኛ</Text>
          </TouchableOpacity>
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity 
          activeOpacity={0.85}
          style={styles.loginBtn} 
          onPress={handleLoginPress} 
        >
          <Text style={styles.loginBtnText}>{t('login') || 'LOGIN'}</Text>
        </TouchableOpacity>

        {/* Registration Link */}
        <TouchableOpacity 
          activeOpacity={0.6}
          style={styles.registerLink}
          onPress={handleRegisterPress}
        >
          <Text style={styles.registerText}>
            Don't have an account? <Text style={styles.registerHighlight}>Register</Text>
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.footerText}>Safaricom Ethiopia Network Active 📶</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0F172A', 
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20
  },
  logo: { 
    fontSize: 64, 
    fontWeight: '900', 
    color: '#10B981', 
    letterSpacing: 4 
  },
  subtitle: { 
    color: '#94A3B8', 
    marginBottom: 45, 
    fontSize: 12, 
    textTransform: 'uppercase', 
    letterSpacing: 1.5 
  },
  langRow: { 
    flexDirection: 'row', 
    marginBottom: 45, 
    backgroundColor: '#1E293B', 
    padding: 6, 
    borderRadius: 14 
  },
  langBtn: { 
    paddingVertical: 10, 
    paddingHorizontal: 22, 
    borderRadius: 10 
  },
  langText: { 
    fontWeight: '700', 
    fontSize: 14 
  },
  activeLang: { 
    backgroundColor: '#38BDF8', // Cyan accent for the selected language
  },
  loginBtn: { 
    backgroundColor: '#10B981', 
    width: '90%', 
    padding: 22, 
    borderRadius: 18, 
    alignItems: 'center', 
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8 
  },
  loginBtnText: { 
    color: '#0F172A', 
    fontWeight: '900', 
    fontSize: 18, 
    letterSpacing: 1.2 
  },
  registerLink: {
    marginTop: 30,
    padding: 10,
  },
  registerText: {
    color: '#94A3B8',
    fontSize: 15,
  },
  registerHighlight: {
    color: '#10B981',
    fontWeight: 'bold',
  },
  footerText: { 
    color: '#475569', 
    fontSize: 11, 
    position: 'absolute',
    bottom: 30,
    fontWeight: '600'
  }
});