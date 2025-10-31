'use client';

import { useState } from 'react';
import Image from 'next/image';
import '../app/intro.css';
import ResponsiveImageWithHotspots from './ResponsiveImageWithHotspots';

interface InboxPanelProps {
  onSelectEmail: (emailId: string) => void;
  completedEmails?: Set<string>;
  emailResults?: Map<string, boolean>;
  onEmailCompleted?: (emailId: string, isCorrect: boolean) => void;
}

const INBOX_WIDTH = 900;
const INBOX_HEIGHT = 600;

const emailSubjects = [
  { id: 'email1', subject: 'Winnner Winner!', x: 35, y: 47 },  // percentages
  { id: 'email2', subject: 'Final Interview', x: 35, y: 60 },
  { id: 'email3', subject: 'Order Confirmation', x: 35, y: 70 },
];

const inboxHotspots = emailSubjects.map(email => ({
  id: email.id,
  x: (email.x / 100) * INBOX_WIDTH,  // Convert percentage to pixels
  y: (email.y / 100) * INBOX_HEIGHT,
  name: email.subject,
}));

// Map email IDs to image files
const emailImages: Record<string, string> = {
  email1: '/Winner.png',
  email2: '/Interview.png',
  email3: '/Order.png',
};

// Map email IDs to correct decisions
const correctDecisions: Record<string, 'keep' | 'report'> = {
  email1: 'report',
  email2: 'report',
  email3: 'keep',
};

