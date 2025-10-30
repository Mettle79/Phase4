'use client';

import InboxPanel from './InboxPanel';

interface CalendarPanelProps {
  onFound: (clue: { id: string; text: string }) => void;
  found: boolean;
}

export default function CalendarPanel({ onFound, found }: CalendarPanelProps) {
  const handleEmailSelect = (emailId: string) => {
    // Handle the email selection
    console.log('Email selected:', emailId);
  };

  return <InboxPanel onSelectEmail={handleEmailSelect} />;
}

