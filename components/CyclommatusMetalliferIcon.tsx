import React from 'react';
import cyclommatusImg from '../assets/cyclommatus-metallifer.png';

interface CyclommatusMetalliferIconProps {
    size?: number;
    className?: string;
}

const CyclommatusMetalliferIcon: React.FC<CyclommatusMetalliferIconProps> = ({ size = 40, className = '' }) => (
    <img
        src={cyclommatusImg}
        alt="메탈리퍼가위사슴벌레"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
    />
);

export default CyclommatusMetalliferIcon;
