/**
 * Level 96 Tarot Card Illustrations
 *
 * Following "The Vector Alchemist" design standard:
 * - Pure vector (no raster images)
 * - Textured paper with feTurbulence
 * - Multi-stop gradients for depth
 * - Art Nouveau framing
 */

import React from 'react';

// Shared filter and gradient definitions
const SharedDefs = ({ id, element }: { id: string; element: string }) => {
  const palettes: Record<string, { primary: string[]; secondary: string }> = {
    fire: { primary: ['#c0392b', '#e74c3c', '#f1c40f'], secondary: '#9a7d0a' },
    water: { primary: ['#2c3e50', '#3498db', '#5dade2'], secondary: '#1a5276' },
    air: { primary: ['#f1c40f', '#f9e79f', '#ecf0f1'], secondary: '#b7950b' },
    earth: { primary: ['#27ae60', '#2ecc71', '#795548'], secondary: '#1e8449' },
    spirit: { primary: ['#8e44ad', '#9b59b6', '#d4af37'], secondary: '#6c3483' },
  };
  const p = palettes[element] || palettes.spirit;

  return (
    <defs>
      <filter id={`${id}-paper`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise" />
        <feDiffuseLighting lightingColor="#fff8dc" surfaceScale="1.5" result="light">
          <feDistantLight azimuth="45" elevation="50" />
        </feDiffuseLighting>
        <feComposite operator="in" in="light" in2="SourceGraphic" result="composite" />
        <feBlend mode="multiply" in="composite" in2="SourceGraphic" />
      </filter>
      <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
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
      <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id={`${id}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f1c40f" />
        <stop offset="30%" stopColor="#fff9c4" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#9a7d0a" />
      </linearGradient>
      <linearGradient id={`${id}-elem`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={p.primary[0]} />
        <stop offset="50%" stopColor={p.primary[1]} />
        <stop offset="100%" stopColor={p.primary[2]} />
      </linearGradient>
      <radialGradient id={`${id}-velvet`} cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor={p.primary[1]} />
        <stop offset="100%" stopColor={p.secondary} />
      </radialGradient>
      <radialGradient id={`${id}-porcelain`} cx="40%" cy="40%" r="80%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="90%" stopColor="#bdc3c7" />
      </radialGradient>
    </defs>
  );
};

// Base card frame wrapper
const CardFrame = ({
  id,
  element,
  number,
  title,
  children,
}: {
  id: string;
  element: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <svg viewBox="0 0 350 600" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <SharedDefs id={id} element={element} />
    {/* Paper Background */}
    <rect width="350" height="600" fill="#fdf6e3" filter={`url(#${id}-paper)`} />
    {/* Double Border */}
    <rect x="25" y="25" width="300" height="550" fill="none" stroke="#2c3e50" strokeWidth="4" />
    <rect
      x="32"
      y="32"
      width="286"
      height="536"
      fill="none"
      stroke={`url(#${id}-gold)`}
      strokeWidth="1.5"
    />
    {/* Corner Flourishes */}
    <g fill="#2c3e50">
      <path d="M25 65 C25 45 25 25 65 25L65 30C40 30 30 40 30 65Z" />
      <path d="M325 65 C325 45 325 25 285 25L285 30C310 30 320 40 320 65Z" />
      <path d="M25 535 C25 555 25 575 65 575L65 570C40 570 30 560 30 535Z" />
      <path d="M325 535 C325 555 325 575 285 575L285 570C310 570 320 560 320 535Z" />
    </g>
    {/* Number */}
    <text
      x="175"
      y="70"
      fontFamily="Times, serif"
      fontSize="36"
      fill="#2c3e50"
      textAnchor="middle"
      fontWeight="bold"
    >
      {number}
    </text>
    <circle cx="175" cy="88" r="3" fill={`url(#${id}-gold)`} />
    {/* Central Illustration */}
    <g transform="translate(175, 300)" filter={`url(#${id}-shadow)`}>
      {children}
    </g>
    {/* Title */}
    <g transform="translate(175, 520)">
      <rect
        x="-90"
        y="-22"
        width="180"
        height="44"
        fill="#fffef8"
        stroke="#2c3e50"
        strokeWidth="1.5"
      />
      <rect
        x="-86"
        y="-18"
        width="172"
        height="36"
        fill="none"
        stroke={`url(#${id}-gold)`}
        strokeWidth="1"
      />
      <text
        y="6"
        fontFamily="Times, serif"
        fontSize="18"
        fontWeight="bold"
        fill="#2c3e50"
        textAnchor="middle"
        letterSpacing="2"
      >
        {title}
      </text>
    </g>
    {/* Sparkles */}
    <g fill={`url(#${id}-gold)`} opacity="0.8">
      <path
        transform="translate(60 150) scale(0.5)"
        d="M0-10Q2-2 10 0Q2 2 0 10Q-2 2-10 0Q-2-2 0-10"
      />
      <path
        transform="translate(290 140) scale(0.4)"
        d="M0-10Q2-2 10 0Q2 2 0 10Q-2 2-10 0Q-2-2 0-10"
      />
      <path
        transform="translate(75 430) scale(0.35)"
        d="M0-10Q2-2 10 0Q2 2 0 10Q-2 2-10 0Q-2-2 0-10"
      />
      <path
        transform="translate(275 420) scale(0.55)"
        d="M0-10Q2-2 10 0Q2 2 0 10Q-2 2-10 0Q-2-2 0-10"
      />
    </g>
  </svg>
);

// ============================================
// THE FOOL (Air, #0)
// ============================================
export const TheFool = () => (
  <CardFrame id="fool" element="air" number="0" title="THE FOOL">
    {/* Cliff Edge (negative space) */}
    <path
      d="M-80 100 L-60 80 L-40 90 L-20 70 L0 85 L20 65 L40 80 L60 70 L80 100 L80 120 L-80 120 Z"
      fill="#795548"
    />
    {/* Sky gradient behind */}
    <ellipse cx="0" cy="-40" rx="70" ry="50" fill="url(#fool-velvet)" opacity="0.3" />
    {/* Bindle Stick */}
    <line
      x1="-30"
      y1="60"
      x2="30"
      y2="-60"
      stroke="#8b4513"
      strokeWidth="6"
      strokeLinecap="round"
    />
    {/* Bindle Sack */}
    <ellipse cx="35" cy="-70" rx="25" ry="20" fill="url(#fool-velvet)" />
    <path d="M20 -70 Q35 -90 50 -70" fill="none" stroke="#2c3e50" strokeWidth="1" />
    {/* White Rose */}
    <g transform="translate(-50, 20)">
      <ellipse cx="0" cy="0" rx="12" ry="10" fill="#fff" stroke="#bdc3c7" strokeWidth="1" />
      <ellipse cx="-6" cy="-5" rx="8" ry="6" fill="#fff" />
      <ellipse cx="6" cy="-5" rx="8" ry="6" fill="#fff" />
      <circle cx="0" cy="0" r="4" fill="#f1c40f" />
    </g>
    {/* Small Dog silhouette */}
    <g transform="translate(50, 60)">
      <ellipse cx="0" cy="0" rx="15" ry="10" fill="#2c3e50" />
      <circle cx="-12" cy="-8" r="6" fill="#2c3e50" />
      <path d="M-15 -12 L-18 -20 M-9 -12 L-6 -20" stroke="#2c3e50" strokeWidth="2" />
      <ellipse cx="15" cy="5" rx="3" ry="8" fill="#2c3e50" />
    </g>
    {/* Sun rays */}
    <g stroke="url(#fool-gold)" strokeWidth="1.5" opacity="0.6">
      <line x1="0" y1="-100" x2="0" y2="-130" />
      <line x1="20" y1="-95" x2="30" y2="-120" />
      <line x1="-20" y1="-95" x2="-30" y2="-120" />
      <line x1="35" y1="-85" x2="55" y2="-100" />
      <line x1="-35" y1="-85" x2="-55" y2="-100" />
    </g>
  </CardFrame>
);

// ============================================
// THE BUILDER (Fire, #1) - Custom Archetype
// ============================================
export const TheBuilder = () => (
  <CardFrame id="builder" element="fire" number="I" title="THE BUILDER">
    {/* Background glow */}
    <circle cx="0" cy="-20" r="60" fill="url(#builder-velvet)" opacity="0.2" />
    {/* Stone Wall */}
    <g transform="translate(-60, 30)">
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={col * 42 + (row % 2) * 21}
            y={row * 25}
            width="40"
            height="22"
            fill="#bdc3c7"
            stroke="#7f8c8d"
            strokeWidth="1"
            rx="2"
          />
        ))
      )}
    </g>
    {/* Square and Compass */}
    <g transform="translate(0, -50)">
      {/* Compass (A-frame) */}
      <path
        d="M0 -50 L-35 30 M0 -50 L35 30"
        stroke="url(#builder-gold)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="0" cy="-50" r="6" fill="url(#builder-gold)" />
      {/* Square (L-shape) */}
      <path
        d="M-25 0 L25 0 L25 -30"
        fill="none"
        stroke="#2c3e50"
        strokeWidth="5"
        strokeLinecap="square"
      />
    </g>
    {/* Hammer */}
    <g transform="translate(55, 70) rotate(-30)">
      <rect x="-4" y="0" width="8" height="35" fill="#8b4513" rx="2" />
      <rect
        x="-15"
        y="-12"
        width="30"
        height="14"
        fill="#7f8c8d"
        stroke="#2c3e50"
        strokeWidth="1"
        rx="2"
      />
    </g>
    {/* Flame accents */}
    <g fill="url(#builder-elem)" opacity="0.7">
      <path d="M-70 -60 Q-65 -80 -60 -60 Q-55 -75 -50 -55" />
      <path d="M70 -60 Q65 -80 60 -60 Q55 -75 50 -55" />
    </g>
  </CardFrame>
);

// ============================================
// HIGH PRIESTESS (Water, #2)
// ============================================
export const HighPriestess = () => (
  <CardFrame id="priestess" element="water" number="II" title="HIGH PRIESTESS">
    {/* Pillars - Boaz (dark) and Jachin (light) */}
    <rect x="-75" y="-80" width="25" height="160" fill="#2c3e50" />
    <rect x="50" y="-80" width="25" height="160" fill="#ecf0f1" stroke="#bdc3c7" strokeWidth="1" />
    <text x="-62" y="-60" fontFamily="Times, serif" fontSize="14" fill="#fff" textAnchor="middle">
      B
    </text>
    <text x="62" y="-60" fontFamily="Times, serif" fontSize="14" fill="#2c3e50" textAnchor="middle">
      J
    </text>
    {/* Pomegranate Curtain */}
    <path
      d="M-50 -80 Q0 -70 50 -80 L50 80 Q0 90 -50 80 Z"
      fill="url(#priestess-velvet)"
      opacity="0.6"
    />
    {/* Pomegranates */}
    {[-30, 0, 30].map((x) => (
      <g key={x} transform={`translate(${x}, ${x === 0 ? -40 : -20})`}>
        <circle r="8" fill="#c0392b" />
        <path d="M-3 -8 L0 -12 L3 -8" fill="#27ae60" />
      </g>
    ))}
    {/* Scroll */}
    <g transform="translate(0, 30)">
      <rect
        x="-25"
        y="-15"
        width="50"
        height="30"
        fill="#fdf6e3"
        stroke="#d4af37"
        strokeWidth="1"
        rx="3"
      />
      <text y="5" fontFamily="Times, serif" fontSize="12" fill="#2c3e50" textAnchor="middle">
        TORA
      </text>
    </g>
    {/* Crescent Moon at base */}
    <path d="M-15 75 A20 20 0 0 1 15 75" fill="none" stroke="#c0c0c0" strokeWidth="3" />
  </CardFrame>
);

// ============================================
// THE EMPEROR (Fire, #4)
// ============================================
export const TheEmperor = () => (
  <CardFrame id="emperor" element="fire" number="IV" title="THE EMPEROR">
    {/* Stone Throne */}
    <rect
      x="-55"
      y="-40"
      width="110"
      height="120"
      fill="#7f8c8d"
      stroke="#2c3e50"
      strokeWidth="2"
    />
    <rect x="-65" y="-60" width="20" height="140" fill="#95a5a6" stroke="#2c3e50" strokeWidth="1" />
    <rect x="45" y="-60" width="20" height="140" fill="#95a5a6" stroke="#2c3e50" strokeWidth="1" />
    {/* Ram Heads on armrests */}
    {[-65, 45].map((x) => (
      <g key={x} transform={`translate(${x + 10}, -70)`}>
        <ellipse rx="12" ry="10" fill="url(#emperor-gold)" />
        <path
          d={`M-8 -5 Q-15 -15 -10 -20 M8 -5 Q15 -15 10 -20`}
          stroke="#9a7d0a"
          strokeWidth="2"
          fill="none"
        />
      </g>
    ))}
    {/* Crown */}
    <g transform="translate(0, -85)">
      <path
        d="M-25 15 L-25 0 L-15 -15 L0 5 L15 -15 L25 0 L25 15 Z"
        fill="url(#emperor-gold)"
        stroke="#9a7d0a"
        strokeWidth="1"
      />
      <circle cx="0" cy="-5" r="5" fill="#c0392b" />
    </g>
    {/* Ankh Scepter */}
    <g transform="translate(35, -20) rotate(15)">
      <ellipse
        cx="0"
        cy="-25"
        rx="10"
        ry="12"
        fill="none"
        stroke="url(#emperor-gold)"
        strokeWidth="4"
      />
      <line x1="0" y1="-13" x2="0" y2="40" stroke="url(#emperor-gold)" strokeWidth="4" />
      <line x1="-12" y1="5" x2="12" y2="5" stroke="url(#emperor-gold)" strokeWidth="4" />
    </g>
    {/* Red Orb */}
    <circle cx="-35" cy="-10" r="15" fill="url(#emperor-velvet)" stroke="#9a7d0a" strokeWidth="1" />
  </CardFrame>
);

// ============================================
// THE WHEEL (Spirit, #10)
// ============================================
export const TheWheel = () => (
  <CardFrame id="wheel" element="spirit" number="X" title="THE WHEEL">
    {/* Outer Wheel */}
    <circle cx="0" cy="0" r="80" fill="none" stroke="url(#wheel-gold)" strokeWidth="6" />
    <circle cx="0" cy="0" r="70" fill="none" stroke="#2c3e50" strokeWidth="2" />
    {/* 8 Spokes */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <line
        key={angle}
        x1="0"
        y1="0"
        x2={Math.cos((angle * Math.PI) / 180) * 68}
        y2={Math.sin((angle * Math.PI) / 180) * 68}
        stroke="url(#wheel-gold)"
        strokeWidth="3"
      />
    ))}
    {/* Center Hub */}
    <circle
      cx="0"
      cy="0"
      r="15"
      fill="url(#wheel-velvet)"
      stroke="url(#wheel-gold)"
      strokeWidth="2"
    />
    {/* Hebrew Letters YHVH around rim */}
    {['Y', 'H', 'V', 'H'].map((letter, i) => {
      const angle = (i * 90 - 90) * (Math.PI / 180);
      return (
        <text
          key={i}
          x={Math.cos(angle) * 58}
          y={Math.sin(angle) * 58 + 5}
          fontFamily="Times, serif"
          fontSize="16"
          fill="#2c3e50"
          textAnchor="middle"
        >
          {letter}
        </text>
      );
    })}
    {/* Alchemical symbols */}
    <g fontFamily="Times, serif" fontSize="12" fill="url(#wheel-gold)">
      <text x="0" y="-48" textAnchor="middle">
        &#9737;
      </text>
      <text x="48" y="4" textAnchor="middle">
        &#9791;
      </text>
      <text x="0" y="52" textAnchor="middle">
        &#9792;
      </text>
      <text x="-48" y="4" textAnchor="middle">
        &#9793;
      </text>
    </g>
    {/* Four Living Creatures in corners (simplified) */}
    <g fontSize="20" fill="#2c3e50" opacity="0.5">
      <text x="-60" y="-95" textAnchor="middle">
        &#9734;
      </text>
      <text x="60" y="-95" textAnchor="middle">
        &#9734;
      </text>
      <text x="-60" y="115" textAnchor="middle">
        &#9734;
      </text>
      <text x="60" y="115" textAnchor="middle">
        &#9734;
      </text>
    </g>
  </CardFrame>
);

