import React, { useState } from 'react';
import type { Message } from '../../api/types';

export interface MessageBubbleProps {
  message: Message;
  showCopy?: boolean;
}

export function MessageBubble({ message, showCopy = false }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const isUser = message.from === 'user';
  const isBot = message.from === 'bot';
  const isSystem = message.from === 'system';

  const bubbleClasses = [
    'inline-block max-w-[85%] px-4 py-2 rounded-2xl shadow-sm break-words',
    isUser && 'bg-brand-600 text-white',
    isBot && 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100',
    isSystem && 'bg-yellow-50 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-200 dark:border-yellow-800',
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'group flex items-start gap-2 mb-3',
    isUser && 'justify-end',
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center dark:bg-gray-600">
          {isBot ? (
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M8 1a1 1 0 011-1h2a1 1 0 011 1v1h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h2V1zm3 3a1 1 0 10-2 0 1 1 0 002 0zm-1 3a2 2 0 00-2 2v4a2 2 0 004 0V9a2 2 0 00-2-2z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      )}

      <div className="flex flex-col">
        <div className={bubbleClasses}>
          <div className="whitespace-pre-wrap">{message.text}</div>
        </div>
        
        <div className="flex items-center justify-between mt-1 px-1">
          <time 
            className="text-xs text-gray-500 dark:text-gray-400"
            dateTime={new Date(message.timestamp).toISOString()}
          >
            {new Date(message.timestamp).toLocaleTimeString('es-MX', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </time>

          {showCopy && isBot && (
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded focus:outline-none focus:ring-1 focus:ring-brand-500"
              aria-label={copied ? 'Copiado' : 'Copiar mensaje'}
              title={copied ? 'Copiado' : 'Copiar mensaje'}
            >
              {copied ? (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}