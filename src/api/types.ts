export type ChatRequest = {
  message: string;
  sessionId: string;
  locale?: string;
};

export type ChatSuccess = {
  ok: true;
  output: string;
  sessionId: string;
};

export type ChatError = {
  error: true;
  status: number;
  msg: string;
};

export type ChatResponse = ChatSuccess | ChatError;

export type Message = {
  id: string;
  from: 'user' | 'bot' | 'system';
  text: string;
  timestamp: number;
};

export type ThemeMode = 'light' | 'dark' | 'system';