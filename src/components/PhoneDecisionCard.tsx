'use client';

interface PhoneDecisionCardProps {
  decision: 'me' | 'someone_else' | null;
  onDecision: (decision: 'me' | 'someone_else') => void;
  onClose: () => void;
}

export default function PhoneDecisionCard({ decision, onDecision, onClose }: PhoneDecisionCardProps) {
  if (decision) {
    const wasCorrect = decision === 'someone_else';
    
    return (
      <div style={{
        padding: '2rem',
        background: '#2a2a2a',
        borderRadius: '12px',
        border: `2px solid ${wasCorrect ? '#00ff00' : '#ff4444'}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'center',
        maxWidth: '400px'
      }}>
        <div style={{
          fontSize: '3rem',
          color: wasCorrect ? '#00ff00' : '#ff4444'
        }}>
          {wasCorrect ? '✓' : '✗'}
        </div>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: wasCorrect ? '#00ff00' : '#ff4444',
          margin: 0,
          textAlign: 'center'
        }}>
          {wasCorrect ? 'Correct!' : 'Incorrect'}
        </h3>
        <p style={{
          fontSize: '1rem',
          color: 'rgba(255, 255, 255, 0.9)',
          textAlign: 'center',
          lineHeight: '1.6',
          margin: 0
        }}>
          {decision === 'me' 
            ? 'You indicated it was you, but the clues suggest you were not at this location and have not recently attempted to log in. This could be a security threat.'
            : 'Correct! Since you were not at this location and have not recently attempted to log in, this is likely a security threat and should be reported as suspicious activity.'}
        </p>
        <div style={{
          padding: '1rem',
          background: 'rgba(255, 193, 7, 0.1)',
          border: '1px solid rgba(255, 193, 7, 0.3)',
          borderRadius: '8px',
          marginTop: '0.5rem',
          width: '100%'
        }}>
          <p style={{
            fontSize: '0.95rem',
            color: '#ffc107',
            textAlign: 'center',
            lineHeight: '1.5',
            margin: 0,
            fontWeight: '600'
          }}>
            ⚠️ You should now change your password as someone has gained hold of it.
          </p>
        </div>
        <button
          className="panel-action"
          onClick={onClose}
          style={{
            background: '#667eea',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            width: '100%'
          }}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      background: '#2a2a2a',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      alignItems: 'stretch',
      maxWidth: '400px'
    }}>
      <h3 style={{
        fontSize: '1.3rem',
        fontWeight: '600',
        color: '#ffc107',
        margin: 0,
        textAlign: 'center'
      }}>
        Make Your Decision
      </h3>
      <p style={{
        fontSize: '0.95rem',
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        margin: 0
      }}>
        Was this login attempt made by you?
      </p>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <button
          className="panel-action"
          onClick={() => onDecision('me')}
          style={{
            background: '#4CAF50',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            width: '100%'
          }}
        >
          It was me
        </button>
        <button
          className="panel-action"
          onClick={() => onDecision('someone_else')}
          style={{
            background: '#f44336',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            width: '100%'
          }}
        >
          It was someone else
        </button>
      </div>
    </div>
  );
}

