import React from 'react';
import herculesBeetleImg from '../assets/hercules-beetle.png';

interface HerculesBeetleIconProps {
  size?: number;
  className?: string;
}

const HerculesBeetleIcon: React.FC<HerculesBeetleIconProps> = ({ size = 40, className = '' }) => (
  <img
    src={herculesBeetleImg}
    alt="Hercules Beetle"
    width={size}
    height={size}
    className={className}
    style={{ objectFit: 'contain', display: 'block' }}
  />
);

export default HerculesBeetleIcon;
