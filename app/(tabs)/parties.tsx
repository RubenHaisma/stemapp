import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Platform, Linking } from 'react-native';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import { Users, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useState, useRef, useEffect } from 'react';
import GlassCard from '@/components/glass/GlassCard';
import GlassSection from '@/components/glass/GlassSection';
import { LiquidGlassTheme } from '@/constants/LiquidGlassTheme';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { BlurView } from 'expo-blur';

export default function PartiesScreen() {
  const { parties, loading } = useQuestionnaire();
  const [expandedParty, setExpandedParty] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const footerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0.7, 1],
    extrapolate: 'clamp',
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Partijen laden...</Text>
      </View>
    );
  }

  const sortedParties = [...parties].sort((a, b) => b.seats_2023 - a.seats_2023);

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
      <Animated.View style={{ opacity: fadeAnim }}>
        <GlassSection variant="elevated" style={styles.header}>
          <View style={styles.headerIconBadge}>
            <Users size={32} color={LiquidGlassTheme.colors.primary.main} strokeWidth={2} />
          </View>
          <Text style={styles.headerTitle}>Politieke Partijen</Text>
          <Text style={styles.headerSubtitle}>
            {parties.length} partijen in de Tweede Kamer 2025
          </Text>
        </GlassSection>

        <View style={styles.partiesList}>
          {sortedParties.map((party) => {
            const isExpanded = expandedParty === party.id;

            return (
              <GlassCard
                key={party.id}
                variant="elevated"
                style={styles.partyCard}
              >
                <TouchableOpacity
                  onPress={() => setExpandedParty(isExpanded ? null : party.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.partyHeader}>
                    <View
                      style={[
                        styles.partyColorIndicator,
                        { backgroundColor: party.color || LiquidGlassTheme.colors.text.quaternary },
                      ]}
                    />
                    <View style={styles.partyMainContent}>
                      {getPartyLogo(party) && (
                        <Image source={getPartyLogo(party)!} style={styles.partyLogo} />
                      )}
                      <View style={styles.partyInfo}>
                        <View style={styles.partyTitleRow}>
                          <Text style={styles.partyAbbr}>{party.abbreviation}</Text>
                        </View>
                        <Text style={styles.partyName} numberOfLines={isExpanded ? undefined : 1}>
                          {party.name}
                        </Text>
                        {party.leader && (
                          <Text style={styles.partyLeader}>
                            Lijsttrekker: {party.leader}
                          </Text>
                        )}
                        {party.seats_2023 > 0 && (
                          <View style={styles.seatsBadge}>
                            <Text style={styles.seatsText}>{party.seats_2023} zetels</Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.expandButton}>
                        {isExpanded ? (
                          <ChevronUp size={20} color={LiquidGlassTheme.colors.primary.main} strokeWidth={2} />
                        ) : (
                          <ChevronDown size={20} color={LiquidGlassTheme.colors.text.tertiary} strokeWidth={2} />
                        )}
                      </View>
                    </View>
                  </View>

                  {isExpanded && (
                    <View style={styles.partyDetails}>
                      {party.description && (
                        <View style={styles.descriptionSection}>
                          <Text style={styles.descriptionLabel}>Over de partij</Text>
                          <Text style={styles.descriptionText}>{party.description}</Text>
                        </View>
                      )}

                      {party.website && (
                        <TouchableOpacity
                          style={styles.websiteSection}
                          onPress={() => Linking.openURL(party.website)}
                          activeOpacity={0.7}
                        >
                          <ExternalLink size={18} color={LiquidGlassTheme.colors.primary.main} strokeWidth={2} />
                          <Text style={styles.websiteText}>Bezoek website</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              </GlassCard>
            );
          })}
        </View>

        <GlassCard variant="tinted" style={styles.footer}>
          <Text style={styles.footerText}>
            Deze informatie is gebaseerd op de huidige politieke situatie en kan veranderen
            tijdens de verkiezingscampagne.
          </Text>
        </GlassCard>
      </Animated.View>

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
              <Text style={styles.footerFooterText}>
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
              <Text style={styles.footerFooterText}>
                De StemAPP • Tweede Kamer 2025
              </Text>
            </View>
          </BlurView>
        </Animated.View>
      )}
    </ScrollView>
  );
}

const partyLogos: Record<string, any> = {
  VVD: require('../../assets/images/VVD_logo_(2020–present).svg.png'),
  D66: require('../../assets/images/D66_logo_(2019–present).svg.png'),
  CU: require('../../assets/images/ChristenUnie_logo_compact_blauw.png'),
  BBB: require('../../assets/images/BoerBurgerBeweging_logo.svg.png'),
  PVV: require('../../assets/images/logo-pvv.jpg'),
  VOLT: require('../../assets/images/Logo_Volt_Europa.png'),
  JA21: require('../../assets/images/JA21_logo.svg.png'),
  NSC: require('../../assets/images/NSC_Social_Logo_Navy_Back_f3c3d0697c_6fbc1b691c.png'),
  PVDD: require('../../assets/images/Party_for_the_Animals_logo.svg.png'),
  'GL-PVDA': require('../../assets/images/gl-pvda.jpeg'),
  'GL-PVDA_ALT': require('../../assets/images/gl-pvda.jpeg'),
  CDA: require('../../assets/images/CDA_logo_2021.svg.png'),
  DENK: require('../../assets/images/denk_logo.png'),
  SP: require('../../assets/images/sp_logo.avif'),
  SGP: require('../../assets/images/sgp_logo.png'),
};

function getPartyLogo(party: { id: string; name: string; abbreviation: string }) {
  const key = (party.abbreviation || '').toUpperCase();
  if (partyLogos[key]) return partyLogos[key];
  if (key === 'PVDDA' || key === 'PVD-D' || key === 'PVD D' || key === 'PVD') {
    return partyLogos['PVDD'];
  }
  if (key === 'GL-PVDA' || key === 'GLPVDA' || key.includes('PVDA') || key.includes('GROENLINKS')) {
    return partyLogos['GL-PVDA'];
  }
  const nameUpper = (party.name || '').toUpperCase();
  if (nameUpper.includes('GROENLINKS') || nameUpper.includes('PvdA'.toUpperCase())) {
    return partyLogos['GL-PVDA'];
  }
  if (nameUpper.includes('PARTIJ VOOR DE DIEREN')) {
    return partyLogos['PVDD'];
  }
  return undefined;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LiquidGlassTheme.colors.background.primary,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LiquidGlassTheme.colors.background.primary,
  },
  loadingText: {
    ...LiquidGlassTheme.typography.body.large,
    color: LiquidGlassTheme.colors.text.tertiary,
  },
  header: {
    paddingVertical: LiquidGlassTheme.spacing.xxxl,
    paddingHorizontal: LiquidGlassTheme.spacing.xxl,
    margin: LiquidGlassTheme.spacing.xl,
    alignItems: 'center',
  },
  headerIconBadge: {
    width: 72,
    height: 72,
    borderRadius: LiquidGlassTheme.borderRadius.lg,
    backgroundColor: LiquidGlassTheme.colors.glass.coloredLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: LiquidGlassTheme.spacing.lg,
    borderWidth: 1.5,
    borderColor: LiquidGlassTheme.colors.primary.light + '30',
  },
  headerTitle: {
    ...LiquidGlassTheme.typography.display.small,
    color: LiquidGlassTheme.colors.text.primary,
    marginBottom: LiquidGlassTheme.spacing.sm,
    textAlign: 'center',
  },
  headerSubtitle: {
    ...LiquidGlassTheme.typography.body.large,
    color: LiquidGlassTheme.colors.text.secondary,
    textAlign: 'center',
  },
  partiesList: {
    paddingHorizontal: LiquidGlassTheme.spacing.xl,
    gap: LiquidGlassTheme.spacing.md,
  },
  partyCard: {
    borderRadius: LiquidGlassTheme.borderRadius.xl,
    overflow: 'hidden',
  },
  partyHeader: {
    flexDirection: 'row',
  },
  partyColorIndicator: {
    width: 4,
    alignSelf: 'stretch',
    borderTopLeftRadius: LiquidGlassTheme.borderRadius.xl,
  },
  partyMainContent: {
    flex: 1,
    flexDirection: 'row',
    padding: LiquidGlassTheme.spacing.lg,
    alignItems: 'center',
    gap: LiquidGlassTheme.spacing.md,
  },
  partyLogo: {
    width: 48,
    height: 48,
    borderRadius: LiquidGlassTheme.borderRadius.sm,
    resizeMode: 'contain',
    backgroundColor: LiquidGlassTheme.colors.background.secondary,
    ...LiquidGlassTheme.shadows.card.light,
  },
  partyInfo: {
    flex: 1,
    gap: LiquidGlassTheme.spacing.xs,
  },
  partyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: LiquidGlassTheme.spacing.sm,
  },
  partyAbbr: {
    ...LiquidGlassTheme.typography.headline.medium,
    color: LiquidGlassTheme.colors.text.primary,
  },
  partyName: {
    ...LiquidGlassTheme.typography.body.medium,
    color: LiquidGlassTheme.colors.text.secondary,
  },
  partyLeader: {
    ...LiquidGlassTheme.typography.body.small,
    color: LiquidGlassTheme.colors.text.tertiary,
    fontStyle: 'italic',
  },
  seatsBadge: {
    alignSelf: 'flex-start',
    backgroundColor: LiquidGlassTheme.colors.glass.coloredMedium,
    paddingHorizontal: LiquidGlassTheme.spacing.md,
    paddingVertical: LiquidGlassTheme.spacing.xs,
    borderRadius: LiquidGlassTheme.borderRadius.full,
    marginTop: LiquidGlassTheme.spacing.xs,
  },
  seatsText: {
    ...LiquidGlassTheme.typography.label.small,
    color: LiquidGlassTheme.colors.primary.dark,
    fontWeight: '700',
  },
  expandButton: {
    width: 36,
    height: 36,
    borderRadius: LiquidGlassTheme.borderRadius.sm,
    backgroundColor: LiquidGlassTheme.colors.glass.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partyDetails: {
    paddingHorizontal: LiquidGlassTheme.spacing.xl,
    paddingBottom: LiquidGlassTheme.spacing.lg,
    paddingTop: LiquidGlassTheme.spacing.md,
    gap: LiquidGlassTheme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: LiquidGlassTheme.colors.border.light,
  },
  descriptionSection: {
    gap: LiquidGlassTheme.spacing.sm,
  },
  descriptionLabel: {
    ...LiquidGlassTheme.typography.label.large,
    color: LiquidGlassTheme.colors.text.primary,
  },
  descriptionText: {
    ...LiquidGlassTheme.typography.body.medium,
    color: LiquidGlassTheme.colors.text.secondary,
    lineHeight: 24,
  },
  websiteSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: LiquidGlassTheme.spacing.sm,
    padding: LiquidGlassTheme.spacing.md,
    backgroundColor: LiquidGlassTheme.colors.glass.coloredLight,
    borderRadius: LiquidGlassTheme.borderRadius.sm,
  },
  websiteText: {
    ...LiquidGlassTheme.typography.body.small,
    color: LiquidGlassTheme.colors.primary.main,
    fontWeight: '600',
  },
  footer: {
    margin: LiquidGlassTheme.spacing.xl,
    padding: LiquidGlassTheme.spacing.xl,
    borderRadius: LiquidGlassTheme.borderRadius.lg,
  },
  footerText: {
    ...LiquidGlassTheme.typography.body.small,
    color: LiquidGlassTheme.colors.text.secondary,
    lineHeight: 20,
    textAlign: 'center',
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
  footerFooterText: {
    ...LiquidGlassTheme.typography.body.small,
    color: LiquidGlassTheme.colors.text.tertiary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
