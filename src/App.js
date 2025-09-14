import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import { generateSessionId } from './utils/sessionManager';
import './styles/App.scss';

function App() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Generate session ID on app load
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
  }, []);

  const handleResetSession = () => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
  };

  if (!sessionId) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Initializing chat session...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📰 News Chatbot</h1>
        <p>Ask me anything about recent news!</p>
      </header>
      
      <main className="app-main">
        <ChatWindow 
          sessionId={sessionId} 
          onResetSession={handleResetSession}
        />
      </main>
      
      <footer className="app-footer">
        <p>Powered by RAG + Google Gemini | Voosh Assignment</p>
      </footer>
    </div>
  );
}

export default App;
