// components/ChatSection.tsx
"use client";
import React from 'react';

const ChatSection: React.FC = () => {
  const messages = [
    {
      id: '1',
      type: 'sender',
      content: "Hello! I'm your personal AI Assistant Smart Contract Generator.",
      timestamp: '10:25',
      avatar: 'SL'
    },
    {
      id: '2',
      type: 'recipient',
      content: '',
      timestamp: '11:25',
      avatar: 'https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/avatar.png',
      isAudio: true,
      audioLength: '02:12'
    },
    {
      id: '3',
      type: 'sender',
      content: 'You are welcome James. For me to help you, can I know what your project details are. eg; Package Name, Token Name, Decimals, Symbol, Name, Description, Icon URL',
      timestamp: '12:25',
      avatar: 'SL'
    },
    {
      id: '4',
      type: 'recipient',
      content: 'Sui coin, 100000000, SUI, Decentralized coin',
      timestamp: '01:25',
      avatar: 'https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/avatar-2.png'
    },
    {
      id: '5',
      type: 'sender',
      content: `module team_hackaton::sui_hackaton {
    use sui::coin;
    use sui::tx_context::{Self, TxContext};
    use std::option;
    use sui::transfer;
more.....`,
      timestamp: '02:25',
      avatar: 'SL',
      isCode: true
    }
  ];

  return (
    <div style={chatSectionStyle}>
      {messages.map((message) => (
        <div 
          key={message.id} 
          style={message.type === 'sender' ? senderContainerStyle : recipientContainerStyle}
        >
          {message.type === 'sender' && (
            <div style={avatarStyle}>
              <span>{message.avatar}</span>
            </div>
          )}
          
          <div style={message.type === 'sender' ? senderMessageStyle : recipientMessageStyle}>
            {message.isAudio ? (
              <div style={audioMessageStyle}>
                <div style={playButtonStyle}>
                  <img src="https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/monotone-3.png" alt="play" />
                </div>
                <div style={waveformStyle}>
                  <img src="https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/frame.png" alt="waveform" />
                </div>
                <div style={audioTimeStyle}>{message.audioLength}</div>
              </div>
            ) : (
              <div style={message.isCode ? codeBlockStyle : textContentStyle}>
                {message.content}
              </div>
            )}
            <div style={timestampStyle}>
              {message.timestamp}
              <img 
                src={message.type === 'sender' ? 'https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/checks.png' : 'https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/checks-2.png'} 
                alt="status" 
                style={statusIconStyle}
              />
            </div>
          </div>

          {message.type === 'recipient' && (
            <div style={recipientAvatarStyle}>
              <img src={message.avatar} alt="avatar" />
            </div>
          )}
        </div>
      ))}
      
      {messages.some(msg => msg.isCode) && (
        <div style={actionButtonsStyle}>
          <button style={actionButtonStyle}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/speaker-s.png" alt="speak" />
          </button>
          <button style={actionButtonStyle}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/copy-simp.png" alt="copy" />
          </button>
          <button style={actionButtonStyle}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/repeat.png" alt="repeat" />
          </button>
          <button style={actionButtonStyle}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/thumbs-do.png" alt="thumbs down" />
          </button>
          <button style={deployButtonStyle}>Deploy</button>
        </div>
      )}
    </div>
  );
};

const chatSectionStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '12px',
  minWidth: '544px',
  height: 'calc(100vh - 228px)',
  overflowY: 'auto' as const,
};

const senderContainerStyle = {
  display: 'flex',
  gap: '8px',
  width: '100%',
  justifyContent: 'flex-start' as const,
};

const recipientContainerStyle = {
  display: 'flex',
  gap: '8px',
  width: '100%',
  justifyContent: 'flex-end' as const,
};

const avatarStyle = {
  width: '40px',
  height: '40px',
  flexShrink: 0,
  borderRadius: '76.88px',
  backgroundColor: '#eef2ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const recipientAvatarStyle = {
  width: '40px',
  height: '40px',
  flexShrink: 0,
  borderRadius: '76.88px',
};

const senderMessageStyle = {
  padding: '12px',
  borderRadius: '16px',
  maxWidth: '600px',
  backgroundColor: '#fff',
  border: '1px solid #e2e8f0',
};

const recipientMessageStyle = {
  padding: '12px',
  borderRadius: '16px',
  maxWidth: '600px',
  backgroundColor: '#4f46e5',
  color: '#fff',
};

const textContentStyle = {
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '-0.084px',
  color: '#1e293b',
};

const codeBlockStyle = {
  fontFamily: 'monospace',
  whiteSpace: 'pre-wrap' as const,
  backgroundColor: '#fff',
  padding: '12px',
  borderRadius: '8px',
  color: '#1e293b',
};

const timestampStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginTop: '4px',
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '16px',
  letterSpacing: '-0.06px',
  color: '#475569',
};

const statusIconStyle = {
  width: '12px',
  height: '12px',
};

const audioMessageStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '8px',
};

const playButtonStyle = {
  width: '32px',
  height: '32px',
  backgroundColor: '#fff',
  borderRadius: '123px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const waveformStyle = {
  flexGrow: 1,
};

const audioTimeStyle = {
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '16px',
  color: '#fff',
};

const actionButtonsStyle = {
  display: 'flex',
  flexDirection: 'row' as const,
  gap: '16px',
  paddingLeft: '48px',
  marginTop: '12px',
};

const actionButtonStyle = {
  width: '24px',
  height: '24px',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
};

const deployButtonStyle = {
  fontFamily: 'Manrope, sans-serif',
  fontWeight: 700,
  fontSize: '16px',
  color: '#94a3b8',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
};

export default ChatSection;
