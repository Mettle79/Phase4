'use client';

import { X } from 'lucide-react';
import { Clue } from '@/lib/clueUtils';

interface ClueTrayProps {
  clues: Clue[];
  onRemoveClue: (id: string) => void;
}

export default function ClueTray({ clues, onRemoveClue }: ClueTrayProps) {
  if (clues.length === 0) {
    return null;
  }

  return (
    <div className="clue-tray">
      <h3 className="clue-tray-title">Collected Clues:</h3>
      <div className="clue-tray-content">
        {clues.map(clue => (
          <div key={clue.id} className="clue-item">
            <span className="clue-text">{clue.text}</span>
            <button
              className="clue-remove"
              onClick={() => onRemoveClue(clue.id)}
              aria-label={`Remove clue: ${clue.text}`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

