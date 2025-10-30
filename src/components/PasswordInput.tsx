'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';

interface PasswordInputProps {
  onCheck: (password: string) => boolean;
}

export default function PasswordInput({ onCheck }: PasswordInputProps) {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'failure'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = onCheck(password);
    setStatus(isValid ? 'success' : 'failure');
    
    if (isValid) {
      setTimeout(() => {
        setStatus('idle');
        setPassword('');
      }, 2000);
    } else {
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="password-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password..."
          className="password-field"
        />
        <button type="submit" className="password-submit">
          Check
        </button>
      </form>
      {status === 'success' && (
        <div className="password-message success">
          <Check size={16} />
          <span>Password correct!</span>
        </div>
      )}
      {status === 'failure' && (
        <div className="password-message failure">
          <X size={16} />
          <span>Password incorrect. Collect more clues.</span>
        </div>
      )}
    </div>
  );
}

