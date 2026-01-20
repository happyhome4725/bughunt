import React from 'react';
import emeraldWaspImg from '../assets/emerald-wasp.png';

interface EmeraldWaspIconProps {
    size?: number;
    className?: string;
}

const EmeraldWaspIcon: React.FC<EmeraldWaspIconProps> = ({ size = 40, className = '' }) => (
    <img
        src={emeraldWaspImg}
        alt="Emerald Wasp"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
    />
);

export default EmeraldWaspIcon;
