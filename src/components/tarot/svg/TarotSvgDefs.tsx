/**
 * Shared SVG Definitions for Level 96 Tarot Cards
 *
 * The Vector Alchemist Design System:
 * - Textured paper backgrounds (feTurbulence + feDiffuseLighting)
 * - Luxury metallic gradients
 * - Element-specific color palettes
 * - Art Nouveau border flourishes
 */

import React from 'react';

interface TarotSvgDefsProps {
  element: 'fire' | 'water' | 'air' | 'earth' | 'spirit';
  id: string;
}

// Element-specific color palettes
const elementPalettes = {
  fire: {
    primary: ['#c0392b', '#e74c3c', '#f1c40f'],
    secondary: '#9a7d0a',
    accent: '#f39c12',
  },
  water: {
    primary: ['#2c3e50', '#3498db', '#1abc9c'],
    secondary: '#1a5276',
    accent: '#5dade2',
  },
  air: {
    primary: ['#f1c40f', '#f9e79f', '#ecf0f1'],
    secondary: '#b7950b',
    accent: '#fdebd0',
  },
  earth: {
    primary: ['#27ae60', '#2ecc71', '#795548'],
    secondary: '#1e8449',
    accent: '#a0522d',
  },
  spirit: {
    primary: ['#8e44ad', '#9b59b6', '#d4af37'],
    secondary: '#6c3483',
    accent: '#bb8fce',
  },
};

