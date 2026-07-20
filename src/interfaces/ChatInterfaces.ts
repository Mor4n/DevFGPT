import type { MessageRole } from "./FormInterfaces";
import type { MouseEvent } from "react";

export interface Message {
  role: MessageRole;
  message: string;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  messages: Message[];
}

export interface HistoryProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string, e?: MouseEvent<HTMLButtonElement>) => void;
}
