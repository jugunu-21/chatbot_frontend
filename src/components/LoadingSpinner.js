import React from 'react';
import '../styles/LoadingSpinner.scss';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <span className="loading-text">Thinking...</span>
    </div>
  );
};

export default LoadingSpinner;
