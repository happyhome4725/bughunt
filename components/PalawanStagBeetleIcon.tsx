import React from 'react';
import palawanStagImg from '../assets/palawan-stag-beetle.png';

interface PalawanStagBeetleIconProps {
    size?: number;
    className?: string;
}

const PalawanStagBeetleIcon: React.FC<PalawanStagBeetleIconProps> = ({ size = 40, className = '' }) => (
    <img
        src={palawanStagImg}
        alt="Palawan Giant Stag Beetle"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
    />
);

export default PalawanStagBeetleIcon;