// ============================================
// THE HANGED MAN (Water, #12)
// ============================================
export const TheHangedMan = () => (
  <CardFrame id="hanged" element="water" number="XII" title="THE HANGED MAN">
    {/* Living Wood T-Cross */}
    <rect x="-60" y="-90" width="120" height="15" fill="#8b4513" rx="3" />
    <rect x="-7" y="-90" width="14" height="140" fill="#8b4513" rx="3" />
    {/* Leaves sprouting */}
    {[-50, -30, 30, 50].map((x) => (
      <ellipse
        key={x}
        cx={x}
        cy={-100}
        rx="6"
        ry="10"
        fill="#27ae60"
        transform={`rotate(${x > 0 ? 15 : -15} ${x} -100)`}
      />
    ))}
    {[-5, 5].map((x, i) => (
      <ellipse
        key={x}
        cx={x}
        cy={60}
        rx="5"
        ry="8"
        fill="#27ae60"
        transform={`rotate(${i === 0 ? -20 : 20} ${x} 60)`}
      />
    ))}
    {/* Suspended Figure (geometric abstraction) */}
    <g transform="translate(0, 10)">
      {/* Rope */}
      <line x1="0" y1="-100" x2="0" y2="-60" stroke="#d4a574" strokeWidth="3" />
      {/* Crossed Leg (4 shape) */}
      <line
        x1="0"
        y1="-60"
        x2="-20"
        y2="-20"
        stroke="url(#hanged-elem)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line
        x1="-20"
        y1="-20"
        x2="10"
        y2="-30"
        stroke="url(#hanged-elem)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* Body */}
      <line
        x1="0"
        y1="-60"
        x2="0"
        y2="0"
        stroke="url(#hanged-velvet)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Arms spread */}
      <line
        x1="0"
        y1="-10"
        x2="-30"
        y2="20"
        stroke="url(#hanged-velvet)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="0"
        y1="-10"
        x2="30"
        y2="20"
        stroke="url(#hanged-velvet)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Head with halo */}
      <circle
        cx="0"
        cy="30"
        r="20"
        fill="url(#hanged-porcelain)"
        stroke="#2c3e50"
        strokeWidth="1"
      />
      <circle
        cx="0"
        cy="30"
        r="28"
        fill="none"
        stroke="#f1c40f"
        strokeWidth="3"
        filter="url(#hanged-glow)"
      />
    </g>
  </CardFrame>
);

