import React from 'react';
import denticulataImg from '../assets/denticulata-mantis.png';

interface DenticulataMantisIconProps {
    size?: number;
    className?: string;
}

const DenticulataMantisIcon: React.FC<DenticulataMantisIconProps> = ({ size = 40, className = '' }) => (
    <img
        src={denticulataImg}
        alt="덴티큘레라사마귀"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
    />
);

export default DenticulataMantisIcon;
