'use client';

export default function Task2() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1a1a1a',
      color: 'white',
      flexDirection: 'column',
      gap: '2rem',
      padding: '2rem'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #8a2be2 0%, #ba55d3 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Task 2
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        Task 2 is coming soon! This is a placeholder page.
      </p>
    </main>
  );
}

