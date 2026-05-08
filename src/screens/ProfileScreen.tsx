import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Switch, SafeAreaView, StatusBar, Alert,
} from 'react-native';
// Standardized to StackNavigationProp for consistency across the app
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';
import { Colors } from '../theme/Colors';
import { RootStackParamList, Driver } from '../types';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
  route: RouteProp<RootStackParamList, 'Profile'>;
};

const FALLBACK_DRIVER: Driver = {
  name: 'LOMI Driver',
  id: 'DRV-000',
  email: 'driver@lomi.et',
  phone: '0900000000',
  rating: 5.0,
  totalJobs: 0,
  vehicleType: 'N/A', // Matches our updated types/index.ts
  licensePlate: 'N/A', // Matches our updated types/index.ts
};

export default function ProfileScreen({ route, navigation }: Props) {
  // Pulling driver from params or using the fallback
  const driver = route?.params?.driver ?? FALLBACK_DRIVER;
  const { t, locale, setLocale } = useLanguage();

  const [notifications, setNotifications] = useState(true);

  const handleSignOut = () => {
    Alert.alert(
      t('signOut') || 'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: t('cancel') || 'Cancel', style: 'cancel' },
        { 
          text: t('signOut') || 'Sign Out', 
          style: 'destructive', 
          onPress: () => navigation.replace('Login') // Using replace so they can't go back
        },
      ]
    );
  };

  const renderRow = (label: string, value?: string | number, isToggle = false, onToggle?: (v: boolean) => void) => (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      {isToggle ? (
        <Switch
          value={notifications}
          onValueChange={onToggle}
          trackColor={{ false: '#334155', true: '#10B981' }}
          thumbColor="#fff"
        />
      ) : (
        <Text style={styles.rowValue}>{value}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Nav bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Dashboard</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>{t('settings')}</Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Profile header */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{driver.name.charAt(0)}</Text>
            </View>
            <View style={styles.onlineDot} />
          </View>
          <Text style={styles.driverName}>{driver.name}</Text>
          <Text style={styles.driverId}>Driver ID: {driver.id}</Text>

          {/* Stats */}
          <div style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>{driver.rating} ⭐</Text>
              <Text style={styles.statLbl}>{t('rating')}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statVal}>{driver.totalJobs}</Text>
              <Text style={styles.statLbl}>{t('jobs')}</Text>
            </View>
          </div>
        </View>

        {/* Account details */}
        <Text style={styles.sectionHeader}>{t('accountDetails')}</Text>
        <View style={styles.group}>
          {renderRow(t('email'),   driver.email)}
          {renderRow(t('vehicle'), driver.vehicleType)}
          {renderRow(t('plate'),   driver.licensePlate)}
        </View>

        {/* App preferences */}
        <Text style={styles.sectionHeader}>{t('appPreferences')}</Text>
        <View style={styles.group}>
          {renderRow(t('notifications'), undefined, true, setNotifications)}
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{t('language')}</Text>
            <View style={styles.langToggle}>
              {(['en', 'am'] as const).map(lang => (
                <TouchableOpacity
                  key={lang}
                  style={[styles.langBtn, locale === lang && styles.langBtnActive]}
                  onPress={() => setLocale(lang)}
                >
                  <Text style={[styles.langText, locale === lang && styles.langTextActive]}>
                    {lang === 'en' ? 'EN' : 'አማ'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Sign out */}
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut} activeOpacity={0.8}>
          <Text style={styles.signOutText}>🚪 {t('signOut')}</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F172A' },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  backBtn: { minWidth: 80 },
  backText: { color: '#38BDF8', fontWeight: '700' },
  navTitle: { color: '#FFF', fontWeight: '800', fontSize: 16 },
  profileCard: {
    backgroundColor: '#1E293B',
    marginHorizontal: 20, marginBottom: 8,
    padding: 24, borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1, borderColor: '#334155',
  },
  avatarWrap: { position: 'relative', marginBottom: 14 },
  avatar: {
    width: 80, height: 80, borderRadius: 24,
    backgroundColor: '#38BDF822',
    borderWidth: 2, borderColor: '#38BDF8',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 30, color: '#38BDF8', fontWeight: '900' },
  onlineDot: {
    position: 'absolute', bottom: 2, right: 2,
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2, borderColor: '#1E293B',
  },
  driverName: { color: '#FFF', fontSize: 22, fontWeight: '800' },
  driverId: { color: '#94A3B8', fontSize: 13, marginTop: 4, marginBottom: 20 },
  statsRow: {
    flexDirection: 'row', width: '100%',
    backgroundColor: '#0F172A',
    borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#334155',
  },
  statBox: { flex: 1, alignItems: 'center' },
  statVal: { color: '#10B981', fontWeight: '800', fontSize: 18 },
  statLbl: { color: '#94A3B8', fontSize: 11, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: '#334155' },
  sectionHeader: {
    color: '#475569', fontSize: 10, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 2,
    marginHorizontal: 24, marginTop: 20, marginBottom: 8,
  },
  group: {
    backgroundColor: '#1E293B',
    marginHorizontal: 20, borderRadius: 18,
    borderWidth: 1, borderColor: '#334155',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 18, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: '#334155',
  },
  rowLabel: { color: '#FFF', fontSize: 15 },
  rowValue: { color: '#94A3B8', fontSize: 14 },
  langToggle: {
    flexDirection: 'row', gap: 6,
    backgroundColor: '#0F172A', borderRadius: 10, padding: 4,
  },
  langBtn: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  langBtnActive: { backgroundColor: '#38BDF822' },
  langText: { color: '#94A3B8', fontWeight: '600', fontSize: 12 },
  langTextActive: { color: '#38BDF8' },
  signOutBtn: {
    margin: 20, marginTop: 24, padding: 18,
    backgroundColor: '#EF444422',
    borderRadius: 16, alignItems: 'center',
    borderWidth: 1, borderColor: '#EF444444',
  },
  signOutText: { color: '#EF4444', fontWeight: '800', fontSize: 15 },
});