// ============================================
// DEATH (Earth, #13)
// ============================================
export const Death = () => (
  <CardFrame id="death" element="earth" number="XIII" title="DEATH">
    {/* Dark background atmosphere */}
    <ellipse cx="0" cy="0" rx="90" ry="70" fill="#2c3e50" opacity="0.2" />
    {/* Scythe arc */}
    <path d="M-70 -80 Q0 -120 70 -80" fill="none" stroke="#7f8c8d" strokeWidth="4" />
    <path d="M70 -80 Q90 -70 80 -50 L60 -75" fill="#c0c0c0" stroke="#7f8c8d" strokeWidth="1" />
    {/* Skull */}
    <g transform="translate(0, 10)">
      {/* Cranium */}
      <ellipse cx="0" cy="-30" rx="40" ry="35" fill="url(#death-porcelain)" />
      {/* Jaw */}
      <path d="M-30 -5 Q-35 20 -20 25 L20 25 Q35 20 30 -5" fill="url(#death-porcelain)" />
      {/* Eye sockets */}
      <ellipse cx="-15" cy="-30" rx="12" ry="14" fill="#2c3e50" />
      <ellipse cx="15" cy="-30" rx="12" ry="14" fill="#2c3e50" />
      {/* Nasal cavity */}
      <path d="M0 -15 L-8 5 L8 5 Z" fill="#2c3e50" />
      {/* Teeth */}
      <line x1="-15" y1="20" x2="-15" y2="25" stroke="#bdc3c7" strokeWidth="3" />
      <line x1="-5" y1="20" x2="-5" y2="25" stroke="#bdc3c7" strokeWidth="3" />
      <line x1="5" y1="20" x2="5" y2="25" stroke="#bdc3c7" strokeWidth="3" />
      <line x1="15" y1="20" x2="15" y2="25" stroke="#bdc3c7" strokeWidth="3" />
    </g>
    {/* White Rose growing from skull */}
    <g transform="translate(0, -55)">
      {/* Stem */}
      <path d="M0 40 Q-5 20 0 0" fill="none" stroke="#27ae60" strokeWidth="3" />
      {/* Leaves */}
      <ellipse cx="-10" cy="25" rx="8" ry="4" fill="#27ae60" transform="rotate(-30 -10 25)" />
      <ellipse cx="8" cy="30" rx="7" ry="3" fill="#27ae60" transform="rotate(25 8 30)" />
      {/* Petals */}
      <ellipse cy="-8" rx="10" ry="15" fill="#fff" stroke="#e0e0e0" strokeWidth="0.5" />
      <ellipse cx="-8" cy="-3" rx="8" ry="12" fill="#fff" stroke="#e0e0e0" strokeWidth="0.5" />
      <ellipse cx="8" cy="-3" rx="8" ry="12" fill="#fff" stroke="#e0e0e0" strokeWidth="0.5" />
      <ellipse cx="-12" cy="5" rx="7" ry="10" fill="#fff" stroke="#e0e0e0" strokeWidth="0.5" />
      <ellipse cx="12" cy="5" rx="7" ry="10" fill="#fff" stroke="#e0e0e0" strokeWidth="0.5" />
      <circle cy="5" r="6" fill="#f1c40f" />
    </g>
  </CardFrame>
);

