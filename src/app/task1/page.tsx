'use client';

import { useState } from 'react';
import { Clue } from '@/lib/clueUtils';
import Modal from '@/components/Modal';
import ClueTray from '@/components/ClueTray';
import CalendarPanel from '@/components/CalendarPanel';
import ResponsiveImageWithHotspots from '@/components/ResponsiveImageWithHotspots';

interface Hotspot {
  id: string;
  name: string;
  x: number; // pixels
  y: number; // pixels
}

const hotspots: Hotspot[] = [
  { id: 'calendar', name: 'Calendar', x: 633, y: 853 }, // 33% of 1920 = 633, 79% of 1080 = 853
];

const IMAGE_WIDTH = 1920;
const IMAGE_HEIGHT = 1080;

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [clues, setClues] = useState<Clue[]>([]);
  const [foundHotspots, setFoundHotspots] = useState<Set<string>>(new Set());

  const handleHotspotClick = (id: string) => {
    setActiveId(id);
  };

  const handleCloseModal = () => {
    setActiveId(null);
  };

  const handleClueFound = (clue: Clue) => {
    setClues((prev) => {
      // Check for duplicates
      const exists = prev.some((c) => c.id === clue.id);
      if (exists) return prev;
      return [...prev, clue];
    });
    setFoundHotspots((prev) => new Set(prev).add(clue.id));
  };

  const handleRemoveClue = (id: string) => {
    setClues((prev) => prev.filter((c) => c.id !== id));
    setFoundHotspots((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const getActiveHotspotContent = () => {
    if (!activeId) return null;

    const found = foundHotspots.has(activeId);

    return <CalendarPanel onFound={handleClueFound} found={found} />;
  };

  // Use a placeholder office image
  const officeImageUrl = '/ComputerScreen.png';

  return (
    <main className="main-container">
      <div className="game-area">
        <div className="background-container">
          <ResponsiveImageWithHotspots
            src={officeImageUrl}
            alt="Office background"
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            hotspots={hotspots}
            onHotspotClick={handleHotspotClick}
          />
        </div>

        <div className="sidebar">
          <ClueTray clues={clues} onRemoveClue={handleRemoveClue} />
        </div>
      </div>

      <Modal isOpen={activeId !== null} onClose={handleCloseModal}>
        {getActiveHotspotContent()}
      </Modal>
    </main>
  );
}

