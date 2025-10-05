import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import { Users, ExternalLink } from 'lucide-react-native';
import { useState } from 'react';

export default function PartiesScreen() {
  const { parties, loading } = useQuestionnaire();
  const [expandedParty, setExpandedParty] = useState<string | null>(null);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Partijen laden...</Text>
      </View>
    );
  }

  const sortedParties = [...parties].sort((a, b) => b.seats_2023 - a.seats_2023);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Users size={40} color="#1e40af" />
        <Text style={styles.headerTitle}>Nederlandse Politieke Partijen</Text>
        <Text style={styles.headerSubtitle}>
          Overzicht van {parties.length} partijen in de Tweede Kamer 2025
        </Text>
      </View>

      <View style={styles.partiesList}>
        {sortedParties.map((party) => {
          const isExpanded = expandedParty === party.id;

          return (
            <TouchableOpacity
              key={party.id}
              style={styles.partyCard}
              onPress={() => setExpandedParty(isExpanded ? null : party.id)}
              activeOpacity={0.7}
            >
              <View style={styles.partyHeader}>
                <View
                  style={[
                    styles.partyColorBar,
                    { backgroundColor: party.color || '#6b7280' },
                  ]}
                />
                <View style={styles.partyInfo}>
                  <View style={styles.partyTitleRow}>
                    <Text style={styles.partyAbbr}>{party.abbreviation}</Text>
                    {party.seats_2023 > 0 && (
                      <View style={styles.seatsBadge}>
                        <Text style={styles.seatsText}>{party.seats_2023} zetels</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.partyName} numberOfLines={isExpanded ? undefined : 2}>
                    {party.name}
                  </Text>
                  {party.leader && (
                    <Text style={styles.partyLeader}>Lijsttrekker: {party.leader}</Text>
                  )}
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
                    <View style={styles.websiteSection}>
                      <ExternalLink size={16} color="#1e40af" />
                      <Text style={styles.websiteText}>{party.website}</Text>
                    </View>
                  )}
                </View>
              )}

              <View style={styles.expandIndicator}>
                <Text style={styles.expandText}>
                  {isExpanded ? 'Inkleppen' : 'Meer informatie'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Deze informatie is gebaseerd op de huidige politieke situatie en kan veranderen
          tijdens de verkiezingscampagne.
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
  header: {
    backgroundColor: '#ffffff',
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  partiesList: {
    padding: 20,
    gap: 16,
  },
  partyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  partyHeader: {
    flexDirection: 'row',
  },
  partyColorBar: {
    width: 6,
  },
  partyInfo: {
    flex: 1,
    padding: 16,
  },
  partyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  partyAbbr: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  seatsBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  seatsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e40af',
  },
  partyName: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 6,
    lineHeight: 22,
  },
  partyLeader: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  partyDetails: {
    paddingHorizontal: 22,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  descriptionSection: {
    marginTop: 16,
    marginBottom: 12,
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
  },
  websiteSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  websiteText: {
    fontSize: 13,
    color: '#1e40af',
    textDecorationLine: 'underline',
  },
  expandIndicator: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    backgroundColor: '#f9fafb',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  expandText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e40af',
  },
  footer: {
    backgroundColor: '#fef3c7',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
  },
  footerText: {
    fontSize: 13,
    color: '#92400e',
    lineHeight: 20,
    textAlign: 'center',
  },
});