// ============================================
// TEMPERANCE (Air, #14)
// ============================================
export const Temperance = () => (
  <CardFrame id="temperance" element="air" number="XIV" title="TEMPERANCE">
    {/* Dawn sky gradient effect */}
    <ellipse cx="0" cy="-40" rx="80" ry="60" fill="url(#temperance-velvet)" opacity="0.2" />
    {/* Angel Wings */}
    <g opacity="0.6">
      <path
        d="M-30 0 Q-80 -30 -90 -80 Q-70 -60 -50 -40 Q-60 -70 -70 -90 Q-50 -60 -30 -30"
        fill="url(#temperance-elem)"
      />
      <path
        d="M30 0 Q80 -30 90 -80 Q70 -60 50 -40 Q60 -70 70 -90 Q50 -60 30 -30"
        fill="url(#temperance-elem)"
      />
    </g>
    {/* Left Cup */}
    <g transform="translate(-40, 0)">
      <path
        d="M-15 -20 L-12 20 Q0 25 12 20 L15 -20 Z"
        fill="url(#temperance-gold)"
        stroke="#9a7d0a"
        strokeWidth="1"
      />
      <ellipse cy="-20" rx="15" ry="5" fill="url(#temperance-gold)" />
    </g>
    {/* Right Cup */}
    <g transform="translate(40, -30)">
      <path
        d="M-15 -20 L-12 20 Q0 25 12 20 L15 -20 Z"
        fill="url(#temperance-gold)"
        stroke="#9a7d0a"
        strokeWidth="1"
      />
      <ellipse cy="-20" rx="15" ry="5" fill="url(#temperance-gold)" />
    </g>
    {/* Water flowing between cups (defying gravity) */}
    <path
      d="M-28 -5 Q0 -40 28 -35"
      fill="none"
      stroke="#3498db"
      strokeWidth="6"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M-26 0 Q0 -35 26 -30"
      fill="none"
      stroke="#5dade2"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Iris flower at bottom */}
    <g transform="translate(0, 70)">
      <path d="M0 30 L0 0" stroke="#27ae60" strokeWidth="3" />
      <ellipse cx="-8" cy="15" rx="5" ry="10" fill="#27ae60" transform="rotate(-20 -8 15)" />
      <path d="M0 0 Q-15 -20 0 -25 Q15 -20 0 0" fill="#8e44ad" />
      <path d="M0 0 Q-20 -10 -15 -30 Q0 -20 0 0" fill="#9b59b6" />
      <path d="M0 0 Q20 -10 15 -30 Q0 -20 0 0" fill="#9b59b6" />
    </g>
  </CardFrame>
);

