import React from 'react';
import flowerBeetleImg from '../assets/borneo-flower-beetle.png';

interface BorneoFlowerBeetleIconProps {
    size?: number;
    className?: string;
}

const BorneoFlowerBeetleIcon: React.FC<BorneoFlowerBeetleIconProps> = ({ size = 40, className = '' }) => (
    <img
        src={flowerBeetleImg}
        alt="Borneo Horned Flower Beetle"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
    />
);

export default BorneoFlowerBeetleIcon;
