import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import { ThumbsUp, ThumbsDown, Minus, Star, ChevronRight, RotateCcw } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import GlassCard from '@/components/glass/GlassCard';
import GlassSection from '@/components/glass/GlassSection';
import GlassButton from '@/components/glass/GlassButton';

const { width, height } = Dimensions.get('window');

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

  const isSmall = width < 380 || height < 700;
  const sideButtonWidth = Math.max(
    100,
    Math.min(
      160,
      Math.floor((width - (isSmall ? 28 : 40) /* nav padding */ - (isSmall ? 16 : 24) /* gaps */ - 44 /* icon approx */) / 2)
    )
  );

  return (
    <View style={styles.container}>
      <GlassSection style={[styles.progressContainer, isSmall && { paddingVertical: 12, paddingHorizontal: 16 }]}>
        <View style={[styles.progressRow]}>
          <Text style={[styles.progressText, isSmall && { fontSize: 13 }]}>Stelling {currentIndex + 1}/{statements.length}</Text>
        </View>
        <View style={[styles.progressBar, isSmall && { height: 6 }]}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </GlassSection>

      <View style={styles.contentFixed}>
        <View style={[styles.topRow]}>
          <View style={styles.categoryBadge}>
            <Text style={[styles.categoryText, isSmall && { fontSize: 12 }]}>{currentStatement.category}</Text>
          </View>
        </View>

        <GlassCard style={[styles.statementCard, isSmall && { padding: 16 }]}> 
          <Text style={[styles.statementText, isSmall && { fontSize: 18, lineHeight: 26 }]}>
            {currentStatement.text}
          </Text>
        </GlassCard>

        <View style={[styles.importanceSection, isSmall && { marginBottom: 16 }]}>
          <Text style={[styles.sectionLabel, isSmall && { fontSize: 14 }]}>Hoe belangrijk is deze stelling voor jou?</Text>
          <View style={styles.importanceButtons}>
            <TouchableOpacity
              style={[
                styles.importanceButton,
                isSmall && { paddingVertical: 10 },
                selectedImportance === 'normal' && styles.importanceButtonActive,
              ]}
              onPress={() => setSelectedImportance('normal')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.importanceButtonText,
                  isSmall && { fontSize: 14 },
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
                isSmall && { paddingVertical: 10 },
                selectedImportance === 'important' && styles.importanceButtonImportantActive,
              ]}
              onPress={() => setSelectedImportance('important')}
              activeOpacity={0.8}
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
                  isSmall && { fontSize: 14 },
                  selectedImportance === 'important' && styles.importanceButtonTextActive,
                ]}
              >
                Belangrijk
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.responseSection, isSmall && { marginBottom: 8 }]}>
          <Text style={[styles.sectionLabel, isSmall && { fontSize: 14 }]}>Wat is jouw mening?</Text>
          <View style={[styles.responseButtons, { flexDirection: 'row' }]}> 
            <TouchableOpacity
              style={[styles.responseButton, styles.agreeButton, isSmall && { paddingVertical: 12 }]}
              onPress={() => handleResponse('agree')}
              activeOpacity={0.9}
            >
              <ThumbsUp size={24} color="#ffffff" strokeWidth={2} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.responseButton, styles.neutralButton, isSmall && { paddingVertical: 12 }]}
              onPress={() => handleResponse('neutral')}
              activeOpacity={0.9}
            >
              <Minus size={24} color="#ffffff" strokeWidth={2.5} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.responseButton, styles.disagreeButton, isSmall && { paddingVertical: 12 }]}
              onPress={() => handleResponse('disagree')}
              activeOpacity={0.9}
            >
              <ThumbsDown size={24} color="#ffffff" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.skipButton, isSmall && { paddingVertical: 10 }]}
            onPress={() => handleResponse('skip')}
            activeOpacity={0.8}
          >
            <ChevronRight size={18} color="#6b7280" />
            <Text style={[styles.skipButtonText, isSmall && { fontSize: 14 }]}>Overslaan</Text>
          </TouchableOpacity>
        </View>
      </View>

      <GlassSection style={[styles.navigationBar, isSmall && { paddingVertical: 8, paddingHorizontal: 10 }]}>
        <View style={[styles.navRow, isSmall && { gap: 8 }]}>
          <View>
            <GlassButton
              title="Vorige"
              onPress={handlePrevious}
              style={[
                styles.navButtonGlass,
                styles.navSideButton,
                { width: sideButtonWidth, paddingVertical: 10, paddingHorizontal: 12 },
                isSmall && { paddingVertical: 8, paddingHorizontal: 10 },
                currentIndex === 0 && styles.navButtonDisabled,
              ]}
              variant="neutral"
            />
          </View>

          <TouchableOpacity
            style={[styles.resetIconButton, { padding: isSmall ? 6 : 8 }]}
            onPress={handleReset}
            activeOpacity={0.9}
          >
            <RotateCcw size={18} color="#ef4444" />
          </TouchableOpacity>

          <View>
            <GlassButton
              title="Bekijk"
              onPress={() => router.push('/(tabs)/results')}
              style={[
                styles.navButtonGlass,
                styles.navSideButton,
                { width: sideButtonWidth, paddingVertical: 10, paddingHorizontal: 12 },
                isSmall && { paddingVertical: 8, paddingHorizontal: 10 },
              ]}
              variant="primary"
            />
          </View>
        </View>
      </GlassSection>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    fontSize: 16,
    color: '#737373',
  },
  progressContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e5e5',
    borderRadius: 3,
    marginBottom: 0,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0ea5e9',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'left',
    fontWeight: '700',
  },
  contentFixed: {
    flex: 1,
    padding: 16,
    gap: 12,
    justifyContent: 'flex-start',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: '#0ea5e9',
  },
  statementCard: {
    borderRadius: 16,
    padding: 24,
    minHeight: 140,
    justifyContent: 'center',
    flex: 1,
    minWidth: 0,
  },
  statementText: {
    fontSize: 20,
    lineHeight: 32,
    color: '#000000',
    fontWeight: '700',
    textAlign: 'center',
  },
  importanceSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
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
    borderColor: '#e5e5e5',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 6,
  },
  importanceButtonActive: {
    borderColor: '#0ea5e9',
    backgroundColor: '#0ea5e9',
  },
  importanceButtonImportant: {
    borderColor: '#0ea5e9',
  },
  importanceButtonImportantActive: {
    backgroundColor: '#0ea5e9',
  },
  importanceButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#525252',
  },
  importanceButtonImportantText: {
    color: '#0ea5e9',
  },
  importanceButtonTextActive: {
    color: '#ffffff',
  },
  responseSection: {
    marginBottom: 12,
  },
  responseButtons: {
    gap: 8,
  },
  responseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 12,
    flex: 1,
  },
  agreeButton: {
    backgroundColor: '#10b981',
  },
  neutralButton: {
    backgroundColor: '#737373',
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
    color: '#0ea5e9',
    fontWeight: '700',
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    justifyContent: 'center',
  },
  navSideButton: {
    width: 160,
  },
  navButtonGlass: {
    borderRadius: 10,
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
  resetIconButton: {
    padding: 12,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
  },
});
