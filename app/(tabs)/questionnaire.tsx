import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import { ThumbsUp, ThumbsDown, Minus, Star, ChevronRight, RotateCcw } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function QuestionnaireScreen() {
  const {
    statements,
    responses,
    currentIndex,
    setCurrentIndex,
    saveResponse,
    resetQuestionnaire,
    loading,
  } = useQuestionnaire();

  const router = useRouter();
  const [selectedImportance, setSelectedImportance] = useState<'normal' | 'important'>('normal');

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Stellingen laden...</Text>
      </View>
    );
  }

  if (statements.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Geen stellingen beschikbaar</Text>
      </View>
    );
  }

  const currentStatement = statements[currentIndex];
  const currentResponse = responses.get(currentStatement.id);
  const progress = ((currentIndex + 1) / statements.length) * 100;

  const handleResponse = async (response: 'agree' | 'disagree' | 'neutral' | 'skip') => {
    try {
      await saveResponse(currentStatement.id, response, selectedImportance);
      setSelectedImportance('normal');

      if (currentIndex < statements.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        router.push('/(tabs)/results');
      }
    } catch (error) {
      console.error('Kon antwoord niet opslaan', error);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      const prevStatement = statements[currentIndex - 1];
      const prevResponse = responses.get(prevStatement.id);
      if (prevResponse) {
        setSelectedImportance(prevResponse.importance);
      }
    }
  };

  const handleReset = () => {
    resetQuestionnaire();
    setSelectedImportance('normal');
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          Stelling {currentIndex + 1} van {statements.length}
        </Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{currentStatement.category}</Text>
        </View>

        <View style={styles.statementCard}>
          <Text style={styles.statementText}>{currentStatement.text}</Text>
        </View>

        <View style={styles.importanceSection}>
          <Text style={styles.sectionLabel}>Hoe belangrijk is deze stelling voor jou?</Text>
          <View style={styles.importanceButtons}>
            <TouchableOpacity
              style={[
                styles.importanceButton,
                selectedImportance === 'normal' && styles.importanceButtonActive,
              ]}
              onPress={() => setSelectedImportance('normal')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.importanceButtonText,
                  selectedImportance === 'normal' && styles.importanceButtonTextActive,
                ]}
              >
                Normaal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.importanceButton,
                styles.importanceButtonImportant,
                selectedImportance === 'important' && styles.importanceButtonImportantActive,
              ]}
              onPress={() => setSelectedImportance('important')}
              activeOpacity={0.7}
            >
              <Star
                size={16}
                color={selectedImportance === 'important' ? '#ffffff' : '#f59e0b'}
                fill={selectedImportance === 'important' ? '#ffffff' : 'none'}
              />
              <Text
                style={[
                  styles.importanceButtonText,
                  styles.importanceButtonImportantText,
                  selectedImportance === 'important' && styles.importanceButtonTextActive,
                ]}
              >
                Belangrijk
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.responseSection}>
          <Text style={styles.sectionLabel}>Wat is jouw mening?</Text>
          <View style={styles.responseButtons}>
            <TouchableOpacity
              style={[styles.responseButton, styles.agreeButton]}
              onPress={() => handleResponse('agree')}
              activeOpacity={0.8}
            >
              <ThumbsUp size={28} color="#ffffff" strokeWidth={2} />
              <Text style={styles.responseButtonText}>Eens</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.responseButton, styles.neutralButton]}
              onPress={() => handleResponse('neutral')}
              activeOpacity={0.8}
            >
              <Minus size={28} color="#ffffff" strokeWidth={2.5} />
              <Text style={styles.responseButtonText}>Neutraal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.responseButton, styles.disagreeButton]}
              onPress={() => handleResponse('disagree')}
              activeOpacity={0.8}
            >
              <ThumbsDown size={28} color="#ffffff" strokeWidth={2} />
              <Text style={styles.responseButtonText}>Oneens</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => handleResponse('skip')}
            activeOpacity={0.7}
          >
            <ChevronRight size={20} color="#6b7280" />
            <Text style={styles.skipButtonText}>Overslaan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
          activeOpacity={0.7}
        >
          <Text style={styles.navButtonText}>Vorige</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
          activeOpacity={0.7}
        >
          <RotateCcw size={20} color="#ef4444" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.resultsButton]}
          onPress={() => router.push('/(tabs)/results')}
          activeOpacity={0.7}
        >
          <Text style={[styles.navButtonText, styles.resultsButtonText]}>
            Bekijk resultaten
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  progressContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e40af',
  },
  statementCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 28,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    minHeight: 140,
    justifyContent: 'center',
  },
  statementText: {
    fontSize: 20,
    lineHeight: 32,
    color: '#111827',
    fontWeight: '500',
    textAlign: 'center',
  },
  importanceSection: {
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  importanceButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  importanceButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 6,
  },
  importanceButtonActive: {
    borderColor: '#1e40af',
    backgroundColor: '#1e40af',
  },
  importanceButtonImportant: {
    borderColor: '#f59e0b',
  },
  importanceButtonImportantActive: {
    backgroundColor: '#f59e0b',
  },
  importanceButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6b7280',
  },
  importanceButtonImportantText: {
    color: '#f59e0b',
  },
  importanceButtonTextActive: {
    color: '#ffffff',
  },
  responseSection: {
    marginBottom: 20,
  },
  responseButtons: {
    gap: 12,
  },
  responseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  agreeButton: {
    backgroundColor: '#10b981',
  },
  neutralButton: {
    backgroundColor: '#6b7280',
  },
  disagreeButton: {
    backgroundColor: '#ef4444',
  },
  responseButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 8,
    gap: 4,
  },
  skipButtonText: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '500',
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  resultsButton: {
    backgroundColor: '#1e40af',
  },
  resultsButtonText: {
    color: '#ffffff',
  },
  resetButton: {
    padding: 12,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
  },
});
