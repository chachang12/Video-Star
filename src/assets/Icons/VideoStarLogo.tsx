import React from 'react';

interface VideoStarLogoProps {
  fill?: string;
  width?: string | number;
  height?: string | number;
}

const VideoStarLogo: React.FC<VideoStarLogoProps> = ({ fill = '#231f20', width = '100%', height = '100%' }) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1401.13 1070.12"
    width={width}
    height={height}
  >
    <defs>
      <style>
        {`.cls-1 { fill: ${fill}; }`}
      </style>
    </defs>
    <g>
      <path className="cls-1" d="M642.15,150.62l.34.71.25-.71h-.59Z" />
      <polygon className="cls-1" points="912 708.09 1087.23 1070.12 911.68 1001.61 821.27 809.1 764.82 688.89 915.89 517.79 680.18 517.79 679.99 517.37 583.06 317.12 395.96 839.14 255.05 839.14 0 91.18 150.13 150.62 318.18 663.89 518.87 150.62 569.91 0 642.15 150.62 642.5 151.33 642.3 151.87 642.2 152.14 642.74 151.87 759 392.07 1026.04 392.07 1026.04 393.03 1026.88 392.07 1195.88 392.07 912 708.09" />
    </g>
    <polygon className="cls-1" points="681.07 517.79 680.36 518.13 680.18 517.79 681.07 517.79" />
    <polygon className="cls-1" points="680.18 517.79 679.99 517.79 679.99 517.37 680.18 517.79" />
    <polygon className="cls-1" points="821.27 809.1 821.22 809.15 764.82 688.89 821.27 809.1" />
    <polygon className="cls-1" points="642.74 151.87 642.3 151.87 642.5 151.33 642.74 151.87" />
  </svg>
);

export default VideoStarLogo;