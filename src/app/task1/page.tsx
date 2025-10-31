'use client';

import { useState, useEffect, useRef } from 'react';
import { Clue } from '@/lib/clueUtils';
import Modal from '@/components/Modal';
import ClueTray from '@/components/ClueTray';
import CalendarPanel from '@/components/CalendarPanel';
import EmailTracker from '@/components/EmailTracker';
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

interface EmailResult {
  emailId: string;
  completed: boolean;
  isCorrect: boolean;
}

const STORAGE_KEY = 'task1_email_results';

// Helper function to load email results from localStorage
function loadEmailResultsFromStorage(): Map<string, boolean> {
  if (typeof window === 'undefined') {
    return new Map();
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const resultsMap = new Map<string, boolean>();
      Object.entries(parsed).forEach(([key, value]) => {
        resultsMap.set(key, value as boolean);
      });
      return resultsMap;
    }
  } catch (error) {
    console.error('Error loading email results from localStorage:', error);
  }
  
  return new Map();
}

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [clues, setClues] = useState<Clue[]>([]);
  const [foundHotspots, setFoundHotspots] = useState<Set<string>>(new Set());
  // Initialize with localStorage data directly
  const [emailResults, setEmailResults] = useState<Map<string, boolean>>(() => loadEmailResultsFromStorage());
  const hasLoadedFromStorage = useRef(true); // Start as true since we initialize from storage

  // Save email results to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && hasLoadedFromStorage.current) {
      try {
        const resultsObj = Object.fromEntries(emailResults);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resultsObj));
      } catch (error) {
        console.error('Error saving email results to localStorage:', error);
      }
    }
  }, [emailResults]);

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

  const handleEmailCompleted = (emailId: string, isCorrect: boolean) => {
    setEmailResults((prev) => {
      const next = new Map(prev);
      next.set(emailId, isCorrect);
      return next;
    });
  };

  const getActiveHotspotContent = () => {
    if (!activeId) return null;

    const found = foundHotspots.has(activeId);
    const completedEmails = new Set(Array.from(emailResults.keys()));

    return (
      <CalendarPanel 
        onFound={handleClueFound} 
        found={found}
        completedEmails={completedEmails}
        emailResults={emailResults}
        onEmailCompleted={handleEmailCompleted}
      />
    );
  };

  // Convert emailResults Map to EmailResult array for tracker
  const emailResultsArray: EmailResult[] = ['email1', 'email2', 'email3'].map(emailId => ({
    emailId,
    completed: emailResults.has(emailId),
    isCorrect: emailResults.get(emailId) || false,
  }));

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
          <EmailTracker emailResults={emailResultsArray} />
          <ClueTray clues={clues} onRemoveClue={handleRemoveClue} />
        </div>
      </div>

      <Modal isOpen={activeId !== null} onClose={handleCloseModal}>
        {getActiveHotspotContent()}
      </Modal>
    </main>
  );
}

