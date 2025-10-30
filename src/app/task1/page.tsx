'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Clue } from '@/lib/clueUtils';
import Modal from '@/components/Modal';
import ClueTray from '@/components/ClueTray';
import CalendarPanel from '@/components/CalendarPanel';

interface Hotspot {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
}

const hotspots: Hotspot[] = [
  { id: 'calendar', name: 'Calendar', x: 33, y: 79 },
];

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
          <Image
            src={officeImageUrl}
            alt="Office background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          {hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              className="hotspot"
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => handleHotspotClick(hotspot.id)}
              aria-label={`Hotspot: ${hotspot.name}`}
            >
              <span className="hotspot-pulse" />
              <span className="hotspot-dot" />
              <span className="hotspot-arrow" />
            </button>
          ))}
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

