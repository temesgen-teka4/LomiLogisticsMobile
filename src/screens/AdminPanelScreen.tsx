import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminPanelScreen({ navigation }: any) {
  const [userList, setUserList] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        // Filter keys to find only our registered users
        const userKeys = keys.filter(k => k.startsWith('user_'));
        const result = await AsyncStorage.multiGet(userKeys);
        
        const parsed = result.map(([key, val]) => JSON.parse(val || '{}'));
        setUserList(parsed);
      } catch (e) {
        console.error("Storage Error", e);
      }
    };
    loadData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ color: '#10B981', fontSize: 24, fontWeight: 'bold' }}>Admin Dashboard</Text>
        <Text style={{ color: '#94A3B8', marginBottom: 20 }}>Registered Drivers in Local Storage</Text>
        
        <FlatList
          data={userList}
          keyExtractor={(item) => item.email}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>Email: {item.email}</Text>
              <Text style={styles.detail}>Plate: {item.plate}</Text>
              <Text style={styles.pass}>Password: {item.password}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{color: '#475569'}}>No users found. Register someone first!</Text>}
        />
        
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btn}>
          <Text style={{ color: '#0F172A', fontWeight: 'bold' }}>Close Admin Panel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1E293B', padding: 15, borderRadius: 10, marginBottom: 10 },
  name: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  detail: { color: '#94A3B8', fontSize: 14 },
  pass: { color: '#10B981', fontSize: 12, marginTop: 5 },
  btn: { backgroundColor: '#10B981', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 }
});