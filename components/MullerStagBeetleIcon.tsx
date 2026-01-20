import React from 'react';
import mullerStagImg from '../assets/muller-stag-beetle.png';

interface MullerStagBeetleIconProps {
    size?: number;
    className?: string;
}

const MullerStagBeetleIcon: React.FC<MullerStagBeetleIconProps> = ({ size = 40, className = '' }) => (
    <img
        src={mullerStagImg}
        alt="Muller Stag Beetle"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
    />
);

export default MullerStagBeetleIcon;
