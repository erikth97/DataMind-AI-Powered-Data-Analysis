import React from 'react';
import { MessageList } from './MessageList';
import { Composer } from './Composer';
import type { Message } from '../../api/types';

interface ChatContainerProps {
  messages: Message[];
  loading: boolean;
  onSendMessage: (message: string) => void;
  showCopy?: boolean;
}

export function ChatContainer({ 
  messages, 
  loading, 
  onSendMessage, 
  showCopy = true 
}: ChatContainerProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <MessageList 
        messages={messages} 
        loading={loading}
        showCopy={showCopy}
      />
      
      <Composer 
        onSend={onSendMessage}
        disabled={loading}
      />
    </div>
  );
}