import type { ChatSession, Message } from "../interfaces/ChatInterfaces";

export const KEY = 'dev_fgpt_chat_history';

export const DEFAULT_WELCOME_MESSAGE: Message = {
  role: "assistant",
  message: "Hola, ¿en qué puedo ayudarte?"
};

export interface ChatState {
  sessions: ChatSession[];
  activeSessionId: string | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export type ChatAction =
  | { type: 'NEW_CHAT' }
  | { type: 'SELECT_CHAT'; payload: string }
  | { type: 'DELETE_CHAT'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_USER_MESSAGE'; payload: { messageContent: string; sessionId: string } }
  | { type: 'ADD_BOT_MESSAGE'; payload: { message: Message; sessionId: string } };

export const getInitialState = (): ChatState => {
  let sessions: ChatSession[] = [];
  let activeSessionId: string | null = null;

  try {
    const saved = localStorage.getItem(KEY);
    if (saved) {
      sessions = JSON.parse(saved);
      if (sessions.length > 0) {
        activeSessionId = sessions[0].id;
      }
    }
  } catch (e) {
    console.error("Error al cargar historial de localStorage:", e);
  }

  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const messages = activeSession ? activeSession.messages : [DEFAULT_WELCOME_MESSAGE];

  return {
    sessions,
    activeSessionId,
    messages,
    isLoading: false,
    error: null,
  };
};

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'NEW_CHAT':
      return {
        ...state,
        activeSessionId: null,
        messages: [DEFAULT_WELCOME_MESSAGE],
        error: null,
      };

    case 'SELECT_CHAT': {
      const selected = state.sessions.find((s) => s.id === action.payload);
      return {
        ...state,
        activeSessionId: action.payload,
        messages: selected ? selected.messages : [DEFAULT_WELCOME_MESSAGE],
        error: null,
      };
    }

    case 'DELETE_CHAT': {
      const updatedSessions = state.sessions.filter((s) => s.id !== action.payload);
      
      let nextActiveId = state.activeSessionId;
      let nextMessages = state.messages;

      if (state.activeSessionId === action.payload) {
        if (updatedSessions.length > 0) {
          nextActiveId = updatedSessions[0].id;
          nextMessages = updatedSessions[0].messages;
        } else {
          nextActiveId = null;
          nextMessages = [DEFAULT_WELCOME_MESSAGE];
        }
      }

      return {
        ...state,
        sessions: updatedSessions,
        activeSessionId: nextActiveId,
        messages: nextMessages,
      };
    }

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'ADD_USER_MESSAGE': {
      const { messageContent, sessionId } = action.payload;
      const userMessage: Message = {
        role: "user",
        message: messageContent,
      };

      const existingSession = state.sessions.find((s) => s.id === sessionId);

      let updatedSessions: ChatSession[];
      if (!existingSession) {
        const newSession: ChatSession = {
          id: sessionId,
          title: messageContent.slice(0, 30) + (messageContent.length > 30 ? "..." : ""),
          createdAt: Date.now(),
          messages: [DEFAULT_WELCOME_MESSAGE, userMessage],
        };
        updatedSessions = [newSession, ...state.sessions];
      } else {
        updatedSessions = state.sessions.map((s) =>
          s.id === sessionId
            ? { ...s, messages: [...s.messages, userMessage] }
            : s
        );
      }

      const activeSession = updatedSessions.find((s) => s.id === sessionId);

      return {
        ...state,
        sessions: updatedSessions,
        activeSessionId: sessionId,
        messages: activeSession ? activeSession.messages : [...state.messages, userMessage],
      };
    }

    case 'ADD_BOT_MESSAGE': {
      const { message, sessionId } = action.payload;

      const updatedSessions = state.sessions.map((s) =>
        s.id === sessionId
          ? { ...s, messages: [...s.messages, message] }
          : s
      );

      const activeSession = updatedSessions.find((s) => s.id === state.activeSessionId);

      return {
        ...state,
        sessions: updatedSessions,
        messages: activeSession ? activeSession.messages : state.messages,
      };
    }

    default:
      return state;
  }
}
