'use client';

import { useState } from 'react';
import ResponsiveImageWithHotspots from '@/components/ResponsiveImageWithHotspots';
import Task3Sidebar from '@/components/Task3Sidebar';
import ImageCarousel from '@/components/ImageCarousel';
import ImageGridOverlay from '@/components/ImageGridOverlay';

interface Hotspot {
  id: string;
  name: string;
  x: number; // pixels
  y: number; // pixels
}

const hotspots: Hotspot[] = [
  // Add hotspots here when needed
];

const IMAGE_WIDTH = 1920;
const IMAGE_HEIGHT = 1080;

// Grid positions in SVG coordinates (pixels)
const DELETE_GRID_X = 173; // 9% of 1920 ≈ 173
const DELETE_GRID_Y = 680; // 63% of 1080 ≈ 680
const SAFE_GRID_X = 1152; // 60% of 1920 ≈ 1152
const SAFE_GRID_Y = 680; // 63% of 1080 ≈ 680
const GRID_WIDTH = 672; // 35% of 1920 ≈ 672
const GRID_HEIGHT = 378; // 35% of 1080 ≈ 378

// Placeholder images - replace with actual image paths
const availableImages: string[] = [
  '/placeholder1.png',
  '/placeholder2.png',
  '/placeholder3.png',
  // Add more image paths here
];

export default function Task3() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentGridType, setCurrentGridType] = useState<'safe' | 'delete' | null>(null);
  const [safeImages, setSafeImages] = useState<string[]>([]);
  const [deleteImages, setDeleteImages] = useState<string[]>([]);

  const handleHotspotClick = (id: string) => {
    setActiveId(id);
  };

  const handleStart = () => {
    setHasStarted(true);
    setShowCarousel(true);
    // Default to safe upload grid when starting
    setCurrentGridType('safe');
  };

  const handleGridClick = (gridType: 'safe' | 'delete') => {
    if (!hasStarted) return;
    setCurrentGridType(gridType);
    setShowCarousel(true);
  };

  const handleSelectImage = (imageUrl: string, gridType: 'safe' | 'delete') => {
    if (gridType === 'safe') {
      if (safeImages.length < 6) {
        setSafeImages([...safeImages, imageUrl]);
      }
    } else {
      if (deleteImages.length < 6) {
        setDeleteImages([...deleteImages, imageUrl]);
      }
    }
  };

  const phoneImageUrl = '/Phone/PhonePhoto.png';

  // Create grid overlay data for SVG
  const gridOverlays = hasStarted ? [
    {
      id: 'delete-grid',
      x: DELETE_GRID_X,
      y: DELETE_GRID_Y,
      width: GRID_WIDTH,
      height: GRID_HEIGHT,
      type: 'delete' as const,
      images: deleteImages,
      onClick: () => handleGridClick('delete'),
    },
    {
      id: 'safe-grid',
      x: SAFE_GRID_X,
      y: SAFE_GRID_Y,
      width: GRID_WIDTH,
      height: GRID_HEIGHT,
      type: 'safe' as const,
      images: safeImages,
      onClick: () => handleGridClick('safe'),
    },
  ] : [];

  return (
    <main className="main-container">
      <div className="game-area">
        <div className="background-container" style={{ position: 'relative', height: '100%', minHeight: 'calc(100vh - 2rem)' }}>
          <ResponsiveImageWithHotspots
            src={phoneImageUrl}
            alt="Phone Photo"
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            hotspots={hotspots}
            onHotspotClick={handleHotspotClick}
            fillContainer={true}
            gridOverlays={gridOverlays}
          />
        </div>

        <div className="sidebar">
          <Task3Sidebar onStart={handleStart} hasStarted={hasStarted} />
        </div>
      </div>

      {/* Image Carousel Modal */}
      <ImageCarousel
        images={availableImages}
        isOpen={showCarousel}
        onClose={() => setShowCarousel(false)}
        onSelectImage={handleSelectImage}
        currentGridType={currentGridType}
      />
    </main>
  );
}

