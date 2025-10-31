'use client';

interface SecurityAlertPanelProps {
  decision?: 'me' | 'someone_else' | null;
}

export default function SecurityAlertPanel({ decision }: SecurityAlertPanelProps) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginBottom: '1rem',
    }}>
      <h3 style={{
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: '#ffc107',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span>Security Alert</span>
        {decision && (
          <span style={{
            background: 'rgba(138, 43, 226, 0.2)',
            border: '1px solid rgba(138, 43, 226, 0.5)',
            borderRadius: '6px',
            padding: '0.25rem 0.75rem',
            fontSize: '0.85rem',
            color: '#ba55d3'
          }}>
            Decision Made
          </span>
        )}
      </h3>
      
      <div style={{
        background: 'rgba(255, 193, 7, 0.1)',
        border: '1px solid rgba(255, 193, 7, 0.3)',
        borderRadius: '8px',
        padding: '1rem',
      }}>
        <p style={{
          fontSize: '0.95rem',
          lineHeight: '1.6',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '0.75rem',
        }}>
          Your phone has provided an alert to say someone is attempting to access your application. 
          You have to decide whether to say it was you or not.
        </p>
        <p style={{
          fontSize: '0.9rem',
          lineHeight: '1.6',
          color: '#ffc107',
          fontWeight: '600',
          margin: 0,
        }}>
          Note: You were not at this location nor have you recently attempted to log in.
        </p>
      </div>

      {decision && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: 'rgba(138, 43, 226, 0.1)',
          border: '1px solid rgba(138, 43, 226, 0.3)',
          borderRadius: '8px',
          fontSize: '0.9rem',
          color: '#ba55d3',
          fontStyle: 'italic',
        }}>
          Your decision: <strong>{decision === 'me' ? 'It was me' : 'It was someone else'}</strong>
        </div>
      )}
    </div>
  );
}

