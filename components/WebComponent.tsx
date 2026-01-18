
import React from 'react';
import { WebInstance } from '../types';

interface WebComponentProps {
  web: WebInstance;
  onClear: (id: string) => void;
}

const WebComponent: React.FC<WebComponentProps> = ({ web, onClear }) => {
  return (
    <div
      onMouseDown={(e) => {
        if (e.button === 0) {
          onClear(web.id);
        }
      }}
      className="absolute cursor-pointer select-none transition-all hover:scale-110 active:scale-90 opacity-85 hover:opacity-100 animate-pulse z-20 flex items-center justify-center"
      style={{
        left: `${web.x}%`,
        top: `${web.y}%`,
        width: `${web.size}px`,
        height: `${web.size}px`,
        transform: `translate(-50%, -50%) rotate(${web.angle}deg)`,
      }}
    >
      {/* 거미줄 배경 광채 효과 */}
      <div className="absolute inset-0 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
      
      <span 
        role="img" 
        aria-label="거미줄" 
        style={{ fontSize: `${web.size * 0.8}px` }}
        className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
      >
        🕸️
      </span>
    </div>
  );
};

export default WebComponent;
