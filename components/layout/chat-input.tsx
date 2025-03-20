// components/ChatInput.tsx

"use client";

import React, { useState } from 'react';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={chatInputContainerStyle}>
      <div style={inputWrapperStyle}>
        <div style={messageRowStyle}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/papercli.png" 
            alt="attachment" 
            style={iconStyle}
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Message to slothpilot..."
            style={inputStyle}
          />
        </div>
        <div style={buttonRowStyle}>
          <button style={iconButtonStyle}>
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/monotone.png" 
              alt="voice" 
              style={buttonIconStyle}
            />
          </button>
          <button style={iconButtonStyle}>
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/monotone-2.png" 
              alt="add" 
              style={buttonIconStyle}
            />
          </button>
          <button 
            style={sendButtonStyle}
            onClick={handleSendMessage}
          >
            <span>Send</span>
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/paper-pla.png" 
              alt="send" 
              style={sendIconStyle}
            />
          </button>
        </div>
      </div>
    </div>
  );
};


const chatInputContainerStyle = {
  width: '100%',
  minWidth: '583px',
  height: '100px',
  padding: '24px 32px',
  boxSizing: 'border-box' as const,
};

const inputWrapperStyle = {
  width: '100%',
  height: '68px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '24px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '10px',
  boxSizing: 'border-box' as const,
};

const messageRowStyle = {
  display: 'flex',
  flexDirection: 'row' as const,
  alignItems: 'center',
  gap: '8px',
  width: '100%',
};

const iconStyle = {
  width: '24px',
  height: '24px',
};

const inputStyle = {
  flexGrow: 1,
  border: 'none',
  outline: 'none',
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '22px',
  letterSpacing: '-0.112px',
  color: '#475569',
};

const buttonRowStyle = {
  display: 'flex',
  flexDirection: 'row' as const,
  alignItems: 'center',
  gap: '8px',
  justifyContent: 'flex-end' as const,
};

const iconButtonStyle = {
  width: '40px',
  height: '40px',
  border: '1px solid #cbd5e1',
  borderRadius: '123px',
  background: 'transparent',
  padding: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const buttonIconStyle = {
  width: '24px',
  height: '24px',
};

const sendButtonStyle = {
  display: 'flex',
  flexDirection: 'row' as const,
  alignItems: 'center',
  gap: '8px',
  padding: '10px 16px',
  background: '#4f46e5',
  borderRadius: '1234px',
  border: 'none',
  cursor: 'pointer',
  color: '#ffffff',
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  fontWeight: 700,
  fontSize: '14px',
  letterSpacing: '-0.084px',
  lineHeight: '20px',
};

const sendIconStyle = {
  width: '20px',
  height: '20px',
};

export default ChatInput;
