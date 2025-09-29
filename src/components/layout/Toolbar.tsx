import React from 'react';
import { Button, ButtonProps } from '../ui/Button';

interface ToolbarProps {
  onNewSession: () => void;
  onClearMessages: () => void;
  sessionId: string;
  disabled?: boolean;
}

export function Toolbar({ 
  onNewSession, 
  onClearMessages, 
  sessionId, 
  disabled = false 
}: ToolbarProps) {
  const handleCopySessionId = async () => {
    try {
      await navigator.clipboard.writeText(sessionId);
      // Could add toast notification here
    } catch (error) {
      console.error('Failed to copy session ID:', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        {...({
          variant: "ghost",
          size: "sm",
          onClick: onClearMessages,
          disabled: disabled,
          title: "Limpiar historial visual",
          "aria-label": "Limpiar historial visual",
          children: (
            <div className="flex items-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="hidden sm:inline ml-1">Limpiar</span>
            </div>
          )
        } as ButtonProps)}
      />

      <Button
        {...({
          variant: "ghost",
          size: "sm",
          onClick: onNewSession,
          disabled: disabled,
          title: "Iniciar nueva sesión",
          "aria-label": "Iniciar nueva sesión",
          children: (
            <div className="flex items-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline ml-1">Nueva sesión</span>
            </div>
          )
        } as ButtonProps)}
      />

      <div className="border-l pl-2 ml-2 dark:border-gray-700">
        <Button
          {...({
            variant: "ghost",
            size: "sm",
            onClick: handleCopySessionId,
            disabled: disabled,
            title: `Copiar ID de sesión: ${sessionId}`,
            "aria-label": "Copiar ID de sesión",
            children: (
              <div className="flex items-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="hidden md:inline ml-1 font-mono text-xs">
                  {sessionId.slice(0, 8)}...
                </span>
              </div>
            )
          } as ButtonProps)}
        />
      </div>
    </div>
  );
}