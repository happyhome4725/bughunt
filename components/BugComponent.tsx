
import React from 'react';
import { BugInstance } from '../types';

interface BugComponentProps {
  bug: BugInstance;
  onCatch: (id: string) => void;
}

const BugComponent: React.FC<BugComponentProps> = ({ bug, onCatch }) => {
  return (
    <div
      onMouseDown={(e) => {
        // 마우스 오른쪽 버튼 클릭 등은 무시하고 왼쪽 버튼(0) 클릭 시 즉시 실행
        if (e.button === 0) {
          onCatch(bug.id);
        }
      }}
      className="absolute cursor-pointer select-none transition-transform hover:scale-125 bug-transition p-2"
      style={{
        left: `${bug.x}%`,
        top: `${bug.y}%`,
        fontSize: `${bug.size}px`,
        transform: `rotate(${bug.angle}deg)`,
        // 클릭 영역을 조금 더 넓게 확보하여 사용자 편의성 증대
        margin: '-20px', 
      }}
    >
      <span role="img" aria-label={bug.type}>
        {bug.emoji}
      </span>
    </div>
  );
};

export default BugComponent;
