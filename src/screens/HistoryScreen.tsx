import React from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  SafeAreaView, StatusBar,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTasks } from '../context/TaskContext';
import { useLanguage } from '../context/LanguageContext';
import { Colors } from '../theme/Colors';
import { Task, RootStackParamList } from '../types';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'History'>;
};

export default function HistoryScreen({ navigation }: Props) {
  const { tasks } = useTasks();
  const { t } = useLanguage();

  const completed = tasks.filter(task => task.status === 'Completed');
  const totalEarnings = completed.reduce((sum, task) => sum + Number(task.price), 0);

  const renderItem = ({ item, index }: { item: Task; index: number }) => (
    <View style={styles.card}>
      <View style={styles.indexBadge}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          <Text style={styles.custName}>{item.customer}</Text>
          <Text style={styles.cardPrice}>+{item.price} ETB</Text>
        </View>
        <Text style={styles.locText}>📍 {item.location}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.dateText}>
            {item.completedAt
              ? new Date(item.completedAt).toLocaleDateString('en-GB', {
                  day: '2-digit', month: 'short', year: 'numeric',
                })
              : 'Recently'}
          </Text>
          <View style={styles.paidBadge}>
            <Text style={styles.paidText}>PAID</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          {/* These keys are now valid because we updated the LanguageContext */}
          <Text style={styles.backText}>← {t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t('earningsHistory')}</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>{t('totalEarned')}</Text>
        <Text style={styles.summaryValue}>
          {totalEarnings.toLocaleString()}
          <Text style={styles.currency}> ETB</Text>
        </Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {completed.length} {t('deliveries')}
          </Text>
        </View>
      </View>

      <FlatList
        data={completed}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyEmoji}>📦</Text>
            <Text style={styles.emptyText}>{t('noHistory')}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  backBtn: { minWidth: 60 },
  backText: { color: Colors.primary, fontWeight: '700' },
  title: { color: Colors.text, fontSize: 17, fontWeight: '800' },
  summaryCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: 20, marginBottom: 8,
    padding: 28, borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  summaryLabel: { color: Colors.textMuted, fontSize: 11, textTransform: 'uppercase', letterSpacing: 2 },
  summaryValue: { color: Colors.primary, fontSize: 40, fontWeight: '900', marginVertical: 8 },
  currency: { fontSize: 18, color: Colors.primary },
  countBadge: { backgroundColor: Colors.primary + '22', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 10 },
  countText: { color: Colors.primary, fontWeight: '700', fontSize: 13 },
  list: { padding: 20 },
  card: { flexDirection: 'row', backgroundColor: Colors.surface, borderRadius: 18, marginBottom: 12, padding: 16, gap: 14, borderWidth: 1, borderColor: Colors.border },
  indexBadge: { width: 32, height: 32, borderRadius: 10, backgroundColor: Colors.bg, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  indexText: { color: Colors.textMuted, fontSize: 12, fontWeight: '700' },
  cardBody: { flex: 1 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  custName: { color: Colors.text, fontSize: 15, fontWeight: '700', flex: 1, marginRight: 8 },
  cardPrice: { color: Colors.primary, fontWeight: '800', fontSize: 15 },
  locText: { color: Colors.textMuted, fontSize: 13, marginTop: 4 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.border },
  dateText: { color: Colors.textFaint, fontSize: 11 },
  paidBadge: { backgroundColor: Colors.primary + '22', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 6 },
  paidText: { color: Colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  emptyWrap: { alignItems: 'center', marginTop: 80 },
  emptyEmoji: { fontSize: 48 },
  emptyText: { color: Colors.textMuted, marginTop: 12, fontSize: 15 },
});