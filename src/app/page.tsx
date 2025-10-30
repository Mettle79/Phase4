'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './intro.css';

export default function Home() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setImageVisible(true);
    setTimeout(() => {
      setVideoEnded(true);
    }, 500);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {!videoEnded ? (
        <video
          ref={videoRef}
          src="/Scene_Description.mp4"
          autoPlay
          muted
          onEnded={handleVideoEnd}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageVisible ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out'
          }}
        />
      ) : null}
      {(imageVisible || videoEnded) && (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
          <Image
            src="/Bedroom.png"
            alt="Bedroom"
            fill
            style={{ objectFit: 'cover', opacity: imageVisible && !videoEnded ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}
            priority
          />
          <Link href="/task1">
            <button
              style={{
                position: 'absolute',
                left: '63%',
                top: '49%',
                transform: 'translate(-50%, -50%)',
                width: '40px',
                height: '40px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer'
              }}
              aria-label="Go to Task 1"
            >
              <span 
                className="hotspot-pulse"
                style={{
                  position: 'absolute',
                  width: '40px',
                  height: '40px',
                  background: 'rgba(0, 255, 0, 0.3)',
                  borderRadius: '50%',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
              <span
                className="hotspot-pulse"
                style={{
                  position: 'absolute',
                  width: '12px',
                  height: '12px',
                  background: '#00ff00',
                  border: '2px solid white',
                  borderRadius: '50%',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)'
                }}
              />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
