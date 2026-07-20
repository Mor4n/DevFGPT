import { createContext, useContext } from 'react';
import type{ ReactNode } from 'react';
import { useOpenRouter } from '../hooks/useOpenRouter';
import type { Message, ChatSession } from '../interfaces/ChatInterfaces';

export interface ChatContextType {
  messages: Message[];
  sessions: ChatSession[];
  activeSessionId: string | null;
  isLoading: boolean;
  error: string | null;
  sendMessage: (messageContent: string) => Promise<void>;
  createNewChat: () => void;
  selectChat: (id: string) => void;
  deleteChat: (id: string, e?: React.MouseEvent) => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const chatState = useOpenRouter();

  return (
    <ChatContext.Provider value={chatState}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext(): ChatContextType {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('Error de context');
  }
  return context;
}
