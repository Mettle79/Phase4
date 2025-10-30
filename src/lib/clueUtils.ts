export interface Clue {
  id: string;
  text: string;
}

// Password derivation logic
export function derivePassword(clues: Clue[]): string {
  if (clues.length === 0) return '';
  
  // Simple password: concat first letter of each clue
  const password = clues
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(clue => clue.text.charAt(0).toUpperCase())
    .join('');
  
  return password;
}

// Dev-time tests
if (typeof window === 'undefined') {
  // Server-side tests
  const testClues: Clue[] = [
    { id: '1', text: 'Alpha' },
    { id: '2', text: 'Beta' },
    { id: '3', text: 'Gamma' }
  ];
  
  console.assert(
    derivePassword(testClues) === 'ABG',
    'Password derivation should return ABG for Alpha, Beta, Gamma'
  );
  
  console.assert(
    derivePassword([]) === '',
    'Password derivation should return empty string for no clues'
  );
}

