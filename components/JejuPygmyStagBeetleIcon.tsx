import React from 'react';
import jejuPygmyImg from '../assets/jeju-pygmy-stag-beetle.png';

interface JejuPygmyStagBeetleIconProps {
    size?: number;
    className?: string;
}

const JejuPygmyStagBeetleIcon: React.FC<JejuPygmyStagBeetleIconProps> = ({ size = 40, className = '' }) => (
    <img
        src={jejuPygmyImg}
        alt="Jeju Horned Pygmy Stag Beetle"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
    />
);

export default JejuPygmyStagBeetleIcon;
