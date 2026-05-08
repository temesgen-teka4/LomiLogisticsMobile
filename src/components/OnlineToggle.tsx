import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Colors } from '../theme/Colors';

interface Props {
  isOnline: boolean;
  onToggle: (value: boolean) => void;
}

export default function OnlineToggle({ isOnline, onToggle }: Props) {
  return (
    <View style={[styles.container, { borderColor: isOnline ? Colors.primaryDim : Colors.border }]}>
      <View style={[styles.statusDot, { backgroundColor: isOnline ? Colors.primary : Colors.textFaint }]} />
      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: isOnline ? Colors.primary : Colors.textMuted }]}>
          {isOnline ? 'You are Online' : 'You are Offline'}
        </Text>
        <Text style={styles.sub}>
          {isOnline ? 'Waiting for new deliveries…' : 'Go online to start earning'}
        </Text>
      </View>
      <Switch
        trackColor={{ false: Colors.border, true: Colors.primary }}
        thumbColor="#fff"
        ios_backgroundColor={Colors.border}
        onValueChange={onToggle}
        value={isOnline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  textBlock: { flex: 1 },
  title: { fontSize: 15, fontWeight: '700' },
  sub: { fontSize: 12, color: Colors.textFaint, marginTop: 2 },
});
