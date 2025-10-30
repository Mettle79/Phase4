'use client';

import { useState } from 'react';
import Image from 'next/image';
import '../app/intro.css';

interface InboxPanelProps {
  onSelectEmail: (emailId: string) => void;
}

const emailSubjects = [
  { id: 'email1', subject: 'Winnner Winner!', x: 35, y: 47 },
  { id: 'email2', subject: 'Action Required: Verify Your Account', x: 35, y: 60 },
  { id: 'email3', subject: 'Invoice #12345 - Payment Due', x: 35, y: 72 },
];

export default function InboxPanel({ onSelectEmail }: InboxPanelProps) {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [decision, setDecision] = useState<'keep' | 'report' | null>(null);
  
  console.log('InboxPanel rendered, selectedEmail:', selectedEmail);

  const handleEmailClick = (emailId: string) => {
    setSelectedEmail(emailId);
  };

  const handleDecision = (choice: 'keep' | 'report') => {
    setDecision(choice);
    onSelectEmail(selectedEmail || '');
  };

  if (selectedEmail && decision) {
    return (
      <div className="panel-content">
        <div className="panel-header">
          <h2>Decision Recorded</h2>
        </div>
        <div className="panel-body">
          <p>Your decision has been recorded: {decision === 'keep' ? 'Keep' : 'Report'}</p>
        </div>
      </div>
    );
  }

  if (selectedEmail) {
    return (
      <div className="panel-content" style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image
          src={`/emails/${selectedEmail}.png`}
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

  return (
    <div style={{ position: 'relative', width: 'calc(100% + 8px)', height: '70vh', marginLeft: '10px', marginTop: '-60px', padding: 0, background: '#2a2a2a' }}>
      <Image
        src="/Inbox.png"
        alt="Inbox"
        fill
        style={{ objectFit: 'contain', objectPosition: '80% 20%' }}
      />
      {emailSubjects.map((email) => (
        <button
          key={email.id}
          style={{
            position: 'absolute',
            left: `${email.x}%`,
            top: `${email.y}%`,
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer'
          }}
          onClick={() => handleEmailClick(email.id)}
          aria-label={`Select ${email.subject}`}
        >
          <span 
            className="hotspot-pulse"
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              background: 'rgba(0, 255, 0, 0.3)',
              borderRadius: '50%',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          <span
            className="hotspot-pulse"
            style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              background: '#00ff00',
              border: '2px solid white',
              borderRadius: '50%',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)'
            }}
          />
        </button>
      ))}
    </div>
  );
}

