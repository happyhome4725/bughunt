import React from 'react';
import mantisImg from '../assets/mantis.png';

interface MantisIconProps {
    size?: number;
    className?: string;
}

const MantisIcon: React.FC<MantisIconProps> = ({ size = 40, className = '' }) => (
    <img
        src={mantisImg}
        alt="Mantis"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
    />
);

export default MantisIcon;
