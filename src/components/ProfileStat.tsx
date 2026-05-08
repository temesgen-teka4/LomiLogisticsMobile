import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/Colors';

interface Props {
  label: string;
  value: string;
  icon: string;
}

export default function ProfileStat({ label, value, icon }: Props) {
  return (
    <View style={styles.item}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { alignItems: 'center', flex: 1 },
  icon: { fontSize: 22, marginBottom: 6 },
  value: { fontSize: 17, fontWeight: 'bold', color: Colors.text },
  label: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
});
