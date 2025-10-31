'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './intro.css';

const TASK1_STORAGE_KEY = 'task1_email_results';

export default function Home() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [task1Completed, setTask1Completed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if Task 1 is completed (all 3 emails completed)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(TASK1_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Task 1 is complete when all 3 emails are completed
          const completedEmails = Object.keys(parsed);
          setTask1Completed(completedEmails.length === 3);
        }
      } catch (error) {
        console.error('Error checking Task 1 completion:', error);
      }
    }
  }, []);

  // Listen for storage changes to update Task 1 completion status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorageChange = () => {
        try {
          const stored = localStorage.getItem(TASK1_STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            const completedEmails = Object.keys(parsed);
            setTask1Completed(completedEmails.length === 3);
          } else {
            setTask1Completed(false);
          }
        } catch (error) {
          console.error('Error checking Task 1 completion:', error);
        }
      };

      // Listen for storage events (when localStorage changes in other tabs/windows)
      window.addEventListener('storage', handleStorageChange);
      
      // Also check periodically for changes in the same tab
      const interval = setInterval(handleStorageChange, 500);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(interval);
      };
    }
  }, []);

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
          
          {/* Task 2 Hotspot - only shows when Task 1 is completed */}
          {task1Completed && (
            <Link href="/task2">
              <button
                style={{
                  position: 'absolute',
                  left: '80%',
                  top: '66%',
                  transform: 'translate(-50%, -50%)',
                  width: '40px',
                  height: '40px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer'
                }}
                aria-label="Go to Task 2"
              >
                <span 
                  className="hotspot-pulse"
                  style={{
                    position: 'absolute',
                    width: '40px',
                    height: '40px',
                    background: 'rgba(138, 43, 226, 0.3)', // Purple with transparency
                    borderRadius: '50%',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: 'pulse 3s infinite'
                  }}
                />
                <span
                  className="hotspot-pulse"
                  style={{
                    position: 'absolute',
                    width: '12px',
                    height: '12px',
                    background: '#8a2be2', // Purple color
                    border: '2px solid white',
                    borderRadius: '50%',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 10px rgba(138, 43, 226, 0.5)'
                  }}
                />
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
