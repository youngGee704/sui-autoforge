// components/Header.tsx
"use client";
import React from 'react';

const Header: React.FC = () => {
  return (
    <div style={headerStyle}>
      <div style={logoStyle}>
        <img src="https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/group-1.png" alt="Logo" style={logoImgStyle} />
        <span style={logoTextStyle}>Sui Autoforge</span>
      </div>
      <div style={rightSectionStyle}>
        <img src="https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/logo-dex.png" alt="DEX Logo" style={dexLogoStyle} />
        <div style={addressContainerStyle}>
          <div style={networkStyle}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/icon-col.png" alt="Network Icon" style={networkIconStyle} />
            <span style={networkTextStyle}>SUI</span>
          </div>
          <div style={addressTagStyle}>
            <span>0xBAD7...E116</span>
          </div>
        </div>
        <button style={iconButtonStyle}>
          <img src="https://dashboard.codeparrot.ai/api/image/Z9nX9ZIdzXb5OldZ/icon-bas.png" alt="Base Icon" style={buttonIconStyle} />
        </button>
      </div>
    </div>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '40px',
  padding: '0 20px',
  backgroundColor: '#1A1A1A',
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const logoImgStyle = {
  width: '31px',
  height: '24px',
};

const logoTextStyle = {
  fontFamily: 'Manrope, sans-serif',
  fontWeight: 500,
  fontSize: '14px',
  color: '#F2F2F2',
};

const rightSectionStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const dexLogoStyle = {
  width: '40px',
  height: '40px',
};

const addressContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#2C2D3A',
  borderRadius: '100px',
  paddingLeft: '16px',
  height: '40px',
};

const networkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginRight: '8px',
};

const networkIconStyle = {
  width: '14px',
  height: '14px',
};

const networkTextStyle = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '24px',
  color: '#FFFFFF',
};

const addressTagStyle = {
  backgroundColor: '#4E8AFF',
  borderRadius: '100px',
  padding: '8px 16px',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '24px',
  color: '#FFFFFF',
};

const iconButtonStyle = {
  width: '40px',
  height: '40px',
  backgroundColor: '#3B3C4E',
  borderRadius: '12px',
  border: 'none',
  padding: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.2s',
};

const buttonIconStyle = {
  width: '24px',
  height: '24px',
};

export default Header;
