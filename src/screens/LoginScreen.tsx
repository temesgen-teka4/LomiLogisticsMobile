import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Text style={styles.logo}>LOMI</Text>
      
      <Text style={styles.subtitle}>Logistics Management Interface</Text>
      
      <View style={styles.langRow}>
        <TouchableOpacity 
          style={[styles.langBtn, locale === 'en' && styles.activeLang]} 
          onPress={() => setLocale('en')}
        >
          <Text style={[styles.langText, { color: locale === 'en' ? '#0F172A' : '#fff' }]}>English</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.langBtn, locale === 'am' && styles.activeLang]} 
          onPress={() => setLocale('am')}
        >
          <Text style={[styles.langText, { color: locale === 'am' ? '#0F172A' : '#fff' }]}>አማርኛ</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.loginBtn} 
        // UPDATED: Now points directly to VehicleCapability
        onPress={() => navigation.navigate('VehicleCapability')} 
      >
        <Text style={styles.loginBtnText}>{t('login')}</Text>
      </TouchableOpacity>
      
      <Text style={styles.footerText}>Safaricom Ethiopia Network Active 📶</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0F172A', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logo: { 
    fontSize: 64, 
    fontWeight: '900', 
    color: '#10B981', 
    letterSpacing: 4 
  },
  subtitle: { 
    color: '#94A3B8', 
    marginBottom: 40, 
    fontSize: 12, 
    textTransform: 'uppercase', 
    letterSpacing: 1 
  },
  langRow: { 
    flexDirection: 'row', 
    marginBottom: 40, 
    backgroundColor: '#1E293B', 
    padding: 6, 
    borderRadius: 12 
  },
  langBtn: { 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 10 
  },
  langText: { 
    fontWeight: '600', 
    fontSize: 14 
  },
  activeLang: { 
    backgroundColor: '#38BDF8' 
  },
  loginBtn: { 
    backgroundColor: '#10B981', 
    width: '85%', 
    padding: 20, 
    borderRadius: 18, 
    alignItems: 'center', 
    elevation: 5 
  },
  loginBtnText: { 
    color: '#0F172A', 
    fontWeight: '900', 
    fontSize: 18, 
    letterSpacing: 1 
  },
  footerText: { 
    color: '#475569', 
    fontSize: 11, 
    marginTop: 30 
  }
});