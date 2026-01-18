import React from 'react';

interface HerculesBeetleIconProps {
  size?: number;
  className?: string;
}

const HerculesBeetleIcon: React.FC<HerculesBeetleIconProps> = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 그림자 */}
    <ellipse cx="50" cy="92" rx="25" ry="5" fill="rgba(0,0,0,0.2)"/>

    {/* 뒷다리 */}
    <ellipse cx="25" cy="75" rx="8" ry="18" fill="#2d1810" transform="rotate(-30 25 75)"/>
    <ellipse cx="75" cy="75" rx="8" ry="18" fill="#2d1810" transform="rotate(30 75 75)"/>

    {/* 중간다리 */}
    <ellipse cx="30" cy="65" rx="6" ry="15" fill="#3d2314" transform="rotate(-20 30 65)"/>
    <ellipse cx="70" cy="65" rx="6" ry="15" fill="#3d2314" transform="rotate(20 70 65)"/>

    {/* 앞다리 */}
    <ellipse cx="35" cy="58" rx="5" ry="12" fill="#4a2818" transform="rotate(-10 35 58)"/>
    <ellipse cx="65" cy="58" rx="5" ry="12" fill="#4a2818" transform="rotate(10 65 58)"/>

    {/* 몸통 (등딱지) */}
    <ellipse cx="50" cy="60" rx="28" ry="22" fill="#1a0f0a"/>

    {/* 등딱지 광택 효과 */}
    <ellipse cx="50" cy="58" rx="24" ry="18" fill="#2d1810"/>
    <ellipse cx="45" cy="55" rx="15" ry="10" fill="url(#shineGradient)"/>

    {/* 머리 */}
    <ellipse cx="50" cy="42" rx="14" ry="10" fill="#1a0f0a"/>
    <ellipse cx="50" cy="41" rx="12" ry="8" fill="#2d1810"/>

    {/* 헤라클레스장수풍뎅이 특징: 큰 뿔 (Y자 형태) */}
    {/* 왼쪽 큰 뿔 */}
    <path
      d="M 48 38 Q 35 20 25 5 Q 20 8 22 12 Q 30 25 42 38"
      fill="#1a0f0a"
      stroke="#0d0705"
      strokeWidth="0.5"
    />
    <path
      d="M 48 38 Q 35 20 25 5 Q 20 8 22 12 Q 30 25 42 38"
      fill="url(#hornGradient)"
    />

    {/* 오른쪽 큰 뿔 */}
    <path
      d="M 52 38 Q 65 20 75 5 Q 80 8 78 12 Q 70 25 58 38"
      fill="#1a0f0a"
      stroke="#0d0705"
      strokeWidth="0.5"
    />
    <path
      d="M 52 38 Q 65 20 75 5 Q 80 8 78 12 Q 70 25 58 38"
      fill="url(#hornGradient)"
    />

    {/* 작은 뿔 (아래쪽) */}
    <path
      d="M 48 40 Q 42 35 40 30 L 42 32 Q 44 36 48 40"
      fill="#2d1810"
    />
    <path
      d="M 52 40 Q 58 35 60 30 L 58 32 Q 56 36 52 40"
      fill="#2d1810"
    />

    {/* 눈 */}
    <circle cx="45" cy="40" r="2.5" fill="#0d0705"/>
    <circle cx="55" cy="40" r="2.5" fill="#0d0705"/>
    <circle cx="45.5" cy="39.5" r="1" fill="rgba(255,255,255,0.3)"/>
    <circle cx="55.5" cy="39.5" r="1" fill="rgba(255,255,255,0.3)"/>

    {/* 더듬이 */}
    <path
      d="M 42 38 Q 35 30 28 25"
      stroke="#2d1810"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 58 38 Q 65 30 72 25"
      stroke="#2d1810"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />

    {/* 그라디언트 정의 */}
    <defs>
      <radialGradient id="shineGradient" cx="40%" cy="30%">
        <stop offset="0%" stopColor="rgba(139,90,43,0.4)"/>
        <stop offset="100%" stopColor="rgba(139,90,43,0)"/>
      </radialGradient>
      <linearGradient id="hornGradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#2d1810"/>
        <stop offset="100%" stopColor="#1a0f0a"/>
      </linearGradient>
    </defs>
  </svg>
);

export default HerculesBeetleIcon;
