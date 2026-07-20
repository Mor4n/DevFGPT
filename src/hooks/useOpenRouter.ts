import { useReducer, useEffect } from 'react';
import type { Message } from '../interfaces/ChatInterfaces';
import {
  chatReducer,
  getInitialState,
  KEY
} from '../reducers/chatReducer';

export function useOpenRouter() {
  const [state, dispatch] = useReducer(chatReducer, undefined, getInitialState);

  const { sessions, activeSessionId, messages, isLoading, error } = state;

  // Sincronizar sesiones en localStorage cuando cambie el estado de sesiones
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error("Error al guardar historial en localStorage:", e);
    }
  }, [sessions]);

  // Nuevo chat
  const createNewChat = () => {
    dispatch({ type: 'NEW_CHAT' });
  };

  // Seleccionar chat
  const selectChat = (id: string) => {
    dispatch({ type: 'SELECT_CHAT', payload: id });
  };

  // Eliminar chat
  const deleteChat = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    dispatch({ type: 'DELETE_CHAT', payload: id });
  };

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const currentId = activeSessionId || Date.now().toString();

    dispatch({
      type: 'ADD_USER_MESSAGE',
      payload: { messageContent, sessionId: currentId }
    });

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

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

      dispatch({
        type: 'ADD_BOT_MESSAGE',
        payload: { message: assistantMessage, sessionId: currentId }
      });

    } catch (err: unknown) {
      console.error("Error al comunicarse con OpenRouter:", err);
      const errMsg = err instanceof Error ? err.message : "Error.";

      const errorMessage: Message = {
        role: "assistant",
        message: "Ocurrió un error al querer obtener la respuesta u.u (no me desconectes)"
      };

      dispatch({ type: 'SET_ERROR', payload: errMsg });
      dispatch({
        type: 'ADD_BOT_MESSAGE',
        payload: { message: errorMessage, sessionId: currentId }
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return {
    state,
    dispatch,
    messages,
    sessions,
    activeSessionId,
    isLoading,
    error,
    sendMessage,
    createNewChat,
    selectChat,
    deleteChat
  };
}

export default useOpenRouter;
