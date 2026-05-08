import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/Colors';

interface Props {
  region?: { latitude?: number; longitude?: number };
  title?: string;
}

export default function LomiMap({ region, title }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.pin}>📍</Text>
      <Text style={styles.title}>{title ?? 'Delivery Location'}</Text>
      <Text style={styles.coords}>
        {region?.latitude?.toFixed(5)}, {region?.longitude?.toFixed(5)}
      </Text>
      <Text style={styles.note}>Native maps are unavailable in web preview</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  pin: { fontSize: 36, marginBottom: 4 },
  title: { color: Colors.text, fontWeight: 'bold', fontSize: 15 },
  coords: { color: Colors.textMuted, fontSize: 12 },
  note: { color: Colors.textFaint, fontSize: 11, marginTop: 8 },
});
