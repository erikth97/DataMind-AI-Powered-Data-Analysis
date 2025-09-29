import { useState, useCallback } from 'react';
import { askData } from '../api/client';
import { useSessionId } from './useSessionId';
import { generateUuid } from '../utils/uuid';
import type { Message, ChatResponse } from '../api/types';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { getOrCreate, update, reset, create } = useSessionId();

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: generateUuid(),
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const message = text.trim();
    if (!message || loading) return;

    // Añadir mensaje del usuario
    addMessage({ from: 'user', text: message });
    setLoading(true);

    try {
      const sessionId = getOrCreate();
      const response: ChatResponse = await askData({
        message,
        sessionId,
        locale: 'es-MX',
      });

      if ('ok' in response && response.ok) {
        // Respuesta exitosa del bot
        addMessage({ from: 'bot', text: response.output });
        
        // Actualizar sessionId si el backend devuelve uno nuevo
        if (response.sessionId && response.sessionId !== sessionId) {
          update(response.sessionId);
        }
      } else if ('error' in response && response.error) {
        // Error del backend - verificamos que sea ChatError
        addMessage({ 
          from: 'system', 
          text: `❌ ${response.msg}` 
        });
      } else {
        // Fallback para respuestas inesperadas
        addMessage({ 
          from: 'system', 
          text: '❌ Respuesta inesperada del servidor' 
        });
      }
    } catch (error) {
      // Error de red o inesperado
      addMessage({ 
        from: 'system', 
        text: '❌ Error inesperado. Intenta de nuevo.' 
      });
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, getOrCreate, update, addMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const newSession = useCallback(() => {
    reset();
    const newSessionId = create();
    clearMessages();
    addMessage({ 
      from: 'system', 
      text: '🔄 Nueva sesión iniciada.' 
    });
    return newSessionId;
  }, [reset, create, clearMessages, addMessage]);

  return {
    messages,
    loading,
    sendMessage,
    clearMessages,
    newSession,
    addMessage,
  };
}