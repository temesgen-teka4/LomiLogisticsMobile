import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  SafeAreaView, TextInput, StatusBar, RefreshControl, Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useTasks } from '../context/TaskContext';
import { useLanguage } from '../context/LanguageContext';
import { Colors } from '../theme/Colors';
import { Task, RootStackParamList } from '../types';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Dashboard'>;
  route: RouteProp<RootStackParamList, 'Dashboard'>;
};

const STATUS_COLOR: Record<string, string> = {
  Pending: '#38BDF8',
  'In Progress': '#F59E0B',
  Completed: '#10B981',
};

export default function DashboardScreen({ navigation, route }: Props) {
  const { tasks } = useTasks();
  const { t, locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // 1. Get the vehicle type passed from the selection screen
  const vehicleType = route.params?.vehicleType || 'medium';

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  // 2. Logic: Filter tasks by Search AND Vehicle Capacity
  const filteredTasks = useMemo(() => 
    tasks.filter(task => {
      // Don't show completed jobs in the main feed
      if (task.status === 'Completed') return false;

      // Filter by Search Text
      const q = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        task.customer.toLowerCase().includes(q) || 
        task.location.toLowerCase().includes(q);
      
      if (!matchesSearch) return false;

      // Filter by Vehicle Weight Limit
      // Clean the weight string (e.g., "5 Tons" -> 5)
      const numericWeight = parseFloat(String(task.weight).replace(/[^0-9.]/g, '') || '0');

      if (vehicleType === 'small' && numericWeight > 3) return false;
      if (vehicleType === 'medium' && numericWeight > 10) return false;
      // 'heavy' sees all jobs
      
      return true;
    }), 
  [tasks, searchQuery, vehicleType]);

  const renderTask = ({ item }: { item: Task }) => {
    const statusColor = STATUS_COLOR[item.status] || Colors.primary;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Details', { task: item })}
        activeOpacity={0.7}
      >
        <View style={[styles.statusLine, { backgroundColor: statusColor }]} />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.customer}>{item.customer}</Text>
            <Text style={styles.price}>{item.price} ETB</Text>
          </View>
          
          <Text style={styles.location}>📍 {item.location}</Text>

          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>⚖️ {item.weight}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>📦 {item.loadType}</Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <Text style={[styles.statusText, { color: statusColor }]}>● {item.status}</Text>
            <Text style={styles.viewLink}>View Details →</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hello, Driver</Text>
          <Text style={styles.modeIndicator}>
            Mode: <Text style={{ color: '#38BDF8', fontWeight: 'bold' }}>{vehicleType.toUpperCase()}</Text>
          </Text>
        </View>
        <TouchableOpacity 
            style={styles.changeBtn} 
            onPress={() => navigation.navigate('VehicleCapability')}
        >
          <Text style={styles.changeBtnText}>🔄 Change Truck</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search locations or customers..."
          placeholderTextColor="#64748B"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10B981" />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No loads found for {vehicleType} capacity.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: { 
    padding: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  welcomeText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  modeIndicator: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  changeBtn: { backgroundColor: '#1E293B', padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#334155' },
  changeBtnText: { color: '#FFF', fontSize: 11, fontWeight: '600' },
  searchBar: { 
    backgroundColor: '#1E293B', 
    margin: 20, 
    marginTop: 0, 
    borderRadius: 12, 
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#334155'
  },
  input: { color: '#FFF', height: 45 },
  list: { padding: 20, paddingTop: 0 },
  card: { 
    backgroundColor: '#1E293B', 
    borderRadius: 16, 
    marginBottom: 15, 
    flexDirection: 'row', 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155'
  },
  statusLine: { width: 5 },
  cardContent: { flex: 1, padding: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  customer: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  price: { color: '#10B981', fontSize: 16, fontWeight: '800' },
  location: { color: '#94A3B8', fontSize: 13, marginBottom: 12 },
  tagRow: { flexDirection: 'row', gap: 8, marginBottom: 15 },
  tag: { backgroundColor: '#0F172A', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  tagText: { color: '#64748B', fontSize: 11, fontWeight: '600' },
  cardFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    borderTopWidth: 1, 
    borderTopColor: '#334155', 
    paddingTop: 10 
  },
  statusText: { fontSize: 12, fontWeight: '700' },
  viewLink: { color: '#38BDF8', fontSize: 12, fontWeight: '700' },
  empty: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#64748B' }
});