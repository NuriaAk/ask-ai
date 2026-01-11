// Centralized API service

export type UserMode = 'technical' | 'non-technical';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ApiChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  'http://localhost:3000';

export async function sendMessage(
  question: string, 
  mode: UserMode
): Promise<ChatMessage> {
  const response = await fetch(`${API_BASE_URL}/chat/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, mode }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message =
      errorBody?.message ?? `Request failed with status ${response.status}.`;
    throw new Error(message);
  }

  const data = (await response.json()) as ApiChatMessage;
  return {
    ...data,
    timestamp: new Date(data.timestamp),
  };
}

export function createUserMessage(content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role: 'user',
    content,
    timestamp: new Date(),
  };
}
