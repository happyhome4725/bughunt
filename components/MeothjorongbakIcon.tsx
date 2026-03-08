import React from 'react';
import meothjorongbakImg from '../assets/meothjorongbak.png';

interface MeothjorongbakIconProps {
    size?: number;
    className?: string;
}

const MeothjorongbakIcon: React.FC<MeothjorongbakIconProps> = ({ size = 40, className = '' }) => (
    <img
        src={meothjorongbakImg}
        alt="멋조롱박딱정벌레"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
    />
);

export default MeothjorongbakIcon;
