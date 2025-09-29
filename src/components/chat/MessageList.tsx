import React, { useEffect, useRef } from 'react';
import { MessageBubble, MessageBubbleProps } from './MessageBubble';
import type { Message } from '../../api/types';

interface MessageListProps {
  messages: Message[];
  loading?: boolean;
  showCopy?: boolean;
}

export function MessageList({ messages, loading = false, showCopy = true }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-1"
      role="log"
      aria-live="polite"
      aria-label="Historial de conversación"
    >
      {messages.length === 0 && !loading && (
        <div className="flex items-center justify-center h-full text-center">
          <div className="max-w-md space-y-3">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center dark:bg-gray-800">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                ¡Hola! Soy Ask-Data
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Puedo ayudarte a analizar datos de la hoja de Google Sheets. 
                Haz preguntas como:
              </p>
            </div>

            <div className="space-y-2 text-xs text-gray-500 dark:text-gray-500">
              <div className="p-2 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                "¿Cuál es el total gastado en enero 2024?"
              </div>
              <div className="p-2 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                "¿Qué campaña tuvo más conversiones?"
              </div>
              <div className="p-2 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                "Muestra las métricas por canal"
              </div>
            </div>
          </div>
        </div>
      )}

      {messages.map((message) => {
        const bubbleProps: MessageBubbleProps = {
          message: message,
          showCopy: showCopy
        };
        
        return (
          <MessageBubble
            key={message.id}
            {...bubbleProps}
          />
        );
      })}

      {loading && (
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center dark:bg-gray-600">
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M8 1a1 1 0 011-1h2a1 1 0 011 1v1h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h2V1zm3 3a1 1 0 10-2 0 1 1 0 002 0zm-1 3a2 2 0 00-2 2v4a2 2 0 004 0V9a2 2 0 00-2-2z" clipRule="evenodd" />
            </svg>
          </div>
          
          <div className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-2xl dark:bg-gray-800 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm">Pensando...</span>
            </div>
          </div>
        </div>
      )}

      <div ref={endRef} aria-hidden="true" />
    </div>
  );
}