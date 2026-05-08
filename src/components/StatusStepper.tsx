import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/Colors';

interface Props {
  currentStep: number;
}

const STEPS = [
  { label: 'Assigned',    desc: 'Task assigned to you' },
  { label: 'Picked Up',   desc: 'Package in your vehicle' },
  { label: 'On the Way',  desc: 'Driving to customer' },
  { label: 'Delivered',   desc: 'Job completed' },
];

export default function StatusStepper({ currentStep }: Props) {
  return (
    <View style={styles.container}>
      {STEPS.map((step, index) => {
        const isDone    = index < currentStep;
        const isActive  = index === currentStep;
        const isPending = index > currentStep;

        return (
          <View key={index} style={styles.row}>
            {/* Indicator column */}
            <View style={styles.indicatorCol}>
              <View style={[
                styles.dot,
                isDone   && styles.dotDone,
                isActive && styles.dotActive,
                isPending && styles.dotPending,
              ]}>
                {isDone && <Text style={styles.checkmark}>✓</Text>}
                {isActive && <View style={styles.innerDot} />}
              </View>
              {index < STEPS.length - 1 && (
                <View style={[styles.line, isDone && styles.lineDone]} />
              )}
            </View>

            {/* Text column */}
            <View style={styles.textCol}>
              <Text style={[styles.label, isPending && styles.labelMuted]}>
                {step.label}
              </Text>
              <Text style={styles.desc}>{step.desc}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const DOT_SIZE = 24;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceAlt,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  row: { flexDirection: 'row', minHeight: 64 },
  indicatorCol: { alignItems: 'center', width: DOT_SIZE, marginRight: 16 },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    zIndex: 1,
  },
  dotDone: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dotActive: {
    borderColor: Colors.accent,
    backgroundColor: Colors.surfaceAlt,
  },
  dotPending: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.border,
    marginVertical: 2,
  },
  lineDone: { backgroundColor: Colors.primary },
  textCol: { flex: 1, paddingBottom: 20 },
  label: { fontWeight: 'bold', fontSize: 14, color: Colors.text },
  labelMuted: { color: Colors.textFaint },
  desc: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
});
