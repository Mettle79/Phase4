'use client';

interface Task3SidebarProps {
  onStart: () => void;
  hasStarted: boolean;
}

export default function Task3Sidebar({ onStart, hasStarted }: Task3SidebarProps) {
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
        color: '#ffc107',
      }}>
        Task 3: Image Classification
      </h3>
      
      <div style={{
        fontSize: '0.95rem',
        lineHeight: '1.6',
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: '1.5rem',
      }}>
        <p style={{ marginBottom: '1rem' }}>
          Your task is to classify images into two categories:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Safe Upload:</strong> Images that are safe to upload
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Delete:</strong> Images that should be deleted
          </li>
        </ul>
        <p>
          You will select images from a carousel and place them into the appropriate grid. Each grid can hold up to 6 images.
        </p>
      </div>

      {!hasStarted && (
        <button
          className="panel-action"
          onClick={onStart}
          style={{
            background: '#667eea',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            width: '100%',
            fontWeight: '600'
          }}
        >
          Start Task
        </button>
      )}
    </div>
  );
}

