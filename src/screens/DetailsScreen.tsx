import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Modal,
  TextInput, Alert, ScrollView, Linking, Platform,
  SafeAreaView, StatusBar, Dimensions,
} from 'react-native';
// UPDATED: Standardizing to StackNavigationProp for consistency
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useTasks } from '../context/TaskContext';
import { useLanguage } from '../context/LanguageContext';
import MapComponent from '../components/LomiMap';
import StatusStepper from '../components/StatusStepper';
// Ensure these color constants match your dark theme
import { Colors } from '../theme/Colors'; 
import { RootStackParamList } from '../types';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Details'>;
  route: RouteProp<RootStackParamList, 'Details'>;
};

const { height } = Dimensions.get('window');

const STEP_ACTIONS = ['Confirm Pickup', 'Start Navigation', 'Arrived at Location', 'Finish Task'];
const STEP_ICONS   = ['📦', '🗺️', '📍', '✅'];

export default function DetailsScreen({ route, navigation }: Props) {
  const { completeTask } = useTasks();
  const { t } = useLanguage();
  
  // The task is passed via route.params from Dashboard
  const task = route.params?.task;

  const [modalVisible, setModalVisible] = useState(false);
  const [receiverName, setReceiverName] = useState('');
  const [deliveryStep, setDeliveryStep] = useState(0);

  // GPS helper for Addis Ababa navigation
  const openGPS = () => {
    // Defaulting to Addis coordinates if missing
    const lat   = task?.latitude  ?? 9.02497;
    const lon   = task?.longitude ?? 38.74689;
    const label = encodeURIComponent(task?.customer ?? 'Delivery Location');

    const url = Platform.select({
      ios:     `maps:0,0?q=${label}@${lat},${lon}`,
      android: `geo:${lat},${lon}?q=${lat},${lon}(${label})`,
    })!;

    Linking.canOpenURL(url)
      .then(supported =>
        Linking.openURL(
          supported ? url : `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
        )
      )
      .catch(err => console.error('GPS Error:', err));
  };

  const handleProgress = () => {
    if (deliveryStep === 1) {
      openGPS();
      setDeliveryStep(2);
    } else if (deliveryStep < 3) {
      setDeliveryStep(prev => prev + 1);
    } else {
      setModalVisible(true);
    }
  };

  const handleFinalComplete = () => {
    if (receiverName.trim().length < 2) {
      Alert.alert('LOMI', t('receiverNameError') || 'Please enter a valid name');
      return;
    }
    completeTask(task.id);
    setModalVisible(false);
    
    // Redirect back to Dashboard after completion
    navigation.popToTop(); 
  };

  if (!task) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ color: '#FFF', padding: 20 }}>Task details not found.</Text>
      </SafeAreaView>
    );
  }

  const isLastStep = deliveryStep === STEP_ACTIONS.length - 1;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

        {/* Map Header */}
        <TouchableOpacity activeOpacity={0.9} onPress={openGPS} style={styles.mapWrap}>
          <MapComponent
            region={{
              latitude:  task.latitude  ?? 9.02497,
              longitude: task.longitude ?? 38.74689,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            title={task.customer}
          />
          <View style={styles.mapBadge}>
            <Text style={styles.mapBadgeText}>📍 Tap for Google Maps</Text>
          </View>
          
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={styles.content}>
          {/* Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardRow}>
              <Text style={styles.customerName}>{task.customer}</Text>
              <View style={styles.priceBadge}>
                <Text style={styles.priceText}>{task.price} ETB</Text>
              </View>
            </View>
            <Text style={styles.locationText}>📍 {task.location}</Text>
            <View style={styles.specRow}>
               <Text style={styles.specText}>⚖️ {task.weight}</Text>
               <Text style={styles.specText}>📦 {task.loadType}</Text>
            </View>
          </View>

          {/* Contact Actions */}
          <View style={styles.contactRow}>
            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => Linking.openURL(`tel:${task.phone || '0911000000'}`)}
            >
              <Text style={styles.callBtnText}>📞 {t('call')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.smsBtn}
              onPress={() => Linking.openURL(`sms:${task.phone || '0911000000'}`)}
            >
              <Text style={styles.smsBtnText}>💬 {t('message')}</Text>
            </TouchableOpacity>
          </View>

          {/* Progress Tracker */}
          <Text style={styles.sectionLabel}>{t('currentStatus')}</Text>
          <StatusStepper currentStep={deliveryStep} />

          {/* Main Action Button */}
          <TouchableOpacity
            style={[styles.ctaBtn, isLastStep && styles.ctaBtnFinish]}
            onPress={handleProgress}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaIcon}>{STEP_ICONS[deliveryStep]}</Text>
            <Text style={styles.ctaText}>{STEP_ACTIONS[deliveryStep].toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Completion Modal */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{t('confirmDelivery')}</Text>
            <Text style={styles.modalSub}>Job ID: {task.id}</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Receiver Name"
              value={receiverName}
              onChangeText={setReceiverName}
              placeholderTextColor="#64748B"
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>{t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFinalComplete} style={styles.confirmBtn}>
                <Text style={styles.confirmText}>{t('confirm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F172A' },
  mapWrap: { height: height * 0.32, position: 'relative' },
  mapBadge: {
    position: 'absolute', bottom: 16, alignSelf: 'center',
    backgroundColor: '#38BDF8', paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20,
  },
  mapBadgeText: { color: '#0F172A', fontWeight: '700', fontSize: 12 },
  backBtn: {
    position: 'absolute', top: 16, left: 16,
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    justifyContent: 'center', alignItems: 'center',
  },
  backBtnText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  infoCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20, padding: 20,
    borderWidth: 1, borderColor: '#334155',
    marginBottom: 16,
  },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  customerName: { color: '#FFF', fontSize: 22, fontWeight: '800', flex: 1 },
  priceBadge: { backgroundColor: '#10B98122', padding: 8, borderRadius: 10 },
  priceText: { color: '#10B981', fontWeight: '700' },
  locationText: { color: '#94A3B8', fontSize: 14 },
  specRow: { flexDirection: 'row', gap: 15, marginTop: 12 },
  specText: { color: '#64748B', fontSize: 12, fontWeight: '600' },
  contactRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  callBtn: { flex: 1, backgroundColor: '#10B981', padding: 16, borderRadius: 16, alignItems: 'center' },
  smsBtn: { flex: 1, backgroundColor: '#1E293B', padding: 16, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  callBtnText: { color: '#FFF', fontWeight: '700' },
  smsBtnText: { color: '#38BDF8', fontWeight: '700' },
  sectionLabel: { color: '#475569', fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 12 },
  ctaBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#38BDF8', padding: 20, borderRadius: 18, gap: 10 },
  ctaBtnFinish: { backgroundColor: '#10B981' },
  ctaIcon: { fontSize: 20 },
  ctaText: { color: '#0F172A', fontWeight: '900', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: '85%', backgroundColor: '#1E293B', padding: 25, borderRadius: 25, borderWidth: 1, borderColor: '#334155' },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#FFF', textAlign: 'center', marginBottom: 15 },
  modalSub: { color: '#94A3B8', textAlign: 'center', marginBottom: 15, fontSize: 12 },
  modalInput: { backgroundColor: '#0F172A', borderRadius: 12, padding: 15, color: '#FFF', marginBottom: 20, borderWidth: 1, borderColor: '#334155' },
  modalActions: { flexDirection: 'row', gap: 10 },
  cancelBtn: { flex: 1, padding: 15, borderRadius: 12, backgroundColor: '#334155', alignItems: 'center' },
  cancelText: { color: '#94A3B8', fontWeight: '600' },
  confirmBtn: { flex: 1, padding: 15, borderRadius: 12, backgroundColor: '#10B981', alignItems: 'center' },
  confirmText: { color: '#FFF', fontWeight: '800' },
});