'use client';

import InboxPanel from './InboxPanel';

interface CalendarPanelProps {
  onFound: (clue: { id: string; text: string }) => void;
  found: boolean;
  completedEmails?: Set<string>;
  emailResults?: Map<string, boolean>;
  onEmailCompleted?: (emailId: string, isCorrect: boolean) => void;
}

export default function CalendarPanel({ 
  onFound, 
  found,
  completedEmails,
  emailResults,
  onEmailCompleted
}: CalendarPanelProps) {
  const handleEmailSelect = (emailId: string) => {
    // Handle the email selection
    console.log('Email selected:', emailId);
  };

  return (
    <InboxPanel 
      onSelectEmail={handleEmailSelect}
      completedEmails={completedEmails}
      emailResults={emailResults}
      onEmailCompleted={onEmailCompleted}
    />
  );
}

