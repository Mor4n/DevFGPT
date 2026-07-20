import { useState, useEffect } from 'react';
import type { Message, ChatSession } from '../interfaces/ChatInterfaces';

const KEY = 'dev_fgpt_chat_history';

const DEFAULT_WELCOME_MESSAGE: Message = {
  role: "assistant",
  message: "Hola, ¿en qué puedo ayudarte?"
};

export function useOpenRouter() {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error al cargar historial de localStorage:", e);
    }
    return [];
  });

  const [activeSessionId, setActiveSessionId] = useState<string | null>(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) {
      try {
        const parsed: ChatSession[] = JSON.parse(saved);
        if (parsed.length > 0) {
          return parsed[0].id;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    if (activeSessionId) {
      const found = sessions.find(s => s.id === activeSessionId);
      if (found) return found.messages;
    }
    return [DEFAULT_WELCOME_MESSAGE];
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Sincronizar sesiones en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error("Error al guardar historial en localStorage:", e);
    }
  }, [sessions]);

  // Actualizar los mensajes
  useEffect(() => {
    if (activeSessionId) {
      const active = sessions.find(s => s.id === activeSessionId);
      if (active) {
        setMessages(active.messages);
        return;
      }
    }
    setMessages([DEFAULT_WELCOME_MESSAGE]);
  }, [activeSessionId, sessions]);

  // Nuevo xhat
  const createNewChat = () => {
    setActiveSessionId(null);
    setMessages([DEFAULT_WELCOME_MESSAGE]);
    setError(null);
  };

  // Seleccionar chat
  const selectChat = (id: string) => {
    setActiveSessionId(id);
    const selected = sessions.find(s => s.id === id);
    if (selected) {
      setMessages(selected.messages);
    }
    setError(null);
  };

  // Eliminar chat
  const deleteChat = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);

    if (activeSessionId === id) {
      if (updated.length > 0) {
        setActiveSessionId(updated[0].id);
        setMessages(updated[0].messages);
      } else {
        createNewChat();
      }
    }
  };

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMessage: Message = {
      role: "user",
      message: messageContent
    };

    let currentId = activeSessionId;
    let newSessions = [...sessions];

    // Si no hay chat activo o chat nuevo sin id, secrea una nueva sesion
    if (!currentId) {
      currentId = Date.now().toString();
      const newSession: ChatSession = {
        id: currentId,
        title: messageContent.slice(0, 30) + (messageContent.length > 30 ? "..." : ""),
        createdAt: Date.now(),
        messages: [DEFAULT_WELCOME_MESSAGE, userMessage]
      };
      newSessions = [newSession, ...newSessions];
      setActiveSessionId(currentId);
      setSessions(newSessions);
      setMessages(newSession.messages);
    } else {
      // Añadir mensaje de user a la sesion actual
      newSessions = newSessions.map(s => {
        if (s.id === currentId) {
          return {
            ...s,
            messages: [...s.messages, userMessage]
          };
        }
        return s;
      });
      setSessions(newSessions);
      setMessages(prev => [...prev, userMessage]);
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: messageContent })
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      const assistantMessage: Message = {
        role: "assistant",
        message: data.response
      };

      setSessions(prevSessions =>
        prevSessions.map(s => {
          if (s.id === currentId) {
            return {
              ...s,
              messages: [...s.messages, assistantMessage]
            };
          }
          return s;
        })
      );

      setMessages(prev => [...prev, assistantMessage]);

    } catch (err: unknown) {
      console.error("Error al comunicarse con OpenRouter:", err);
      const errMsg = err instanceof Error ? err.message : "Error.";
      setError(errMsg);

      const errorMessage: Message = {
        role: "assistant",
        message: "Ocurrió un error al querer obtener la respuesta u.u (no me desconectes)"
      };

      setSessions(prevSessions =>
        prevSessions.map(s => {
          if (s.id === currentId) {
            return {
              ...s,
              messages: [...s.messages, errorMessage]
            };
          }
          return s;
        })
      );

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sessions,
    activeSessionId,
    isLoading,
    error,
    sendMessage,
    createNewChat,
    selectChat,
    deleteChat,
    setMessages
  };
}

export default useOpenRouter;
