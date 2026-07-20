import { useState } from 'react';
import type { MessageRole } from '../interfaces/FormInterfaces';

export interface Message {
  role: MessageRole;
  message: string;
}

export function useOpenRouter(initialMessages: Message[] = [
  {
    role: "assistant",
    message: "Hola, ¿en qué puedo ayudarte?"
  }
]) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMessage: Message = {
      role: "user",
      message: messageContent
    };

    setMessages((prev) => [...prev, userMessage]);
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

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: data.response
        }
      ]);
    } catch (err: unknown) {
      console.error("Error al comunicarse con OpenRouter:", err);
      const errMsg = err instanceof Error ? err.message : "Error.";
      setError(errMsg);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: "Ocurrió un error al querer obtener la respuesta u.u (no me desconectes)"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    setMessages
  };
}

export default useOpenRouter;
