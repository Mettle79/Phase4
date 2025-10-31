'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './intro.css';

const TASK1_STORAGE_KEY = 'task1_email_results';
const TASK2_COMPLETE_KEY = 'task2_complete';

export default function Home() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [task1Completed, setTask1Completed] = useState(false);
  const [task2Completed, setTask2Completed] = useState(false);
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

  // Check if Task 2 is completed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(TASK2_COMPLETE_KEY);
        setTask2Completed(stored === 'true');
      } catch (error) {
        console.error('Error checking Task 2 completion:', error);
      }
    }
  }, []);

  // Listen for storage changes to update Task 1 and Task 2 completion status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorageChange = () => {
        try {
          // Check Task 1
          const stored1 = localStorage.getItem(TASK1_STORAGE_KEY);
          if (stored1) {
            const parsed = JSON.parse(stored1);
            const completedEmails = Object.keys(parsed);
            setTask1Completed(completedEmails.length === 3);
          } else {
            setTask1Completed(false);
          }
          
          // Check Task 2
          const stored2 = localStorage.getItem(TASK2_COMPLETE_KEY);
          setTask2Completed(stored2 === 'true');
        } catch (error) {
          console.error('Error checking task completion:', error);
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
        <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
          {/* Background image */}
          <Image
            src="/Bedroom.png"
            alt="Bedroom"
            fill
            style={{ 
              objectFit: 'cover', 
              objectPosition: 'center',
              width: '100%',
              height: '100%',
              opacity: imageVisible && !videoEnded ? 0 : 1, 
              transition: 'opacity 0.5s ease-in-out' 
            }}
            priority
          />
          {/* Use SVG overlay like Task 1 for responsive hotspots */}
          <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
            <svg
              viewBox="0 0 1920 1080"
              preserveAspectRatio="xMidYMid slice"
              style={{ width: '100%', height: '100%', display: 'block' }}
            >
              
              {/* Task 1 Hotspot - Green */}
              <g>
                {/* Pulse circle */}
                <circle 
                  cx="1209.6" 
                  cy="529.2" 
                  r="20" 
                  fill="rgba(0, 255, 0, 0.3)"
                >
                  <animate
                    attributeName="opacity"
                    values="0.3;0;0.3"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Green dot */}
                <circle
                  cx="1209.6"
                  cy="529.2"
                  r="6"
                  fill="#00ff00"
                  stroke="white"
                  strokeWidth="2"
                >
                  <animate
                    attributeName="opacity"
                    values="1;0;1"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Clickable area */}
                <a
                  href="/task1"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/task1';
                  }}
                  style={{ pointerEvents: 'auto' }}
                >
                  <circle
                    cx="1209.6"
                    cy="529.2"
                    r="40"
                    fill="transparent"
                    cursor="pointer"
                  />
                </a>
              </g>

              {/* Task 2 Hotspot - Purple - only shows when Task 1 is completed */}
              {task1Completed && (
                <g>
                  {/* Pulse circle */}
                  <circle 
                    cx="1470.8" 
                    cy="670.6" 
                    r="20" 
                    fill="rgba(138, 43, 226, 0.3)"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.3;0;0.3"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Purple dot */}
                  <circle
                    cx="1510.8"
                    cy="690.6"
                    r="6"
                    fill="#8a2be2"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0;1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Clickable area */}
                  <a
                    href="/task2"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/task2';
                    }}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <circle
                      cx="1410.8"
                      cy="690.6"
                      r="40"
                      fill="transparent"
                      cursor="pointer"
                    />
                  </a>
                </g>
              )}

              {/* Task 3 Hotspot - Blue - only shows when Task 2 is completed */}
              {task2Completed && (
                <g>
                  {/* Pulse circle */}
                  <circle 
                    cx="1655.2" 
                    cy="691.2" 
                    r="20" 
                    fill="rgba(0, 123, 255, 0.3)"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.3;0;0.3"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Blue dot */}
                  <circle
                    cx="1555.2"
                    cy="665.2"
                    r="6"
                    fill="#007bff"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0;1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Clickable area */}
                  <a
                    href="/task3"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/task3';
                    }}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <circle
                      cx="1555.2"
                      cy="691.2"
                      r="40"
                      fill="transparent"
                      cursor="pointer"
                    />
                  </a>
                </g>
              )}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
