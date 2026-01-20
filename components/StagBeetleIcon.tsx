import React from 'react';
import stagBeetleImg from '../assets/stag-beetle.png';

interface StagBeetleIconProps {
    size?: number;
    className?: string;
}

const StagBeetleIcon: React.FC<StagBeetleIconProps> = ({ size = 40, className = '' }) => (
    <img
        src={stagBeetleImg}
        alt="Stag Beetle"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
    />
);

export default StagBeetleIcon;
