'use client';

import { ReactNode } from 'react';

interface Hotspot {
  id: string;
  x: number;
  y: number;
  name: string;
}

interface ResponsiveImageWithHotspotsProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  hotspots: Hotspot[];
  onHotspotClick: (id: string) => void;
  children?: ReactNode;
  showArrow?: boolean;
}

export default function ResponsiveImageWithHotspots({
  src,
  alt,
  width,
  height,
  hotspots,
  onHotspotClick,
  showArrow = true,
}: ResponsiveImageWithHotspotsProps) {
  return (
    <div style={{ width: '100%', height: 'auto', position: 'relative' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background image */}
        <image href={src} width={width} height={height} pointerEvents="none" />
        
        {/* Hotspots */}
        {hotspots.map((hotspot) => (
          <g key={hotspot.id}>
            {/* Pulse circle */}
            <circle cx={hotspot.x} cy={hotspot.y} r="16" fill="rgba(0, 255, 0, 0.3)">
              <animate
                attributeName="opacity"
                values="0.3;0;0.3"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Green dot */}
            <circle
              cx={hotspot.x}
              cy={hotspot.y}
              r="8"
              fill="#00ff00"
              stroke="white"
              strokeWidth="2"
            >
              <animate
                attributeName="opacity"
                values="1;0;1"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Arrow pointing right */}
            {showArrow && (
              <polygon
                points={`${hotspot.x + 40},${hotspot.y - 12} ${hotspot.x + 20},${hotspot.y} ${hotspot.x + 40},${hotspot.y + 12}`}
                fill="#00ff00"
              >
                <animate
                  attributeName="opacity"
                  values="1;0;1"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </polygon>
            )}
            {/* Clickable area */}
            <a
              onClick={(e) => {
                e.preventDefault();
                onHotspotClick(hotspot.id);
              }}
            >
              <circle
                cx={hotspot.x}
                cy={hotspot.y}
                r="40"
                fill="transparent"
                cursor="pointer"
              />
            </a>
          </g>
        ))}
      </svg>
    </div>
  );
}

