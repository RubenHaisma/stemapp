import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import { useState, useEffect } from 'react';
import { Trophy, CircleCheck as CheckCircle, Circle as XCircle, Minus, RotateCcw } from 'lucide-react-native';
import type { PartyMatch } from '@/lib/types';
import { useRouter } from 'expo-router';

export default function ResultsScreen() {
  const { responses, calculateResults, resetQuestionnaire, statements } = useQuestionnaire();
  const [results, setResults] = useState<PartyMatch[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (responses.size > 0) {
      const calculatedResults = calculateResults();
      setResults(calculatedResults);
    }
  }, [responses]);

  if (responses.size === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Nog geen resultaten</Text>
        <Text style={styles.emptyText}>
          Beantwoord eerst de stellingen om te zien welke partijen bij jou passen
        </Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push('/(tabs)/questionnaire')}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>Start De StemAPP</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const topMatch = results[0];
  const answeredCount = Array.from(responses.values()).filter(r => r.response !== 'skip').length;

  const handleReset = () => {
    resetQuestionnaire();
    router.push('/(tabs)/questionnaire');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Trophy size={48} color="#f59e0b" />
          <Text style={styles.headerTitle}>Jouw resultaten</Text>
          <Text style={styles.headerSubtitle}>
            Gebaseerd op {answeredCount} beantwoorde {answeredCount === 1 ? 'stelling' : 'stellingen'}
          </Text>
        </View>
      </View>

      {topMatch && (
        <View style={styles.topMatchCard}>
          <View style={styles.topMatchBadge}>
            <Text style={styles.topMatchBadgeText}>Beste match</Text>
          </View>
          <Text style={styles.topMatchName}>{topMatch.party.name}</Text>
          <Text style={styles.topMatchAbbr}>({topMatch.party.abbreviation})</Text>
          <View style={styles.topMatchScore}>
            <Text style={styles.topMatchPercentage}>{Math.round(topMatch.percentage)}%</Text>
            <Text style={styles.topMatchLabel}>Overeenkomst</Text>
          </View>
          <View style={styles.topMatchStats}>
            <View style={styles.topMatchStat}>
              <CheckCircle size={20} color="#10b981" />
              <Text style={styles.topMatchStatText}>{topMatch.agreements} eens</Text>
            </View>
            <View style={styles.topMatchStat}>
              <XCircle size={20} color="#ef4444" />
              <Text style={styles.topMatchStatText}>{topMatch.disagreements} oneens</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.allResultsSection}>
        <Text style={styles.sectionTitle}>Alle partijen</Text>
        <View style={styles.resultsList}>
          {results.map((result, index) => (
            <View key={result.party.id} style={styles.resultCard}>
              <View style={styles.resultRank}>
                <Text style={styles.resultRankText}>{index + 1}</Text>
              </View>
              <View style={styles.resultInfo}>
                <Text style={styles.resultName}>{result.party.abbreviation}</Text>
                <Text style={styles.resultFullName} numberOfLines={1}>
                  {result.party.name}
                </Text>
                <View style={styles.resultStats}>
                  <View style={styles.resultStat}>
                    <CheckCircle size={14} color="#10b981" />
                    <Text style={styles.resultStatText}>{result.agreements}</Text>
                  </View>
                  <View style={styles.resultStat}>
                    <XCircle size={14} color="#ef4444" />
                    <Text style={styles.resultStatText}>{result.disagreements}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.resultPercentageContainer}>
                <Text style={styles.resultPercentage}>{Math.round(result.percentage)}%</Text>
                <View style={styles.resultBarContainer}>
                  <View
                    style={[
                      styles.resultBar,
                      {
                        width: `${result.percentage}%`,
                        backgroundColor: result.party.color || '#1e40af',
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
          activeOpacity={0.8}
        >
          <RotateCcw size={20} color="#ffffff" />
          <Text style={styles.resetButtonText}>Opnieuw beginnen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.partiesButton}
          onPress={() => router.push('/(tabs)/parties')}
          activeOpacity={0.8}
        >
          <Text style={styles.partiesButtonText}>Bekijk alle partijen</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          De StemAPP is bedoeld als hulpmiddel en vervangt niet je eigen onderzoek naar
          politieke partijen en hun standpunten.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#f9fafb',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#1e40af',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6b7280',
    marginTop: 4,
  },
  topMatchCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#fef3c7',
  },
  topMatchBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  topMatchBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#d97706',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  topMatchName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  topMatchAbbr: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  topMatchScore: {
    alignItems: 'center',
    marginBottom: 20,
  },
  topMatchPercentage: {
    fontSize: 56,
    fontWeight: '700',
    color: '#1e40af',
  },
  topMatchLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  topMatchStats: {
    flexDirection: 'row',
    gap: 24,
  },
  topMatchStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  topMatchStatText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  allResultsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  resultsList: {
    gap: 12,
  },
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resultRank: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultRankText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6b7280',
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  resultFullName: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 6,
  },
  resultStats: {
    flexDirection: 'row',
    gap: 12,
  },
  resultStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resultStatText: {
    fontSize: 12,
    color: '#6b7280',
  },
  resultPercentageContainer: {
    alignItems: 'flex-end',
  },
  resultPercentage: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 4,
  },
  resultBarContainer: {
    width: 60,
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  resultBar: {
    height: '100%',
    borderRadius: 3,
  },
  actionsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  resetButton: {
    backgroundColor: '#ef4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  partiesButton: {
    backgroundColor: '#1e40af',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  partiesButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  disclaimer: {
    backgroundColor: '#fef3c7',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
  },
  disclaimerText: {
    fontSize: 13,
    color: '#92400e',
    lineHeight: 20,
    textAlign: 'center',
  },
});
