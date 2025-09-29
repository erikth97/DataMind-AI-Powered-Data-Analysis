import React, { useState, useCallback, KeyboardEvent } from 'react';
import { Button, ButtonProps } from '../ui/Button';
import { Textarea, TextareaProps } from '../ui/Textarea';

interface ComposerProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
}

export function Composer({ 
  onSend, 
  disabled = false, 
  placeholder = "Escribe tu pregunta sobre los datos...",
  maxLength = 2000
}: ComposerProps) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSend = useCallback(() => {
    const trimmed = message.trim();
    
    if (!trimmed) {
      setError('Por favor escribe tu pregunta');
      return;
    }

    if (trimmed.length > maxLength) {
      setError(`El mensaje no puede exceder ${maxLength} caracteres`);
      return;
    }

    setError('');
    onSend(trimmed);
    setMessage('');
  }, [message, onSend, maxLength]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    
    // Clear error when user starts typing
    if (error && value.trim()) {
      setError('');
    }
  }, [error]);

  const isOverLimit = message.length > maxLength;
  const charactersLeft = maxLength - message.length;

  return (
    <div className="border-t bg-white dark:bg-gray-900 dark:border-gray-700 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Textarea
              {...({
                id: "message-input",
                value: message,
                onChange: handleChange,
                onKeyDown: handleKeyDown,
                placeholder: placeholder,
                disabled: disabled,
                rows: 2,
                maxLength: maxLength,
                showCount: true,
                error: error || (isOverLimit ? `Máximo ${maxLength} caracteres` : undefined),
                className: "resize-none",
                "aria-label": "Escribir mensaje"
              } as TextareaProps)}
            />
            
            {!error && !isOverLimit && charactersLeft <= 100 && (
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {charactersLeft} caracteres restantes
              </div>
            )}
          </div>
          
          <Button
            {...({
              onClick: handleSend,
              disabled: disabled || !message.trim() || isOverLimit,
              loading: disabled,
              variant: "primary",
              size: "md",
              className: "self-end",
              "aria-label": "Enviar mensaje",
              children: disabled ? 'Enviando...' : 'Enviar'
            } as ButtonProps)}
          />
        </div>

        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs dark:bg-gray-800">Enter</kbd> para enviar, 
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs ml-1 dark:bg-gray-800">Shift + Enter</kbd> para nueva línea
        </div>
      </div>
    </div>
  );
}