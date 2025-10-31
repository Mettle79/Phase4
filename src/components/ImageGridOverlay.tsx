'use client';

import Image from 'next/image';

interface ImageGridOverlayProps {
  gridType: 'safe' | 'delete';
  images: string[];
  onGridClick: () => void;
}

export default function ImageGridOverlay({ gridType, images, onGridClick }: ImageGridOverlayProps) {
  const gridColor = gridType === 'safe' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)';
  const borderColor = gridType === 'safe' ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)';
  const labelColor = gridType === 'safe' ? '#00ff00' : '#ff4444';

  // Create a 2x3 grid (6 slots total)
  const slots = Array.from({ length: 6 }, (_, i) => images[i] || null);

  return (
    <div
      onClick={onGridClick}
      style={{
        position: 'absolute',
        top: gridType === 'safe' ? '63%' : '63%',
        left: gridType === 'safe' ? '60%' : '9%',
        width: '35%',
        height: '35%',
        background: gridColor,
        border: `2px dashed ${borderColor}`,
        borderRadius: '12px',
        padding: '1rem',
        cursor: 'pointer',
        backdropFilter: 'blur(5px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '0.5rem',
        transition: 'all 0.3s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = `3px solid ${borderColor}`;
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.background = gridType === 'safe' ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = `2px dashed ${borderColor}`;
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.background = gridColor;
      }}
    >
      {/* Grid Label */}
      <div style={{
        position: 'absolute',
        top: '-1.5rem',
        left: '0',
        fontSize: '0.9rem',
        fontWeight: '600',
        color: labelColor,
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '0.25rem 0.75rem',
        borderRadius: '6px'
      }}>
        {gridType === 'safe' ? 'Safe Upload' : 'Delete'} ({images.length}/6)
      </div>

      {/* Grid Slots */}
      {slots.map((imageUrl, index) => (
        <div
          key={index}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: imageUrl ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
            border: imageUrl ? 'none' : `1px dashed ${borderColor}`,
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${gridType} image ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <span style={{
              fontSize: '2rem',
              color: borderColor,
              opacity: 0.5
            }}>
              +
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