// ============================================
// THE MOON (Water, #18)
// ============================================
export const TheMoon = () => (
  <CardFrame id="moon" element="water" number="XVIII" title="THE MOON">
    {/* Night sky */}
    <rect x="-90" y="-110" width="180" height="150" fill="#1a252f" opacity="0.3" />
    {/* Moon with face */}
    <g transform="translate(0, -70)">
      <circle r="40" fill="#f5f5dc" />
      <circle r="35" fill="#1a252f" cx="15" />
      {/* Face profile on crescent */}
      <ellipse cx="-10" cy="-8" rx="4" ry="3" fill="#bdc3c7" />
      <path d="M-8 0 Q-5 2 -8 5" fill="none" stroke="#bdc3c7" strokeWidth="2" />
      <ellipse cx="-5" cy="10" rx="6" ry="3" fill="#bdc3c7" />
    </g>
    {/* Two Towers */}
    <rect x="-75" y="0" width="25" height="60" fill="#7f8c8d" stroke="#2c3e50" strokeWidth="1" />
    <path d="M-75 0 L-62 -15 L-50 0" fill="#7f8c8d" stroke="#2c3e50" strokeWidth="1" />
    <rect x="50" y="0" width="25" height="60" fill="#7f8c8d" stroke="#2c3e50" strokeWidth="1" />
    <path d="M50 0 L62 -15 L75 0" fill="#7f8c8d" stroke="#2c3e50" strokeWidth="1" />
    {/* Windows */}
    <rect x="-67" y="20" width="10" height="15" fill="#2c3e50" />
    <rect x="57" y="20" width="10" height="15" fill="#2c3e50" />
    {/* Water/Pool */}
    <ellipse cx="0" cy="80" rx="70" ry="25" fill="url(#moon-velvet)" opacity="0.5" />
    {/* Moon path ripple */}
    <ellipse
      cx="0"
      cy="80"
      rx="30"
      ry="10"
      fill="none"
      stroke="#f5f5dc"
      strokeWidth="1"
      opacity="0.5"
    />
    <ellipse
      cx="0"
      cy="80"
      rx="50"
      ry="15"
      fill="none"
      stroke="#f5f5dc"
      strokeWidth="0.5"
      opacity="0.3"
    />
    {/* Crayfish/Crab */}
    <g transform="translate(0, 75)">
      <ellipse rx="15" ry="10" fill="#c0392b" />
      <path
        d="M-15 0 Q-25 -10 -30 -5 M-15 0 Q-25 10 -30 5"
        stroke="#c0392b"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M15 0 Q25 -10 30 -5 M15 0 Q25 10 30 5"
        stroke="#c0392b"
        strokeWidth="3"
        fill="none"
      />
      <circle cx="-5" cy="-3" r="2" fill="#2c3e50" />
      <circle cx="5" cy="-3" r="2" fill="#2c3e50" />
    </g>
  </CardFrame>
);