export default function InboxPanel({ 
  onSelectEmail, 
  completedEmails = new Set(),
  emailResults = new Map(),
  onEmailCompleted 
}: InboxPanelProps) {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [decision, setDecision] = useState<'keep' | 'report' | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  console.log('InboxPanel rendered, selectedEmail:', selectedEmail);

  const handleEmailClick = (emailId: string) => {
    // Allow viewing completed emails, but load their previous decision
    if (completedEmails.has(emailId)) {
      setSelectedEmail(emailId);
      // Load the previous decision from emailResults
      const wasCorrect = emailResults.get(emailId) || false;
      setIsCorrect(wasCorrect);
      // Infer what decision was made based on correctness:
      // If correct, they selected the right decision. If wrong, they selected the opposite.
      if (wasCorrect) {
        setDecision(correctDecisions[emailId]);
      } else {
        // They selected the wrong one, so it's the opposite of the correct decision
        setDecision(correctDecisions[emailId] === 'report' ? 'keep' : 'report');
      }
      return;
    }
    setSelectedEmail(emailId);
    setDecision(null);
    setIsCorrect(null);
  };

  const handleDecision = (choice: 'keep' | 'report') => {
    if (!selectedEmail || completedEmails.has(selectedEmail)) return;
    
    const correct = correctDecisions[selectedEmail] === choice;
    setDecision(choice);
    setIsCorrect(correct);
    onSelectEmail(selectedEmail);
    
    // Notify parent that email is completed
    if (onEmailCompleted) {
      onEmailCompleted(selectedEmail, correct);
    }
  };

  const handleBackToInbox = () => {
    setSelectedEmail(null);
    setDecision(null);
    setIsCorrect(null);
  };

  if (selectedEmail && decision !== null) {
    const emailImage = emailImages[selectedEmail] || '/Inbox.png';
    
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative' }}>
        {/* Feedback Panel on Left Side */}
        {isCorrect !== null && (
          <div style={{
            width: '250px',
            padding: '1.5rem',
            background: isCorrect ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 68, 68, 0.1)',
            border: `2px solid ${isCorrect ? '#00ff00' : '#ff4444'}`,
            borderRadius: '12px',
            marginRight: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            color: isCorrect ? '#00ff00' : '#ff4444',
            fontSize: '1.2rem',
            fontWeight: '600',
          }}>
            <div style={{ fontSize: '3rem' }}>
              {isCorrect ? '✓' : '✗'}
            </div>
            <div style={{ textAlign: 'center' }}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </div>
            <div style={{ 
              fontSize: '0.9rem', 
              textAlign: 'center',
              color: isCorrect ? 'rgba(0, 255, 0, 0.8)' : 'rgba(255, 68, 68, 0.8)',
            }}>
              {selectedEmail === 'email1' && decision === 'report' && 'This is a phishing email trying to trick you with a fake win.'}
              {selectedEmail === 'email1' && decision === 'keep' && 'This email should be reported - it\'s a phishing scam.'}
              {selectedEmail === 'email2' && decision === 'report' && 'This is a phishing email attempting to steal your information.'}
              {selectedEmail === 'email2' && decision === 'keep' && 'This email should be reported - it\'s suspicious and likely a scam.'}
              {selectedEmail === 'email3' && decision === 'keep' && 'This is a legitimate order confirmation email.'}
              {selectedEmail === 'email3' && decision === 'report' && 'This is a legitimate email and should be kept.'}
            </div>
          </div>
        )}

        {/* Email Image on Right Side */}
        <div style={{ 
          flex: 1, 
          position: 'relative', 
          width: '100%', 
          height: '100%',
          background: '#2a2a2a',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <Image
            src={emailImage}
            alt={`Email ${selectedEmail}`}
            fill
            style={{ objectFit: 'contain' }}
          />
          <div style={{ 
            position: 'absolute', 
            bottom: '80px', 
            left: '50%', 
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '1rem',
            zIndex: 10
          }}>
            <button 
              className="panel-action"
              onClick={handleBackToInbox}
              style={{ 
                background: '#667eea',
                padding: '0.75rem 2rem',
                fontSize: '1rem'
              }}
            >
              Back to Inbox
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If email is selected but no decision yet (shouldn't happen for completed emails, but handle it)
  if (selectedEmail && decision === null && !completedEmails.has(selectedEmail)) {
    const emailImage = emailImages[selectedEmail] || '/Inbox.png';
    
    return (
      <div className="panel-content" style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image
          src={emailImage}
          alt={`Email ${selectedEmail}`}
          fill
          style={{ objectFit: 'contain' }}
        />
        <div style={{ 
          position: 'absolute', 
          bottom: '80px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1rem',
          zIndex: 10
        }}>
          <button 
            className="panel-action"
            onClick={() => handleDecision('keep')}
            style={{ background: '#4CAF50' }}
          >
            Keep
          </button>
          <button 
            className="panel-action"
            onClick={() => handleDecision('report')}
            style={{ background: '#f44336' }}
          >
            Report
          </button>
        </div>
      </div>
    );
  }

  // Filter hotspots to show completion status
  const enhancedHotspots = inboxHotspots.map(hotspot => {
    const isCompleted = completedEmails.has(hotspot.id);
    return {
      ...hotspot,
      name: isCompleted ? `${hotspot.name} (Completed)` : hotspot.name,
    };
  });

  return (
    <div style={{ padding: 0, background: '#2a2a2a', position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <ResponsiveImageWithHotspots
          src="/Inbox.png"
          alt="Inbox"
          width={INBOX_WIDTH}
          height={INBOX_HEIGHT}
          hotspots={enhancedHotspots}
          onHotspotClick={handleEmailClick}
          showArrow={false}
        />
        {/* Show completion indicators on completed hotspots */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 20,
          }}
          viewBox={`0 0 ${INBOX_WIDTH} ${INBOX_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {inboxHotspots.map((hotspot) => {
            if (!completedEmails.has(hotspot.id)) return null;
            
            return (
              <g key={`${hotspot.id}-indicator`}>
                {/* Green circle background */}
                <circle
                  cx={hotspot.x}
                  cy={hotspot.y}
                  r="20"
                  fill="rgba(0, 255, 0, 0.8)"
                  stroke="#fff"
                  strokeWidth="3"
                />
                {/* Checkmark */}
                <text
                  x={hotspot.x}
                  y={hotspot.y}
                  fontSize="20"
                  fill="#000"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  ✓
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      {/* Show message for completed emails if user tries to interact */}
      {completedEmails.size > 0 && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontSize: '0.9rem',
          zIndex: 30,
          pointerEvents: 'none',
        }}>
          {completedEmails.size === 3 ? 'All emails completed!' : `${completedEmails.size} email${completedEmails.size > 1 ? 's' : ''} completed`}
        </div>
      )}
    </div>
  );
}

