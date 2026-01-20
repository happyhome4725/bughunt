import React from 'react';
import leafBugImg from '../assets/leafbug.png';

interface LeafInsectIconProps {
    size?: number;
    className?: string;
}

const LeafInsectIcon: React.FC<LeafInsectIconProps> = ({ size = 40, className = '' }) => (
    <img
        src={leafBugImg}
        alt="Leaf Insect"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
    />
);

export default LeafInsectIcon;
