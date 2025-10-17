import { View, Text, StyleSheet, ScrollView, Animated, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Users, FileText, TrendingUp, Shield } from 'lucide-react-native';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import GlassCard from '@/components/glass/GlassCard';
import GlassSection from '@/components/glass/GlassSection';
import GlassButton from '@/components/glass/GlassButton';
import { LiquidGlassTheme } from '@/constants/LiquidGlassTheme';
import { useEffect, useRef } from 'react';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { BlurView } from 'expo-blur';

export default function HomeScreen() {
  const router = useRouter();
  const { statements, getProgress } = useQuestionnaire();
  const progress = getProgress();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const footerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0.7, 1],
    extrapolate: 'clamp',
  });

  const footerBlur = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [20, 40],
    extrapolate: 'clamp',
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
    >
      <Animated.View
        style={[
          styles.hero,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.heroHeader}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroEyebrow}>DE STEMAPP 2025</Text>
          </View>
        </View>
        <Text style={styles.heroTitle}>Kies met{'\n'}vertrouwen</Text>
        <Text style={styles.heroSubtitle}>
          Ontdek welke politieke partijen het beste bij jouw idealen passen door stellingen te beantwoorden.
        </Text>
      </Animated.View>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <GlassCard variant="frosted" style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <FileText size={28} color={LiquidGlassTheme.colors.primary.main} strokeWidth={2} />
            </View>
            <View style={styles.statTextGroup}>
              <Text style={styles.statNumber}>{statements.length}</Text>
              <Text style={styles.statLabel}>Stellingen</Text>
            </View>
          </GlassCard>
          <GlassCard variant="frosted" style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Users size={28} color={LiquidGlassTheme.colors.secondary.main} strokeWidth={2} />
            </View>
            <View style={styles.statTextGroup}>
              <Text style={styles.statNumber}>14</Text>
              <Text style={styles.statLabel}>Partijen</Text>
            </View>
          </GlassCard>
        </View>

        <View style={styles.ctaRow}>
          <GlassButton
            title={progress > 0 ? 'Ga verder' : 'Start De StemAPP'}
            onPress={() => router.push('/(tabs)/questionnaire')}
            size="large"
          />
          <GlassButton
            title="Bekijk partijen"
            onPress={() => router.push('/(tabs)/parties')}
            variant="neutral"
            size="large"
          />
        </View>


        {progress > 0 && (
          <GlassCard variant="tinted" style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View style={styles.progressIconBadge}>
                <TrendingUp size={18} color={LiquidGlassTheme.colors.primary.main} strokeWidth={2} />
              </View>
              <Text style={styles.progressTitle}>Voortgang</Text>
              <Text style={styles.progressValue}>{progress}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressSubtext}>
              {progress}% voltooid
            </Text>
          </GlassCard>
        )}

        <GlassSection variant="elevated" style={styles.infoSection} title="Hoe werkt het?">
          <View style={styles.steps}>
            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: LiquidGlassTheme.colors.glass.coloredLight }]}>
                <Text style={[styles.stepNumberText, { color: LiquidGlassTheme.colors.primary.main }]}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Beantwoord stellingen</Text>
                <Text style={styles.stepText}>Geef je mening over {statements.length} actuele politieke stellingen</Text>
              </View>
            </View>
            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: LiquidGlassTheme.colors.glass.coloredLight }]}>
                <Text style={[styles.stepNumberText, { color: LiquidGlassTheme.colors.primary.main }]}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Markeer prioriteiten</Text>
                <Text style={styles.stepText}>Geef aan welke onderwerpen voor jou het belangrijkst zijn</Text>
              </View>
            </View>
            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: LiquidGlassTheme.colors.glass.coloredLight }]}>
                <Text style={[styles.stepNumberText, { color: LiquidGlassTheme.colors.primary.main }]}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Ontdek je matches</Text>
                <Text style={styles.stepText}>Zie direct welke partijen het beste bij jouw idealen passen</Text>
              </View>
            </View>
          </View>
        </GlassSection>

        <GlassCard variant="tinted" style={styles.infoBanner}>
          <View style={styles.infoBannerRow}>
            <View style={styles.privacyIconBadge}>
              <Shield size={18} color={LiquidGlassTheme.colors.success} strokeWidth={2} />
            </View>
            <View style={styles.privacyTextContainer}>
              <Text style={styles.infoBannerTitle}>Privacy-vriendelijk</Text>
              <Text style={styles.infoBannerText}>
                Jouw antwoorden blijven lokaal op jouw toestel
              </Text>
            </View>
          </View>
        </GlassCard>
      </View>

      {/* Liquid Glass Scrolling Footer */}
      {Platform.OS === 'ios' && isLiquidGlassAvailable() ? (
        <Animated.View
          style={[
            styles.liquidFooter,
            {
              opacity: footerOpacity,
            },
          ]}
        >
          <GlassView
            style={styles.footerGlassView}
            glassEffectStyle="regular"
            tintColor="rgba(255, 255, 255, 0.95)"
          >
            <View style={styles.footerContent}>
              <Text style={styles.footerText}>
                De StemAPP • Tweede Kamer 2025
              </Text>
            </View>
          </GlassView>
        </Animated.View>
      ) : (
        <Animated.View
          style={[
            styles.liquidFooter,
            {
              opacity: footerOpacity,
            },
          ]}
        >
          <BlurView intensity={80} tint="light" style={styles.footerBlurView}>
            <View style={styles.footerContent}>
              <Text style={styles.footerText}>
                De StemAPP • Tweede Kamer 2025
              </Text>
            </View>
          </BlurView>
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LiquidGlassTheme.colors.background.primary,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  hero: {
    paddingTop: LiquidGlassTheme.spacing.huge,
    paddingHorizontal: LiquidGlassTheme.spacing.xl,
    paddingBottom: LiquidGlassTheme.spacing.xxl,
  },
  heroHeader: {
    marginBottom: LiquidGlassTheme.spacing.lg,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: LiquidGlassTheme.colors.glass.coloredLight,
    paddingHorizontal: LiquidGlassTheme.spacing.md,
    paddingVertical: LiquidGlassTheme.spacing.xs,
    borderRadius: LiquidGlassTheme.borderRadius.full,
    gap: LiquidGlassTheme.spacing.xs,
    borderWidth: 1,
    borderColor: LiquidGlassTheme.colors.primary.light + '30',
  },
  heroEyebrow: {
    ...LiquidGlassTheme.typography.caption.large,
    fontWeight: '800',
    color: LiquidGlassTheme.colors.primary.main,
    letterSpacing: 1.2,
  },
  heroTitle: {
    ...LiquidGlassTheme.typography.display.medium,
    color: LiquidGlassTheme.colors.text.primary,
    marginBottom: LiquidGlassTheme.spacing.md,
  },
  heroSubtitle: {
    ...LiquidGlassTheme.typography.body.large,
    color: LiquidGlassTheme.colors.text.secondary,
    lineHeight: 26,
  },
  content: {
    paddingHorizontal: LiquidGlassTheme.spacing.xl,
    gap: LiquidGlassTheme.spacing.lg,
  },
  ctaRow: {
    gap: LiquidGlassTheme.spacing.md,
    marginBottom: LiquidGlassTheme.spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: LiquidGlassTheme.spacing.md,
    marginBottom: LiquidGlassTheme.spacing.lg,
  },
  statCard: {
    flex: 1,
    borderRadius: LiquidGlassTheme.borderRadius.xl,
    paddingVertical: LiquidGlassTheme.spacing.xxl,
    paddingHorizontal: LiquidGlassTheme.spacing.lg,
    alignItems: 'center',
    gap: LiquidGlassTheme.spacing.md,
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: LiquidGlassTheme.borderRadius.md,
    backgroundColor: LiquidGlassTheme.colors.glass.light,
    alignItems: 'center',
    justifyContent: 'center',
    ...LiquidGlassTheme.shadows.card.light,
  },
  statTextGroup: {
    alignItems: 'center',
    gap: LiquidGlassTheme.spacing.xs,
  },
  statNumber: {
    ...LiquidGlassTheme.typography.display.small,
    color: LiquidGlassTheme.colors.text.primary,
  },
  statLabel: {
    ...LiquidGlassTheme.typography.label.small,
    color: LiquidGlassTheme.colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressCard: {
    borderRadius: LiquidGlassTheme.borderRadius.lg,
    padding: LiquidGlassTheme.spacing.xl,
    marginBottom: LiquidGlassTheme.spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LiquidGlassTheme.spacing.md,
    gap: LiquidGlassTheme.spacing.md,
  },
  progressIconBadge: {
    width: 36,
    height: 36,
    borderRadius: LiquidGlassTheme.borderRadius.xs,
    backgroundColor: LiquidGlassTheme.colors.glass.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTitle: {
    ...LiquidGlassTheme.typography.label.large,
    color: LiquidGlassTheme.colors.text.primary,
    flex: 1,
  },
  progressValue: {
    ...LiquidGlassTheme.typography.headline.medium,
    color: LiquidGlassTheme.colors.primary.main,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: LiquidGlassTheme.colors.glass.medium,
    borderRadius: LiquidGlassTheme.borderRadius.xs,
    overflow: 'hidden',
    marginBottom: LiquidGlassTheme.spacing.md,
  },
  progressBar: {
    height: '100%',
    backgroundColor: LiquidGlassTheme.colors.primary.main,
    borderRadius: LiquidGlassTheme.borderRadius.xs,
  },
  progressSubtext: {
    ...LiquidGlassTheme.typography.body.small,
    color: LiquidGlassTheme.colors.text.secondary,
    textAlign: 'center',
  },
  infoSection: {
    borderRadius: LiquidGlassTheme.borderRadius.xl,
    padding: LiquidGlassTheme.spacing.xxl,
  },
  infoBanner: {
    borderRadius: LiquidGlassTheme.borderRadius.lg,
    padding: LiquidGlassTheme.spacing.xl,
    marginTop: LiquidGlassTheme.spacing.lg,
  },
  infoBannerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: LiquidGlassTheme.spacing.md,
  },
  privacyIconBadge: {
    width: 40,
    height: 40,
    borderRadius: LiquidGlassTheme.borderRadius.sm,
    backgroundColor: LiquidGlassTheme.colors.success + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyTextContainer: {
    flex: 1,
    gap: LiquidGlassTheme.spacing.xs,
  },
  infoBannerTitle: {
    ...LiquidGlassTheme.typography.label.large,
    color: LiquidGlassTheme.colors.text.primary,
  },
  infoBannerText: {
    ...LiquidGlassTheme.typography.body.small,
    color: LiquidGlassTheme.colors.text.secondary,
    lineHeight: 20,
  },
  steps: {
    gap: LiquidGlassTheme.spacing.xl,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: LiquidGlassTheme.spacing.md,
  },
  stepNumber: {
    width: 44,
    height: 44,
    borderRadius: LiquidGlassTheme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: LiquidGlassTheme.colors.primary.light + '40',
  },
  stepNumberText: {
    ...LiquidGlassTheme.typography.headline.small,
    fontWeight: '800',
  },
  stepContent: {
    flex: 1,
    gap: LiquidGlassTheme.spacing.xs,
    paddingTop: LiquidGlassTheme.spacing.xs,
  },
  stepTitle: {
    ...LiquidGlassTheme.typography.label.large,
    color: LiquidGlassTheme.colors.text.primary,
  },
  stepText: {
    ...LiquidGlassTheme.typography.body.medium,
    color: LiquidGlassTheme.colors.text.secondary,
    lineHeight: 22,
  },
  liquidFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    overflow: 'hidden',
  },
  footerGlassView: {
    flex: 1,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
    ...LiquidGlassTheme.shadows.glass.medium,
  },
  footerBlurView: {
    flex: 1,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    ...LiquidGlassTheme.shadows.glass.medium,
  },
  footerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
  },
  footerText: {
    ...LiquidGlassTheme.typography.body.small,
    color: LiquidGlassTheme.colors.text.tertiary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
