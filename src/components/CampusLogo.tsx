import React from 'react';

interface CampusLogoProps {
  className?: string;
  size?: number | string;
}

export const CampusLogo: React.FC<CampusLogoProps> = ({
  className = 'w-6 h-6',
  size,
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        {/* Soft Shadow Filter for subtle 3D depth */}
        <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#DC381F" floodOpacity="0.12" />
        </filter>

        {/* Coral Gradient for circulation arrows & backpack */}
        <linearGradient id="coralGrad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F57662" />
          <stop offset="1" stopColor="#E2543F" />
        </linearGradient>

        <linearGradient id="arrowTopGrad" x1="60" y1="30" x2="160" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F57B67" />
          <stop offset="1" stopColor="#EE614A" />
        </linearGradient>

        <linearGradient id="arrowBottomGrad" x1="160" y1="150" x2="40" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EE614A" />
          <stop offset="1" stopColor="#F57E6B" />
        </linearGradient>

        <linearGradient id="packStrapGrad" x1="30" y1="80" x2="60" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DE533E" />
          <stop offset="1" stopColor="#C94430" />
        </linearGradient>
      </defs>

      {/* Circulation Loop Arrows */}
      <g filter="url(#logoShadow)">
        {/* Top Arc Arrow (Recycle / Circulation) */}
        <path
          d="M 68 53 C 94 34 134 38 155 64"
          stroke="url(#arrowTopGrad)"
          strokeWidth="15"
          strokeLinecap="round"
        />
        {/* Top Arrow Head pointing right-downward */}
        <path
          d="M 128 65 L 157 66 L 150 38 Z"
          fill="#EE614A"
          stroke="#EE614A"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Bottom Arc Arrow (Recycle / Circulation) */}
        <path
          d="M 160 137 C 137 166 84 172 52 143"
          stroke="url(#arrowBottomGrad)"
          strokeWidth="15"
          strokeLinecap="round"
        />
        {/* Bottom Arrow Head pointing left-upward */}
        <path
          d="M 72 136 L 47 141 L 52 169 Z"
          fill="#F57E6B"
          stroke="#F57E6B"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </g>

      {/* Backpack Left Strap */}
      <path
        d="M 68 76 C 50 78 35 94 36 122 C 37 131 42 138 48 135 C 53 132 54 125 53 116 C 52 98 59 86 69 82 Z"
        fill="url(#packStrapGrad)"
      />

      {/* Backpack Handle Top Loop */}
      <path
        d="M 72 68 C 72 58 92 57 95 67 Z"
        stroke="#E2543F"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Backpack Main Body */}
      <g filter="url(#logoShadow)">
        <path
          d="M 66 73 C 82 66 108 67 122 75 C 130 80 133 93 134 116 C 136 142 126 154 105 156 C 82 157 63 154 55 137 C 49 123 52 82 66 73 Z"
          fill="url(#coralGrad)"
        />

        {/* Top Flap (Soft Cream/Peach) */}
        <path
          d="M 64 78 C 78 70 102 71 118 78 C 127 82 128 99 122 109 C 117 117 76 123 64 113 C 58 107 56 83 64 78 Z"
          fill="#FFF2EC"
        />

        {/* Clasp / Buckle on Flap */}
        <rect
          x="92"
          y="102"
          width="18"
          height="13"
          rx="4"
          fill="#EE6049"
        />

        {/* Lower Front Pocket (Soft Cream/Peach) */}
        <rect
          x="77"
          y="118"
          width="47"
          height="28"
          rx="9"
          fill="#FFF2EC"
        />
      </g>

      {/* Notebook / Textbook on the Right */}
      <g filter="url(#logoShadow)">
        {/* Book Base (Slightly tilted) */}
        <g transform="rotate(13 145 125)">
          {/* Blue Spine Underlayer */}
          <rect
            x="117"
            y="94"
            width="46"
            height="58"
            rx="8"
            fill="#7B99B6"
          />
          {/* White / Pale Blue Cover */}
          <rect
            x="121"
            y="92"
            width="44"
            height="58"
            rx="7"
            fill="#F6F9FC"
            stroke="#DCE5ED"
            strokeWidth="1.5"
          />
          {/* Rectangular Label on Cover */}
          <rect
            x="131"
            y="108"
            width="22"
            height="11"
            rx="3"
            fill="#8CA5C0"
          />
        </g>
      </g>

      {/* Sparkles / Dynamic Rays Above Notebook */}
      <g fill="#F3755F">
        {/* Ray 1 */}
        <rect
          x="163"
          y="69"
          width="5.5"
          height="14"
          rx="2.75"
          transform="rotate(38 163 69)"
        />
        {/* Ray 2 */}
        <rect
          x="171"
          y="84"
          width="5.5"
          height="12"
          rx="2.75"
          transform="rotate(65 171 84)"
        />
      </g>
    </svg>
  );
};
