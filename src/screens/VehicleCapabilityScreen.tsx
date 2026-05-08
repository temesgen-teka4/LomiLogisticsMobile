import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  StatusBar 
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'VehicleCapability'>;
};

const CAPABILITIES = [
  { 
    id: 'small', 
    name: 'Light Load', 
    desc: 'Up to 3 Tons (Pickup / Mini)', 
    icon: '🛻',
    color: '#10B981' 
  },
  { 
    id: 'medium', 
    name: 'Medium Load', 
    desc: '5 - 10 Tons (Isuzu NHR/FSR)', 
    icon: '🚛',
    color: '#3B82F6' 
  },
  { 
    id: 'heavy', 
    name: 'Heavy Load', 
    desc: '20+ Tons (Sino / Trailer)', 
    icon: '🚜',
    color: '#F59E0B' 
  },
] as const;

export default function VehicleCapabilityScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerSection}>
          <Text style={styles.header}>What is your truck's capability?</Text>
          <Text style={styles.subHeader}>Select your category to see matching jobs.</Text>
        </View>
        
        {CAPABILITIES.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.capCard}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Dashboard', { vehicleType: item.id })}
          >
            <View style={[styles.iconCircle, { backgroundColor: item.color + '22' }]}>
              <Text style={styles.emoji}>{item.icon}</Text>
            </View>
            
            <View style={styles.textContainer}>
              <Text style={styles.capName}>{item.name}</Text>
              <Text style={styles.capDesc}>{item.desc}</Text>
            </View>
            
            <Text style={styles.arrow}>〉</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtnText}>Change Language</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0F172A' 
  },
  scrollContent: { 
    padding: 24, 
    paddingBottom: 40 
  },
  headerSection: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center'
  },
  header: { 
    color: '#FFF', 
    fontSize: 26, 
    fontWeight: '800', 
    textAlign: 'center' 
  },
  subHeader: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center'
  },
  capCard: { 
    flexDirection: 'row', 
    backgroundColor: '#1E293B', 
    padding: 20, 
    borderRadius: 24, 
    marginBottom: 16, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconCircle: { 
    width: 64, 
    height: 64, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 16 
  },
  emoji: { 
    fontSize: 32 
  },
  textContainer: {
    flex: 1
  },
  capName: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: '700' 
  },
  capDesc: { 
    color: '#94A3B8', 
    fontSize: 13, 
    marginTop: 4 
  },
  arrow: {
    color: '#475569',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8
  },
  backBtn: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10
  },
  backBtnText: {
    color: '#64748B',
    fontSize: 14,
    textDecorationLine: 'underline'
  }
});