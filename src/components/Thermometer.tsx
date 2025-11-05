'use client';

interface ThermometerProps {
  progress: number; // 0-100
  totalFlags: number;
  clickedFlags: number;
}

export default function Thermometer({ progress, totalFlags, clickedFlags }: ThermometerProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      width: '100%',
      maxWidth: '150px'
    }}>
      {/* Thermometer Label */}
      <div style={{
        fontSize: '1.2rem',
        fontWeight: '600',
        color: '#667eea',
        textAlign: 'center'
      }}>
        Red Flags
      </div>
      
      {/* Thermometer Container */}
      <div style={{
        position: 'relative',
        width: '80px',
        height: '400px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '40px',
        border: '3px solid rgba(255, 255, 255, 0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}>
        {/* Thermometer Fill */}
        <div
          style={{
            width: '100%',
            height: `${progress}%`,
            background: progress === 100 
              ? 'linear-gradient(180deg, #ff4444 0%, #cc0000 100%)'
              : 'linear-gradient(180deg, #ff6666 0%, #ff4444 100%)',
            borderRadius: progress === 100 ? '40px' : '40px 40px 0 0',
            transition: 'height 0.5s ease, background 0.5s ease',
            boxShadow: progress > 0 ? 'inset 0 0 20px rgba(255, 68, 68, 0.3)' : 'none'
          }}
        />
        
        {/* Thermometer Bulb */}
        <div
          style={{
            position: 'absolute',
            bottom: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: progress === 100
              ? 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)'
              : progress > 0
              ? 'linear-gradient(135deg, #ff6666 0%, #ff4444 100%)'
              : 'rgba(255, 255, 255, 0.1)',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            transition: 'background 0.5s ease',
            boxShadow: progress > 0 
              ? '0 0 20px rgba(255, 68, 68, 0.5), inset 0 0 20px rgba(255, 68, 68, 0.3)'
              : 'none'
          }}
        />
      </div>
      
      {/* Progress Text */}
      <div style={{
        fontSize: '1rem',
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center'
      }}>
        {clickedFlags} / {totalFlags}
      </div>
    </div>
  );
}

