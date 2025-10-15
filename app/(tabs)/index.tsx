import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Users, FileQuestionMark as FileQuestion, TrendingUp, Shield, Sparkles } from 'lucide-react-native';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import GlassCard from '@/components/glass/GlassCard';
import GlassSection from '@/components/glass/GlassSection';
import GlassButton from '@/components/glass/GlassButton';

export default function HomeScreen() {
  const router = useRouter();
  const { statements, getProgress } = useQuestionnaire();
  const progress = getProgress();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>De StemAPP</Text>
        <Text style={styles.heroTitle}>Kies met vertrouwen</Text>
        <Text style={styles.heroSubtitle}>
          Beantwoord stellingen en ontdek jouw match met Nederlandse partijen.
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <GlassCard style={[styles.statCard, styles.statCardLeft]}> 
            <FileQuestion size={28} color="#000000" />
            <View style={styles.statTextGroup}>
              <Text style={styles.statNumber}>{statements.length}</Text>
              <Text style={styles.statLabel}>Stellingen</Text>
            </View>
          </GlassCard>
          <GlassCard style={[styles.statCard, styles.statCardRight]}>
            <Users size={28} color="#000000" />
            <View style={styles.statTextGroup}>
              <Text style={styles.statNumber}>14</Text>
              <Text style={styles.statLabel}>Partijen</Text>
            </View>
          </GlassCard>
        </View>

        <View style={styles.ctaRow}>
          <GlassButton
            title={progress > 0 ? 'Ga door' : 'Start De StemAPP'}
            onPress={() => router.push('/(tabs)/questionnaire')}
            size="large"
          />
          <GlassButton
            title="Bekijk partijen"
            onPress={() => router.push('/(tabs)/parties')}
            variant="neutral"
            size="large"
            style={{ backgroundColor: '#ffffff' }}
          />
        </View>


        {progress > 0 && (
          <GlassCard style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <TrendingUp size={20} color="#0f172a" />
              <Text style={styles.progressTitle}>Voortgang</Text>
              <Text style={styles.progressValue}>{progress}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
          </GlassCard>
        )}

        <GlassSection style={styles.infoSection} title="Hoe werkt het?">
          <View style={styles.steps}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Beantwoord {statements.length} stellingen</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>Markeer wat voor jou belangrijk is</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Ontdek je best passende partijen</Text>
            </View>
          </View>
        </GlassSection>

        <GlassCard style={styles.infoBanner}>
          <View style={styles.infoBannerRow}>
            <Shield size={16} color="#0ea5e9" />
            <Text style={styles.infoBannerText}>Privacy-vriendelijk: jouw antwoorden blijven op jouw toestel.</Text>
          </View>
        </GlassCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fb',
  },
  contentContainer: {
    paddingBottom: 96,
  },
  hero: {
    paddingTop: 28,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  heroEyebrow: {
    fontSize: 12,
    fontWeight: '700',
    color: '#737373',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
  },
  heroSubtitle: {
    marginTop: 6,
    fontSize: 15,
    color: '#525252',
    lineHeight: 22,
  },
  content: {
    padding: 20,
  },
  ctaRow: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statCardLeft: {
    justifyContent: 'flex-start',
  },
  statCardRight: {
    justifyContent: 'flex-start',
  },
  statTextGroup: {
    gap: 2,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
  },
  statLabel: {
    fontSize: 12,
    color: '#737373',
  },
  progressCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e5e5e5',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0ea5e9',
    borderRadius: 4,
  },
  startButton: {
    borderRadius: 12,
    padding: 0,
    alignItems: 'stretch',
    marginBottom: 16,
  },
  infoSection: {
    borderRadius: 16,
    padding: 20,
  },
  infoBanner: {
    borderRadius: 14,
    padding: 14,
    gap: 8,
    marginTop: 12,
  },
  infoBannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoBannerText: {
    fontSize: 13,
    color: '#525252',
    flex: 1,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20,
  },
  steps: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#525252',
    lineHeight: 22,
    paddingTop: 4,
  },
});
