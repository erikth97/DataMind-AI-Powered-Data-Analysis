import React from 'react';
import { useChat } from './hooks/useChat';
import { useSessionId } from './hooks/useSessionId';
import { Header } from './components/layout/Header';
import { Toolbar } from './components/layout/Toolbar';
import { ChatContainer } from './components/chat/ChatContainer';

function App() {
  const { messages, loading, sendMessage, clearMessages, newSession } = useChat();
  const { getOrCreate } = useSessionId();
  
  const sessionId = getOrCreate();

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header>
        <Toolbar
          onNewSession={newSession}
          onClearMessages={clearMessages}
          sessionId={sessionId}
          disabled={loading}
        />
      </Header>
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <ChatContainer
          messages={messages}
          loading={loading}
          onSendMessage={sendMessage}
          showCopy={true}
        />
      </main>
      
      <footer className="border-t bg-white dark:bg-gray-900 dark:border-gray-700 px-4 py-2">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div>
            Sesión: <span className="font-mono">{sessionId}</span>
          </div>
          <div>
            Ask-Data v1.0 - Powered by n8n & OpenAI
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
