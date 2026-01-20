
import React from 'react';
import { BugInstance, BugType } from '../types';
import HerculesBeetleIcon from './HerculesBeetleIcon';
import LeafInsectIcon from './LeafInsectIcon';
import StickInsectIcon from './StickInsectIcon';

interface BugComponentProps {
  bug: BugInstance;
  onCatch: (id: string) => void;
}

const BugComponent: React.FC<BugComponentProps> = ({ bug, onCatch }) => {
  const isHerculesBeetle = bug.type === BugType.HERCULES_BEETLE;
  const isLeafInsect = bug.type === BugType.LEAF_INSECT;
  const isStickInsect = bug.type === BugType.STICK_INSECT;

  return (
    <div
      onMouseDown={(e) => {
        // 마우스 오른쪽 버튼 클릭 등은 무시하고 왼쪽 버튼(0) 클릭 시 즉시 실행
        if (e.button === 0) {
          onCatch(bug.id);
        }
      }}
      className="absolute cursor-pointer select-none transition-transform hover:scale-125 bug-transition"
      style={{
        left: `${bug.x}%`,
        top: `${bug.y}%`,
        fontSize: `${bug.size}px`,
        transform: `rotate(${bug.angle}deg)`,
        // 클릭 영역을 조금 더 넓게 확보하여 사용자 편의성 증대
        margin: '-20px',
        // SVG 사용시 정렬 조정
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isHerculesBeetle ? (
        <HerculesBeetleIcon size={bug.size} />
      ) : isLeafInsect ? (
        <LeafInsectIcon size={bug.size} />
      ) : isStickInsect ? (
        <StickInsectIcon size={bug.size} />
      ) : (
        <span role="img" aria-label={bug.type} className="p-2">
          {bug.emoji}
        </span>
      )}
    </div>
  );
};

export default BugComponent;
