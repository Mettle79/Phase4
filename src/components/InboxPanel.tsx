'use client';

import { useState } from 'react';
import Image from 'next/image';
import '../app/intro.css';
import ResponsiveImageWithHotspots from './ResponsiveImageWithHotspots';

interface InboxPanelProps {
  onSelectEmail: (emailId: string) => void;
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
    <div style={{ padding: 0, background: '#2a2a2a' }}>
      <ResponsiveImageWithHotspots
        src="/Inbox.png"
        alt="Inbox"
        width={INBOX_WIDTH}
        height={INBOX_HEIGHT}
        hotspots={inboxHotspots}
        onHotspotClick={handleEmailClick}
        showArrow={false}
      />
    </div>
  );
}

