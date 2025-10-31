'use client';

interface EmailResult {
  emailId: string;
  completed: boolean;
  isCorrect: boolean;
}

interface EmailTrackerProps {
  emailResults: EmailResult[];
}

export default function EmailTracker({ emailResults }: EmailTrackerProps) {
  const completedCount = emailResults.filter(r => r.completed).length;
  const correctCount = emailResults.filter(r => r.completed && r.isCorrect).length;
  const totalEmails = 3;

  const getEmailLabel = (emailId: string) => {
    switch (emailId) {
      case 'email1':
        return 'Winner Winner!';
      case 'email2':
        return 'Final Interview';
      case 'email3':
        return 'Order Confirmation';
      default:
        return emailId;
    }
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    }}>
      <h3 style={{
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: '#667eea',
        textAlign: 'center',
      }}>
        Task Activity Tracker
      </h3>

      {/* Progress Summary */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1.5rem',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#667eea',
          marginBottom: '0.5rem',
        }}>
          {correctCount} / {totalEmails}
        </div>
        <div style={{
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.7)',
        }}>
          Correct Emails
        </div>
        <div style={{
          marginTop: '0.75rem',
          fontSize: '0.85rem',
          color: 'rgba(255, 255, 255, 0.6)',
        }}>
          {completedCount} of {totalEmails} completed
        </div>
      </div>

      {/* Individual Email Status */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}>
        <div style={{
          fontSize: '0.9rem',
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '0.5rem',
        }}>
          Email Status:
        </div>
        {['email1', 'email2', 'email3'].map((emailId) => {
          const result = emailResults.find(r => r.emailId === emailId);
          const completed = result?.completed || false;
          const isCorrect = result?.isCorrect || false;

          return (
            <div
              key={emailId}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                background: completed
                  ? isCorrect
                    ? 'rgba(0, 255, 0, 0.1)'
                    : 'rgba(255, 68, 68, 0.1)'
                  : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: `1px solid ${
                  completed
                    ? isCorrect
                      ? 'rgba(0, 255, 0, 0.3)'
                      : 'rgba(255, 68, 68, 0.3)'
                    : 'rgba(255, 255, 255, 0.1)'
                }`,
              }}
            >
              <span style={{
                fontSize: '0.85rem',
                color: completed ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)',
                flex: 1,
              }}>
                {getEmailLabel(emailId)}
              </span>
              <span style={{
                fontSize: '1.2rem',
                color: completed
                  ? isCorrect
                    ? '#00ff00'
                    : '#ff4444'
                  : 'rgba(255, 255, 255, 0.3)',
                marginLeft: '0.5rem',
              }}>
                {completed ? (isCorrect ? '✓' : '✗') : '○'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