// ============================================
// THE STAR (Air, #17)
// ============================================
export const TheStar = () => (
  <CardFrame id="star" element="air" number="XVII" title="THE STAR">
    {/* Dark sky */}
    <rect x="-90" y="-120" width="180" height="160" fill="#1a252f" opacity="0.2" />
    {/* Central 8-pointed star */}
    <g transform="translate(0, -60)" filter="url(#star-glow)">
      <polygon
        points="0,-45 8,-15 40,-15 15,5 25,40 0,20 -25,40 -15,5 -40,-15 -8,-15"
        fill="url(#star-gold)"
      />
    </g>
    {/* 7 smaller stars */}
    {[
      [-50, -80],
      [50, -80],
      [-65, -40],
      [65, -40],
      [-40, 0],
      [40, 0],
      [0, -100],
    ].map(([x, y], i) => (
      <polygon
        key={i}
        transform={`translate(${x}, ${y}) scale(0.3)`}
        points="0,-20 5,-5 20,-5 8,5 12,20 0,12 -12,20 -8,5 -20,-5 -5,-5"
        fill="#f1c40f"
        opacity="0.8"
      />
    ))}
    {/* Water/Pool at bottom */}
    <ellipse cx="0" cy="70" rx="60" ry="20" fill="url(#star-velvet)" opacity="0.4" />
    {/* Ibis bird on branch */}
    <g transform="translate(50, 40)">
      <line x1="-20" y1="20" x2="20" y2="15" stroke="#8b4513" strokeWidth="3" />
      <ellipse cx="-5" cy="10" rx="12" ry="8" fill="#fff" stroke="#bdc3c7" strokeWidth="0.5" />
      <ellipse cx="-15" cy="5" rx="6" ry="5" fill="#fff" />
      <path d="M-20 5 L-30 8" stroke="#f39c12" strokeWidth="2" />
      <circle cx="-17" cy="3" r="1.5" fill="#2c3e50" />
    </g>
    {/* Water pouring */}
    <g transform="translate(-40, 50)" opacity="0.7">
      <path d="M0 0 Q5 20 0 40" stroke="#3498db" strokeWidth="4" fill="none" />
      <path d="M5 0 Q10 20 5 40" stroke="#5dade2" strokeWidth="2" fill="none" />
    </g>
  </CardFrame>
);

// ============================================
// EXPORTS MAP
// ============================================
export const TarotIllustrations: Record<string, React.FC> = {
  'The Fool': TheFool,
  'The Builder': TheBuilder,
  'The High Priestess': HighPriestess,
  'High Priestess': HighPriestess,
  'The Emperor': TheEmperor,
  'The Wheel': TheWheel,
  'Wheel of Fortune': TheWheel,
  'The Hanged Man': TheHangedMan,
  Death: Death,
  Temperance: Temperance,
  'The Star': TheStar,
  'The Moon': TheMoon,
};

export default TarotIllustrations;
