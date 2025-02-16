// components/Link.js
import React from 'react';

const Link = ({ href, children }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      style={{ 
        color: 'hsl(var(--nextra-primary-hue) 100% 45%)', 
        textDecoration: 'underline' 
      }}
    >
      {children}
    </a>
  );
};

export default Link;
