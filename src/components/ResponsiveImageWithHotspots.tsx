'use client';

import { ReactNode } from 'react';

interface Hotspot {
  id: string;
  x: number;
  y: number;
  name: string;
}

interface GridOverlay {
  id: string;
  x: number; // top-left x coordinate in pixels
  y: number; // top-left y coordinate in pixels
  width: number; // width in pixels
  height: number; // height in pixels
  type: 'safe' | 'delete';
  images: string[];
  onClick: () => void;
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
  hotspotSize?: 'normal' | 'small' | 'large';
  pulseRadius?: number;
  dotRadius?: number;
  clickableRadius?: number;
  arrowOffset?: number;
  arrowSize?: number;
  fillContainer?: boolean;
  gridOverlays?: GridOverlay[];
}

export default function ResponsiveImageWithHotspots({
  src,
  alt,
  width,
  height,
  hotspots,
  onHotspotClick,
  showArrow = true,
  hotspotSize,
  pulseRadius,
  dotRadius,
  clickableRadius,
  arrowOffset,
  arrowSize,
  fillContainer = false,
  gridOverlays = [],
}: ResponsiveImageWithHotspotsProps) {
  // Calculate sizes based on hotspotSize prop or individual props
  let pulseR, dotR, clickR, arrowOff, arrowS;
  
  if (hotspotSize === 'small') {
    pulseR = 10;
    dotR = 5;
    clickR = 25;
    arrowOff = 25;
    arrowS = 8;
  } else if (hotspotSize === 'large') {
    pulseR = 20;
    dotR = 10;
    clickR = 50;
    arrowOff = 50;
    arrowS = 15;
  } else {
    // normal (default)
    pulseR = 16;
    dotR = 8;
    clickR = 40;
    arrowOff = 40;
    arrowS = 12;
  }
  
  // Override with individual props if provided
  pulseR = pulseRadius ?? pulseR;
  dotR = dotRadius ?? dotR;
  clickR = clickableRadius ?? clickR;
  arrowOff = arrowOffset ?? arrowOff;
  arrowS = arrowSize ?? arrowS;
  const containerStyle = fillContainer 
    ? { width: '100%', height: '100%', position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0 }
    : { width: '100%', height: 'auto', position: 'relative' as const };
  
  const svgStyle = fillContainer
    ? { width: '100%', height: '100%', display: 'block' }
    : { width: '100%', height: 'auto', display: 'block' };
  
  const preserveAspect = fillContainer ? 'xMidYMid slice' : 'xMidYMid meet';

  return (
    <div style={containerStyle}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={svgStyle}
        preserveAspectRatio={preserveAspect}
      >
        {/* Background image */}
        <image href={src} width={width} height={height} pointerEvents="none" />
        
        {/* Hotspots */}
        {hotspots.map((hotspot) => (
          <g key={hotspot.id}>
            {/* Pulse circle */}
            <circle cx={hotspot.x} cy={hotspot.y} r={pulseR} fill="rgba(0, 255, 0, 0.3)">
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
              r={dotR}
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
                points={`${hotspot.x + arrowOff},${hotspot.y - arrowS} ${hotspot.x + arrowOff * 0.5},${hotspot.y} ${hotspot.x + arrowOff},${hotspot.y + arrowS}`}
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
                r={clickR}
                fill="transparent"
                cursor="pointer"
              />
            </a>
          </g>
        ))}
        
        {/* Grid Overlays */}
        {gridOverlays.map((grid) => {
          const gridColor = grid.type === 'safe' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)';
          const borderColor = grid.type === 'safe' ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)';
          const slotsPerRow = 3;
          const slotWidth = grid.width / slotsPerRow;
          const slotHeight = grid.height / 2;
          
          return (
            <g key={grid.id}>
              {/* Grid background */}
              <rect
                x={grid.x}
                y={grid.y}
                width={grid.width}
                height={grid.height}
                fill={gridColor}
                stroke={borderColor}
                strokeWidth="4"
                strokeDasharray="10,5"
                rx="12"
                style={{ cursor: 'pointer' }}
                onClick={grid.onClick}
              />
              {/* Grid label */}
              <text
                x={grid.x}
                y={grid.y - 10}
                fill={grid.type === 'safe' ? '#00ff00' : '#ff4444'}
                fontSize="18"
                fontWeight="600"
                style={{ pointerEvents: 'none' }}
              >
                {grid.type === 'safe' ? 'Safe Upload' : 'Delete'} ({grid.images.length}/6)
              </text>
              {/* Grid slots */}
              {Array.from({ length: 6 }, (_, i) => {
                const row = Math.floor(i / slotsPerRow);
                const col = i % slotsPerRow;
                const slotX = grid.x + (col * slotWidth) + 10;
                const slotY = grid.y + (row * slotHeight) + 10;
                const imageUrl = grid.images[i] || null;
                
                return (
                  <g key={i}>
                    <rect
                      x={slotX}
                      y={slotY}
                      width={slotWidth - 20}
                      height={slotHeight - 20}
                      fill={imageUrl ? 'transparent' : 'rgba(255, 255, 255, 0.1)'}
                      stroke={borderColor}
                      strokeWidth="2"
                      strokeDasharray={imageUrl ? '0' : '5,5'}
                      rx="8"
                    />
                    {imageUrl && (
                      <image
                        href={imageUrl}
                        x={slotX}
                        y={slotY}
                        width={slotWidth - 20}
                        height={slotHeight - 20}
                        preserveAspectRatio="xMidYMid slice"
                        style={{ cursor: 'pointer' }}
                        onClick={grid.onClick}
                      />
                    )}
                    {!imageUrl && (
                      <text
                        x={slotX + (slotWidth - 20) / 2}
                        y={slotY + (slotHeight - 20) / 2}
                        fill={borderColor}
                        fontSize="32"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        opacity="0.5"
                        style={{ pointerEvents: 'none' }}
                      >
                        +
                      </text>
                    )}
                    {/* Clickable area for entire slot */}
                    <rect
                      x={slotX}
                      y={slotY}
                      width={slotWidth - 20}
                      height={slotHeight - 20}
                      fill="transparent"
                      style={{ cursor: 'pointer' }}
                      onClick={grid.onClick}
                    />
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

