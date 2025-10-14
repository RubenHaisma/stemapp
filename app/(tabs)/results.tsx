import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Image } from 'react-native';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import { useState, useEffect } from 'react';
import { CircleCheck as CheckCircle, Circle as XCircle, Minus, RotateCcw } from 'lucide-react-native';
import type { PartyMatch } from '@/lib/types';
import { useRouter } from 'expo-router';
import GlassSection from '@/components/glass/GlassSection';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';

export default function ResultsScreen() {
  const { responses, calculateResults, resetQuestionnaire, statements } = useQuestionnaire();
  const [results, setResults] = useState<PartyMatch[]>([]);
  const router = useRouter();
  const APP_URL = 'https://apps.apple.com/nl/app/destemapp/id6753643142?l=en-GB';

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

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check DeStemAPP en deel met vrienden: ${APP_URL}`,
        url: APP_URL,
        title: 'DeStemAPP',
      });
    } catch (e) {
      // no-op
    }
  };

  return (
    <ScrollView style={styles.container}>

      {topMatch && (
        <GlassCard style={styles.topMatchCard}>
          {getPartyLogo(topMatch.party) && (
            <Image source={getPartyLogo(topMatch.party)!} style={styles.topMatchLogo} />
          )}
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
              <CheckCircle size={20} color="#16a34a" />
              <Text style={styles.topMatchStatText}>{topMatch.agreements} eens</Text>
            </View>
            <View style={styles.topMatchStat}>
              <XCircle size={20} color="#ef4444" />
              <Text style={styles.topMatchStatText}>{topMatch.disagreements} oneens</Text>
            </View>
          </View>
        </GlassCard>
      )}

      <GlassSection style={styles.allResultsSection}>
        <Text style={styles.sectionTitle}>Alle partijen</Text>
        <View style={styles.resultsList}>
          {results.map((result, index) => (
            <GlassCard key={result.party.id} style={styles.resultCard}>
              <View style={styles.resultRank}>
                <Text
                  style={[
                    styles.resultRankText,
                    index < 3 && { color: '#0ea5e9' },
                  ]}
                >
                  {index + 1}
                </Text>
              </View>
              {getPartyLogo(result.party) && (
                <Image source={getPartyLogo(result.party)!} style={styles.resultLogo} />
              )}
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
                        backgroundColor: '#0ea5e9',
                      },
                    ]}
                  />
                </View>
              </View>
            </GlassCard>
          ))}
        </View>
      </GlassSection>

      <GlassSection style={styles.actionsSection}>
        <GlassButton title="Opnieuw beginnen" onPress={handleReset} variant="danger" size="large" />
        <GlassButton title="Bekijk alle partijen" onPress={() => router.push('/(tabs)/parties')} size="large" />
        <GlassButton title="Deel app" onPress={handleShare} variant="neutral" size="large" />
      </GlassSection>

      <GlassSection style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          De StemAPP is bedoeld als hulpmiddel en vervangt niet je eigen onderzoek naar
          politieke partijen en hun standpunten.
        </Text>
      </GlassSection>
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
  SGP: require('../../assets/images/sgp_logo.png')
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
    backgroundColor: '#ffffff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#ffffff',
  },
  emptyTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#525252',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  topMatchCard: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  topMatchBadge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  topMatchLogo: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  topMatchBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0ea5e9',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  topMatchName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
  },
  topMatchAbbr: {
    fontSize: 16,
    color: '#737373',
    marginBottom: 20,
  },
  topMatchScore: {
    alignItems: 'center',
    marginBottom: 20,
  },
  topMatchPercentage: {
    fontSize: 52,
    fontWeight: '800',
    color: '#000000',
  },
  topMatchLabel: {
    fontSize: 14,
    color: '#737373',
    marginTop: 4,
  },
  topMatchStats: {
    flexDirection: 'row',
    gap: 20,
  },
  topMatchStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  topMatchStatText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
  },
  allResultsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 16,
  },
  resultsList: {
    gap: 12,
  },
  resultCard: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resultLogo: {
    width: 28,
    height: 28,
    borderRadius: 6,
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  resultRank: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultRankText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#737373',
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 2,
  },
  resultFullName: {
    fontSize: 13,
    color: '#737373',
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
    color: '#737373',
  },
  resultPercentageContainer: {
    alignItems: 'flex-end',
  },
  resultPercentage: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
  },
  resultBarContainer: {
    width: 70,
    height: 6,
    backgroundColor: '#e5e5e5',
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
  disclaimer: {
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
