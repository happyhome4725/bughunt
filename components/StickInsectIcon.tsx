import React from 'react';
import stickInsectImg from '../assets/stickinsect.png';

interface StickInsectIconProps {
    size?: number;
    className?: string;
}

const StickInsectIcon: React.FC<StickInsectIconProps> = ({ size = 40, className = '' }) => (
    <img
        src={stickInsectImg}
        alt="Stick Insect"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
    />
);

export default StickInsectIcon;
