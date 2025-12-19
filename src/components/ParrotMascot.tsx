'use client';

interface ParrotMascotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function ParrotMascot({ className = '', size = 'lg' }: ParrotMascotProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  return (
    <div className={`parrot-float ${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="100" cy="120" rx="45" ry="55" fill="#14b8a6" />

        {/* Belly */}
        <ellipse cx="100" cy="130" rx="30" ry="40" fill="#5eead4" />

        {/* Head */}
        <circle cx="100" cy="60" r="35" fill="#14b8a6" />

        {/* Face/cheek */}
        <circle cx="100" cy="65" r="25" fill="#5eead4" />

        {/* Beak */}
        <path d="M85 60 Q75 65 80 75 Q85 80 95 70 Z" fill="#f59e0b" />
        <path d="M85 60 Q90 55 95 60 L95 70 Q90 65 85 60 Z" fill="#fbbf24" />

        {/* Eyes */}
        <circle cx="110" cy="50" r="8" fill="white" />
        <circle cx="112" cy="48" r="4" fill="#1a1a1a" />
        <circle cx="114" cy="46" r="1.5" fill="white" />

        {/* Eye sparkle */}
        <circle cx="108" cy="52" r="1" fill="white" opacity="0.6" />

        {/* Crest/head feathers */}
        <path d="M75 35 Q80 15 95 25 Q85 20 75 35" fill="#0d9488" />
        <path d="M85 30 Q95 10 110 20 Q100 15 85 30" fill="#14b8a6" />
        <path d="M100 28 Q115 8 125 25 Q115 18 100 28" fill="#0d9488" />

        {/* Wing */}
        <ellipse cx="135" cy="110" rx="20" ry="35" fill="#0d9488" transform="rotate(15 135 110)" />
        <ellipse cx="138" cy="115" rx="12" ry="25" fill="#14b8a6" transform="rotate(15 138 115)" />

        {/* Tail feathers */}
        <path d="M80 170 Q70 200 75 210 Q80 195 90 175" fill="#0d9488" />
        <path d="M95 172 Q90 205 100 215 Q100 200 105 178" fill="#14b8a6" />
        <path d="M110 172 Q115 205 125 210 Q118 195 115 175" fill="#0d9488" />

        {/* Feet */}
        <path
          d="M85 175 L80 190 L75 185 M80 190 L80 195 M80 190 L85 185"
          stroke="#f59e0b"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M115 175 L120 190 L125 185 M120 190 L120 195 M120 190 L115 185"
          stroke="#f59e0b"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Blush */}
        <circle cx="120" cy="65" r="6" fill="#fb7185" opacity="0.4" />
      </svg>
    </div>
  );
}
