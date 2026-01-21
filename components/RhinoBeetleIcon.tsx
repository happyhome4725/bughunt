import React from 'react';
import rhinoBeetleImg from '../assets/rhino-beetle.png';

interface RhinoBeetleIconProps {
    size?: number;
    className?: string;
}

const RhinoBeetleIcon: React.FC<RhinoBeetleIconProps> = ({ size = 40, className = '' }) => (
    <img
        src={rhinoBeetleImg}
        alt="Rhinoceros Beetle"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
    />
);

export default RhinoBeetleIcon;
