'use client';

import { useMemo } from 'react';

interface RedFlag {
  id: number;
  text: string;
  description: string;
  searchText: string;
  searchTextLower: string;
}

interface ClickableMessageProps {
  message: string;
  clickedFlags: Set<number>;
  onRedFlagClick: (flagId: number) => void;
  redFlags: RedFlag[];
}

export default function ClickableMessage({ message, clickedFlags, onRedFlagClick, redFlags }: ClickableMessageProps) {
  // Split message into parts and identify red flags
  const messageParts = useMemo(() => {
    const parts: Array<{ text: string; isRedFlag: boolean; flagId: number | null }> = [];
    const messageLower = message.toLowerCase();
    let lastIndex = 0;
    const usedIndices = new Set<number>();

    // Find all red flag positions in the message (case-insensitive)
    const flagPositions = redFlags.map(flag => {
      const index = messageLower.indexOf(flag.searchTextLower);
      if (index !== -1 && !usedIndices.has(index)) {
        usedIndices.add(index);
        // Find the actual text in the original message (preserve original casing)
        const searchLength = flag.searchText.length;
        const actualText = message.substring(index, index + searchLength);
        return { ...flag, index, actualText, length: searchLength };
      }
      return null;
    }).filter(flag => flag !== null) as Array<typeof redFlags[0] & { index: number; actualText: string; length: number }>;
    
    flagPositions.sort((a, b) => a.index - b.index);

    // Build parts array
    flagPositions.forEach((flag) => {
      // Add text before the flag
      if (flag.index > lastIndex) {
        parts.push({
          text: message.substring(lastIndex, flag.index),
          isRedFlag: false,
          flagId: null
        });
      }

      // Add the flag text (use actual text from message)
      parts.push({
        text: flag.actualText,
        isRedFlag: true,
        flagId: flag.id
      });

      lastIndex = flag.index + flag.length;
    });

    // Add remaining text
    if (lastIndex < message.length) {
      parts.push({
        text: message.substring(lastIndex),
        isRedFlag: false,
        flagId: null
      });
    }

    // If no flags were found, return the whole message as a single part
    if (parts.length === 0) {
      parts.push({
        text: message,
        isRedFlag: false,
        flagId: null
      });
    }

    return parts;
  }, [message, redFlags]);

  const handleFlagClick = (flagId: number) => {
    if (!clickedFlags.has(flagId)) {
      onRedFlagClick(flagId);
    }
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '2rem',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      width: '100%',
      maxWidth: '600px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{
        fontSize: '1.1rem',
        lineHeight: '1.8',
        color: 'rgba(255, 255, 255, 0.9)',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word'
      }}>
        {messageParts.map((part, index) => {
          if (part.isRedFlag && part.flagId) {
            const isClicked = clickedFlags.has(part.flagId);
            return (
              <span
                key={index}
                onClick={() => handleFlagClick(part.flagId!)}
                style={{
                  background: isClicked 
                    ? 'rgba(255, 68, 68, 0.4)' 
                    : 'transparent',
                  padding: isClicked ? '2px 4px' : '0',
                  borderRadius: '4px',
                  cursor: isClicked ? 'default' : 'text',
                  border: isClicked 
                    ? '2px solid #ff4444' 
                    : 'none',
                  transition: 'all 0.3s ease',
                  display: 'inline-block',
                  margin: isClicked ? '2px 0' : '0',
                  textDecoration: isClicked ? 'underline' : 'none',
                  fontWeight: isClicked ? '600' : 'normal',
                  boxShadow: isClicked 
                    ? '0 0 8px rgba(255, 68, 68, 0.5)' 
                    : 'none'
                }}
                title={isClicked ? redFlags.find(f => f.id === part.flagId)?.description : ''}
              >
                {isClicked && (
                  <span style={{
                    display: 'inline-block',
                    marginRight: '4px',
                    fontSize: '1.2em',
                    verticalAlign: 'middle'
                  }}>
                    🚩
                  </span>
                )}
                {part.text}
                {isClicked && (
                  <span style={{
                    display: 'inline-block',
                    marginLeft: '4px',
                    fontSize: '1.2em',
                    verticalAlign: 'middle'
                  }}>
                    🚩
                  </span>
                )}
              </span>
            );
          }
          return <span key={index}>{part.text}</span>;
        })}
      </div>
      
      {/* Instructions */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: 'rgba(102, 126, 234, 0.1)',
        borderRadius: '8px',
        border: '1px solid rgba(102, 126, 234, 0.3)',
        fontSize: '0.9rem',
        color: 'rgba(255, 255, 255, 0.7)'
      }}>
        <strong style={{ color: '#667eea' }}>Instructions:</strong> Click on each red flag in the message above to identify suspicious content.
      </div>
    </div>
  );
}

