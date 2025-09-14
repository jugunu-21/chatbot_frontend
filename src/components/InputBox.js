import React, { useState, useRef } from 'react';
import '../styles/InputBox.scss';

const InputBox = ({ onSendMessage, disabled, placeholder }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  return (
    <form className="input-box" onSubmit={handleSubmit}>
      <div className="input-container">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          maxLength={1000}
        />
        
        <button 
          type="submit" 
          className="send-button"
          disabled={!message.trim() || disabled}
        >
          {disabled ? '⏳' : '📤'}
        </button>
      </div>
      
      <div className="input-footer">
        <span className="character-count">
          {message.length}/1000
        </span>
        <span className="input-hint">
          Press Enter to send, Shift+Enter for new line
        </span>
      </div>
    </form>
  );
};

export default InputBox;
