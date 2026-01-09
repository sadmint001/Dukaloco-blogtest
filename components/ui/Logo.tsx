
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Light Blue Circle Background */}
        <circle cx="50" cy="50" r="48" fill="#A8DADC" />
        
        {/* Striped Awning */}
        <path d="M30 40 Q50 35 70 40 L70 45 Q50 40 30 45 Z" fill="#5D4037" />
        <path d="M30 40 L38 40 L38 45 L30 45 Z" fill="#F48FB1" />
        <path d="M46 40 L54 40 L54 45 L46 45 Z" fill="#F48FB1" />
        <path d="M62 40 L70 40 L70 45 L62 45 Z" fill="#F48FB1" />
        
        {/* Duka Loco Text */}
        <text 
          x="50" 
          y="58" 
          textAnchor="middle" 
          fontFamily="Georgia, serif" 
          fontSize="12" 
          fontWeight="bold" 
          fill="#5D4037"
          letterSpacing="0.5"
        >
          Duka Loco
        </text>
        
        {/* Cart/Table Line */}
        <rect x="25" y="62" width="50" height="1.5" rx="0.75" fill="#5D4037" />
        
        {/* Wheels */}
        <circle cx="35" cy="68" r="3" fill="none" stroke="#5D4037" strokeWidth="0.8" />
        <circle cx="65" cy="68" r="3" fill="none" stroke="#5D4037" strokeWidth="0.8" />
      </svg>
    </div>
  );
};

export default Logo;
