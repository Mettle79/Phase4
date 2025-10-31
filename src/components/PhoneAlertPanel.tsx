'use client';

import Image from 'next/image';

interface PhoneAlertPanelProps {
  decision?: 'me' | 'someone_else' | null;
}

export default function PhoneAlertPanel({ decision }: PhoneAlertPanelProps) {
  // Show ChangePassword.png when decision is made
  const imageSrc = decision ? '/ChangePassword.png' : '/PhoneAlert.png';
  
  return (
    <div style={{ padding: 0, background: '#2a2a2a', height: '100%', width: '100%', position: 'relative' }}>
      <Image
        src={imageSrc}
        alt={decision ? 'Change Password' : 'Phone Alert'}
        fill
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}

