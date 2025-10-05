import type { Party, PartyPosition, Statement, UserResponse } from './types';

const API_BASE_URL = (process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3333').replace(/\/$/, '');

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request to ${path} failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchQuestionnaireData(): Promise<{
  statements: Statement[];
  parties: Party[];
  positions: PartyPosition[];
}> {
  return request('/questionnaire');
}

export async function fetchResponses(sessionId: string): Promise<UserResponse[]> {
  const data = await request<{ responses: UserResponse[] }>(`/responses/${sessionId}`);
  return data.responses;
}

export async function persistResponse(payload: {
  sessionId: string;
  statementId: string;
  response: UserResponse['response'];
  importance: UserResponse['importance'];
}): Promise<UserResponse> {
  const data = await request<{ response: UserResponse }>(`/responses`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.response;
}

export async function deleteResponses(sessionId: string): Promise<void> {
  await request(`/responses/${sessionId}`, { method: 'DELETE' });
}
