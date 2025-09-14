import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import InputBox from './InputBox';
import LoadingSpinner from './LoadingSpinner';
import { sendMessage, getSessionHistory, clearSession } from '../services/api';
import '../styles/ChatWindow.scss';

const ChatWindow = ({ sessionId, onResetSession }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const messagesEndRef = useRef(null);

  // Load chat history on session change
  useEffect(() => {
    loadChatHistory();
  }, [sessionId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatHistory = async () => {
    try {
      setIsLoading(true);
      const history = await getSessionHistory(sessionId);
      setMessages(history || []);
      setConnectionStatus('connected');
    } catch (error) {
      console.error('Failed to load chat history:', error);
      setConnectionStatus('error');
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message immediately
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send to backend and get response
      const response = await sendMessage(sessionId, messageText);
      
      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: response.message,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        sources: response.sources || []
      };

      setMessages(prev => [...prev, botMessage]);
      setConnectionStatus('connected');
    } catch (error) {
      console.error('Failed to send message:', error);
      setConnectionStatus('error');
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = async () => {
    try {
      setIsLoading(true);
      await clearSession(sessionId);
      setMessages([]);
      onResetSession();
    } catch (error) {
      console.error('Failed to reset session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="session-info">
          <span className={`status-indicator ${connectionStatus}`}></span>
          <span className="session-id">Session: {sessionId.slice(-8)}</span>
        </div>
        <button 
          className="reset-button"
          onClick={handleResetChat}
          disabled={isLoading}
        >
          🔄 Reset Chat
        </button>
      </div>

      <div className="chat-body">
        <MessageList messages={messages} isLoading={isLoading} />
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-footer">
        <InputBox 
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          placeholder="Ask me about recent news..."
        />
        {isLoading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default ChatWindow;

