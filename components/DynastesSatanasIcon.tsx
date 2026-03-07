import React from 'react';
import dynastesSatanasImg from '../assets/dynastes-satanas-new.png';

interface DynastesSatanasIconProps {
    size?: number;
    className?: string;
}

const DynastesSatanasIcon: React.FC<DynastesSatanasIconProps> = ({ size = 40, className = '' }) => (
    <img
        src={dynastesSatanasImg}
        alt="사탄왕장수풍뎅이"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
    />
);

export default DynastesSatanasIcon;
