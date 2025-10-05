export type Party = {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  color: string;
  website: string;
  leader: string;
  seats_2023: number;
  created_at?: string;
};

export type Statement = {
  id: string;
  text: string;
  category: string;
  order_index: number;
  created_at?: string;
};

export type PartyPosition = {
  id?: string;
  party_id: string;
  statement_id: string;
  position: 'agree' | 'disagree' | 'neutral';
  explanation: string;
  created_at?: string;
};

export type UserResponse = {
  id?: string;
  session_id: string;
  statement_id: string;
  response: 'agree' | 'disagree' | 'neutral' | 'skip';
  importance: 'normal' | 'important';
  created_at?: string;
};

export type PartyMatch = {
  party: Party;
  score: number;
  maxScore: number;
  percentage: number;
  agreements: number;
  disagreements: number;
};
