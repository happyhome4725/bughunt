import React from 'react';
import chironBeetleImg from '../assets/chiron-beetle.png';

interface ChironBeetleIconProps {
    size?: number;
    className?: string;
}

const ChironBeetleIcon: React.FC<ChironBeetleIconProps> = ({ size = 40, className = '' }) => (
    <img
        src={chironBeetleImg}
        alt="Chiron Beetle"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
    />
);

export default ChironBeetleIcon;
