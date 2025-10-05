import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchQuestionnaireData, fetchResponses, persistResponse, deleteResponses } from '@/lib/dataSource';
import { parties as fallbackParties, statements as fallbackStatements, partyPositions as fallbackPositions } from '@/data/questionnaire';
import type { Statement, Party, PartyPosition, UserResponse, PartyMatch } from '@/lib/types';

type QuestionnaireContextType = {
  statements: Statement[];
  parties: Party[];
  positions: PartyPosition[];
  responses: Map<string, UserResponse>;
  currentIndex: number;
  loading: boolean;
  sessionId: string;
  backendAvailable: boolean;
  setCurrentIndex: (index: number) => void;
  saveResponse: (statementId: string, response: 'agree' | 'disagree' | 'neutral' | 'skip', importance: 'normal' | 'important') => Promise<void>;
  calculateResults: () => PartyMatch[];
  resetQuestionnaire: () => void;
  getProgress: () => number;
};

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export function QuestionnaireProvider({ children }: { children: React.ReactNode }) {
  const [statements, setStatements] = useState<Statement[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [positions, setPositions] = useState<PartyPosition[]>([]);
  const [responses, setResponses] = useState<Map<string, UserResponse>>(new Map());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const data = await fetchQuestionnaireData();
      setStatements(data.statements);
      setParties(data.parties);
      setPositions(data.positions);
      setBackendAvailable(true);

      const storedResponses = await fetchResponses(sessionId);
      if (storedResponses.length > 0) {
        setResponses(new Map(storedResponses.map(response => [response.statement_id, response])));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setBackendAvailable(false);
      setStatements(fallbackStatements);
      setParties(fallbackParties);
      setPositions(fallbackPositions);
    } finally {
      setLoading(false);
    }
  }

  async function saveResponse(
    statementId: string,
    response: 'agree' | 'disagree' | 'neutral' | 'skip',
    importance: 'normal' | 'important'
  ) {
    const previousResponse = responses.get(statementId);
    const nextResponse: UserResponse = {
      session_id: sessionId,
      statement_id: statementId,
      response,
      importance,
    };

    setResponses(prev => {
      const newMap = new Map(prev);
      newMap.set(statementId, nextResponse);
      return newMap;
    });

    if (!backendAvailable) {
      return;
    }

    try {
      await persistResponse({
        sessionId,
        statementId,
        response,
        importance,
      });
    } catch (error) {
      console.error('Failed to persist response', error);
      setResponses(prev => {
        const newMap = new Map(prev);
        if (previousResponse) {
          newMap.set(statementId, previousResponse);
        } else {
          newMap.delete(statementId);
        }
        return newMap;
      });
      throw error;
    }
  }

  function calculateResults(): PartyMatch[] {
    const partyScores: Map<string, { score: number; maxScore: number; agreements: number; disagreements: number }> = new Map();

    parties.forEach(party => {
      partyScores.set(party.id, { score: 0, maxScore: 0, agreements: 0, disagreements: 0 });
    });

    responses.forEach((userResponse, statementId) => {
      if (userResponse.response === 'skip') return;

      const weight = userResponse.importance === 'important' ? 2 : 1;

      positions
        .filter(pos => pos.statement_id === statementId)
        .forEach(position => {
          const partyScore = partyScores.get(position.party_id);
          if (!partyScore) return;

          partyScore.maxScore += weight;

          if (userResponse.response === position.position) {
            partyScore.score += weight;
            partyScore.agreements += 1;
          } else if (
            (userResponse.response === 'agree' && position.position === 'disagree') ||
            (userResponse.response === 'disagree' && position.position === 'agree')
          ) {
            partyScore.disagreements += 1;
          } else if (userResponse.response === 'neutral' || position.position === 'neutral') {
            partyScore.score += weight * 0.5;
          }
        });
    });

    const results: PartyMatch[] = parties
      .map(party => {
        const scores = partyScores.get(party.id) || { score: 0, maxScore: 0, agreements: 0, disagreements: 0 };
        const percentage = scores.maxScore > 0 ? (scores.score / scores.maxScore) * 100 : 0;

        return {
          party,
          score: scores.score,
          maxScore: scores.maxScore,
          percentage,
          agreements: scores.agreements,
          disagreements: scores.disagreements,
        };
      })
      .sort((a, b) => b.percentage - a.percentage);

    return results;
  }

  function resetQuestionnaire() {
    if (backendAvailable) {
      deleteResponses(sessionId).catch(error => console.error('Failed to reset responses', error));
    }
    setResponses(new Map());
    setCurrentIndex(0);
  }

  function getProgress(): number {
    if (statements.length === 0) return 0;
    return Math.round((responses.size / statements.length) * 100);
  }

  return (
    <QuestionnaireContext.Provider
      value={{
        statements,
        parties,
        positions,
        responses,
        currentIndex,
        loading,
        sessionId,
        backendAvailable,
        setCurrentIndex,
        saveResponse,
        calculateResults,
        resetQuestionnaire,
        getProgress,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within QuestionnaireProvider');
  }
  return context;
}
