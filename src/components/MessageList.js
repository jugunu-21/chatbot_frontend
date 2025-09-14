import React from 'react';
import '../styles/MessageList.scss';

const MessageList = ({ messages, isLoading }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderMessage = (message) => {
    const { id, text, sender, timestamp, sources, isError } = message;
    
    return (
      <div key={id} className={`message ${sender} ${isError ? 'error' : ''}`}>
        <div className="message-content">
          <div className="message-text">
            {text}
          </div>
          
          {sources && sources.length > 0 && (
            <div className="message-sources">
              <p><strong>Sources:</strong></p>
              <ul>
                {sources.map((source, index) => (
                  <li key={index}>
                    {typeof source === 'string' ? source : (
                      <div className="source-item">
                        <div className="source-title">
                          {source.url ? (
                            <a href={source.url} target="_blank" rel="noopener noreferrer">
                              {source.title}
                            </a>
                          ) : (
                            source.title
                          )}
                        </div>
                        {source.relevanceScore && (
                          <div className="source-relevance">
                            Relevance: {Math.round(source.relevanceScore * 100)}%
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="message-timestamp">
            {formatTimestamp(timestamp)}
          </div>
        </div>
        
        <div className="message-avatar">
          {sender === 'user' ? '👤' : '🤖'}
        </div>
      </div>
    );
  };

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="message-list empty">
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h3>Start a conversation</h3>
          <p>Ask me anything about recent news and I'll help you find the information you need!</p>
          <div className="example-queries">
            <p><strong>Try asking:</strong></p>
            <ul>
              <li>"What's happening with Tesla stock?"</li>
              <li>"Any news about AI technology?"</li>
              <li>"Latest updates on climate change?"</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map(renderMessage)}
      
      {isLoading && (
        <div className="message bot loading">
          <div className="message-content">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="message-avatar">🤖</div>
        </div>
      )}
    </div>
  );
};

export default MessageList;