export function TarotSvgDefs({ element, id }: TarotSvgDefsProps) {
  const palette = elementPalettes[element];

  return (
    <defs>
      {/* 1. TEXTURE FILTERS */}

      {/* Rough Paper - Adds grain and lighting for aged parchment feel */}
      <filter id={`${id}-rough-paper`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise" />
        <feDiffuseLighting lightingColor="#fff8dc" surfaceScale="1.5" result="light">
          <feDistantLight azimuth="45" elevation="50" />
        </feDiffuseLighting>
        <feComposite operator="in" in="light" in2="SourceGraphic" result="composite" />
        <feBlend mode="multiply" in="composite" in2="SourceGraphic" />
      </filter>

      {/* Drop Shadow for Depth */}
      <filter id={`${id}-soft-shadow`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
        <feOffset dx="2" dy="2" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="offsetblur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Glow Effect for Spirit/Stars */}
      <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* 2. LUXURY GRADIENTS */}

      {/* Burnished Gold (Metallic effect for borders/accents) */}
      <linearGradient id={`${id}-gold-metal`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f1c40f" />
        <stop offset="30%" stopColor="#fff9c4" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#9a7d0a" />
      </linearGradient>

      {/* Element Primary Gradient */}
      <linearGradient id={`${id}-element-gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={palette.primary[0]} />
        <stop offset="50%" stopColor={palette.primary[1]} />
        <stop offset="100%" stopColor={palette.primary[2]} />
      </linearGradient>

      {/* Element Radial (for spheres/orbs) */}
      <radialGradient id={`${id}-element-radial`} cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor={palette.primary[1]} />
        <stop offset="100%" stopColor={palette.primary[0]} />
      </radialGradient>

      {/* Porcelain (for faces/masks) */}
      <radialGradient id={`${id}-porcelain`} cx="40%" cy="40%" r="80%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="90%" stopColor="#bdc3c7" />
      </radialGradient>

      {/* Deep Velvet (for fabrics) */}
      <radialGradient id={`${id}-velvet`} cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor={palette.primary[1]} />
        <stop offset="100%" stopColor={palette.secondary} />
      </radialGradient>

      {/* 3. BACKGROUND PATTERNS */}

      {/* Sunburst (Fire) */}
      {element === 'fire' && (
        <pattern
          id={`${id}-pattern`}
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
          viewBox="0 0 100 100"
        >
          <path
            d="M50 50 L50 0 M50 50 L100 50 M50 50 L50 100 M50 50 L0 50"
            stroke="#d4af37"
            strokeWidth="0.5"
            opacity="0.15"
          />
          <path
            d="M50 50 L85 15 M50 50 L85 85 M50 50 L15 85 M50 50 L15 15"
            stroke="#d4af37"
            strokeWidth="0.5"
            opacity="0.15"
          />
        </pattern>
      )}

      {/* Waves (Water) */}
      {element === 'water' && (
        <pattern
          id={`${id}-pattern`}
          width="40"
          height="20"
          patternUnits="userSpaceOnUse"
          viewBox="0 0 40 20"
        >
          <path
            d="M0 10 Q10 0 20 10 Q30 20 40 10"
            fill="none"
            stroke="#3498db"
            strokeWidth="0.5"
            opacity="0.15"
          />
        </pattern>
      )}

      {/* Swirls (Air) */}
      {element === 'air' && (
        <pattern
          id={`${id}-pattern`}
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
          viewBox="0 0 60 60"
        >
          <path
            d="M30 30 Q20 20 30 10 Q40 0 50 10"
            fill="none"
            stroke="#f1c40f"
            strokeWidth="0.5"
            opacity="0.15"
          />
          <path
            d="M30 30 Q40 40 30 50 Q20 60 10 50"
            fill="none"
            stroke="#f1c40f"
            strokeWidth="0.5"
            opacity="0.15"
          />
        </pattern>
      )}

      {/* Lattice (Earth) */}
      {element === 'earth' && (
        <pattern
          id={`${id}-pattern`}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          viewBox="0 0 20 20"
        >
          <path
            d="M0 10 L10 0 L20 10 L10 20 Z"
            fill="none"
            stroke="#27ae60"
            strokeWidth="0.5"
            opacity="0.15"
          />
        </pattern>
      )}

      {/* Sacred Geometry (Spirit) */}
      {element === 'spirit' && (
        <pattern
          id={`${id}-pattern`}
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
          viewBox="0 0 50 50"
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#8e44ad"
            strokeWidth="0.3"
            opacity="0.15"
          />
          <polygon
            points="25,5 45,35 5,35"
            fill="none"
            stroke="#d4af37"
            strokeWidth="0.3"
            opacity="0.15"
          />
          <polygon
            points="25,45 45,15 5,15"
            fill="none"
            stroke="#d4af37"
            strokeWidth="0.3"
            opacity="0.15"
          />
        </pattern>
      )}
    </defs>
  );
}

// Shared Card Frame Component
interface CardFrameProps {
  id: string;
  element: 'fire' | 'water' | 'air' | 'earth' | 'spirit';
  number: string;
  title: string;
  children: React.ReactNode;
}

export function TarotCardFrame({ id, element, number, title, children }: CardFrameProps) {
  return (
    <svg width="200" height="300" viewBox="0 0 350 600" xmlns="http://www.w3.org/2000/svg">
      <TarotSvgDefs element={element} id={id} />

      {/* Background with Texture */}
      <rect
        x="0"
        y="0"
        width="350"
        height="600"
        fill="#fdf6e3"
        filter={`url(#${id}-rough-paper)`}
      />

      {/* Pattern Layer */}
      <rect x="20" y="20" width="310" height="560" fill={`url(#${id}-pattern)`} opacity="0.5" />

      {/* Double Border Frame */}
      <rect x="25" y="25" width="300" height="550" fill="none" stroke="#2c3e50" strokeWidth="4" />
      <rect
        x="32"
        y="32"
        width="286"
        height="536"
        fill="none"
        stroke={`url(#${id}-gold-metal)`}
        strokeWidth="1.5"
      />

      {/* Art Nouveau Corner Flourishes */}
      <g fill="#2c3e50">
        <path d="M25 65 C 25 45, 25 25, 65 25 L 65 30 C 40 30, 30 40, 30 65 Z" />
        <path d="M325 65 C 325 45, 325 25, 285 25 L 285 30 C 310 30, 320 40, 320 65 Z" />
        <path d="M25 535 C 25 555, 25 575, 65 575 L 65 570 C 40 570, 30 560, 30 535 Z" />
        <path d="M325 535 C 325 555, 325 575, 285 575 L 285 570 C 310 570, 320 560, 320 535 Z" />
      </g>

      {/* Number */}
      <text
        x="175"
        y="75"
        fontFamily="Times, serif"
        fontSize="42"
        fill="#2c3e50"
        textAnchor="middle"
        fontWeight="bold"
      >
        {number}
      </text>
      <circle cx="175" cy="95" r="4" fill={`url(#${id}-gold-metal)`} />

      {/* Central Illustration Area */}
      <g transform="translate(175, 280)" filter={`url(#${id}-soft-shadow)`}>
        {children}
      </g>

      {/* Title Label */}
      <g transform="translate(175, 510)">
        <rect
          x="-100"
          y="-25"
          width="200"
          height="50"
          fill="#fff"
          stroke="#2c3e50"
          strokeWidth="1.5"
        />
        <rect
          x="-96"
          y="-21"
          width="192"
          height="42"
          fill="none"
          stroke={`url(#${id}-gold-metal)`}
          strokeWidth="1"
        />
        <text
          x="0"
          y="8"
          fontFamily="Times, serif"
          fontSize="22"
          fontWeight="bold"
          fill="#2c3e50"
          textAnchor="middle"
          letterSpacing="3"
        >
          {title}
        </text>
      </g>

      {/* Gold Sparkles */}
      <g fill={`url(#${id}-gold-metal)`}>
        <path
          transform="translate(60, 160) scale(0.6)"
          d="M0 -10 Q2 -2 10 0 Q2 2 0 10 Q-2 2 -10 0 Q-2 -2 0 -10"
        />
        <path
          transform="translate(290, 130) scale(0.5)"
          d="M0 -10 Q2 -2 10 0 Q2 2 0 10 Q-2 2 -10 0 Q-2 -2 0 -10"
        />
        <path
          transform="translate(80, 420) scale(0.4)"
          d="M0 -10 Q2 -2 10 0 Q2 2 0 10 Q-2 2 -10 0 Q-2 -2 0 -10"
        />
        <path
          transform="translate(270, 400) scale(0.7)"
          d="M0 -10 Q2 -2 10 0 Q2 2 0 10 Q-2 2 -10 0 Q-2 -2 0 -10"
        />
      </g>
    </svg>
  );
}

export default TarotSvgDefs;
