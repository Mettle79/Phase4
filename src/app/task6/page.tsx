'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from '@/components/Modal';

export default function Task6() {
  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const [showMainImage, setShowMainImage] = useState(false);
  const [showInstrImage, setShowInstrImage] = useState(false);
  const [showNextScreen, setShowNextScreen] = useState(false);

  useEffect(() => {
    // Show instruction modal after 3 seconds (only on initial load)
    const timer = setTimeout(() => {
      setShowInstructionModal(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show instruction image (Task6Instr.png) 3 seconds after Task6Main.png is shown
    if (showMainImage && !showInstrImage && !showNextScreen) {
      const timer = setTimeout(() => {
        setShowInstrImage(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showMainImage, showInstrImage, showNextScreen]);

  const handleCloseModal = () => {
    setShowInstructionModal(false);
  };

  const handleLinkClick = () => {
    setShowMainImage(true);
  };

  const handleInstrOk = () => {
    setShowInstrImage(false);
    setShowNextScreen(true);
  };

  return (
    <main className="main-container">
      <div style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
      }}>
        {/* Image Container with Clickable Area - Positioned relative to image */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Main Image - Intro, Main, or Next Screen */}
          {!showNextScreen ? (
            <Image
              src={showMainImage ? "/Task6Main.png" : "/Task6Intro.png"}
              alt={showMainImage ? "Task 6 Main" : "Task 6 Introduction"}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem'
            }}>
              {/* Placeholder for next screen - replace with image when ready */}
              <div style={{
                padding: '2rem',
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: '12px',
                border: '2px solid rgba(102, 126, 234, 0.3)',
                textAlign: 'center'
              }}>
                <p>Next Screen</p>
                <p style={{ fontSize: '1rem', marginTop: '1rem', opacity: 0.7 }}>
                  (Images coming soon)
                </p>
              </div>
            </div>
          )}

          {/* Clickable Link Area - Only show on intro image, positioned relative to image container */}
          {!showMainImage && (
            <div
              onClick={handleLinkClick}
              style={{
                position: 'absolute',
                // Position using percentages relative to the image container
                // Adjust these values to match where the link appears in your image
                right: '7%',  // Distance from right edge (increase to move left, decrease to move right)
                top: '27%',    // Distance from top (increase to move down, decrease to move up)
                // Size using viewport-relative units that scale with the container
                width: '29%',  // Width as percentage of container (adjust as needed)
                height: '17%', // Height as percentage of container (adjust as needed)
                cursor: 'pointer',
                zIndex: 10,
                background: 'transparent',
                // Optional: Uncomment the line below to see the clickable area while testing
                // border: '1px dashed rgba(102, 126, 234, 0.5)',
              }}
              title="Click to follow link: www.bit.ly/limitedsnecker59"
            />
          )}
        </div>

        {/* Instruction Image Overlay - Top Left */}
        {showInstrImage && !showNextScreen && (
          <div style={{
            position: 'absolute',
            top: '10rem',
            left: '2rem',
            zIndex: 1000,
            width: '800px',
            maxWidth: '60vw',
            background: 'rgba(0, 0, 0, 0.9)',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            border: '2px solid rgba(102, 126, 234, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {/* Image Container */}
            <div style={{
              width: '100%',
              maxHeight: '800px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center'
            }}>
              <Image
                src="/Task6Instr.png"
                alt="Task 6 Instructions"
                width={800}
                height={1000}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '800px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  display: 'block'
                }}
              />
            </div>
            
            {/* OK Button */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}>
              <button
                onClick={handleInstrOk}
                style={{
                  padding: '0.5rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#5568d3';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#667eea';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Instruction Modal */}
        <Modal isOpen={showInstructionModal} onClose={handleCloseModal} size="default">
          <div style={{
            padding: '2rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: '#667eea'
            }}>
              Task Instructions
            </h2>
            <div style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px'
            }}>
              <p style={{ marginBottom: '1rem' }}>
                Please click on the <strong style={{ color: '#ff4444' }}>suspicious comment</strong> posted by{' '}
                <strong style={{ color: '#667eea' }}>SneakerHypeHunter12</strong>, which contains the link:
              </p>
              <div style={{
                padding: '1rem',
                background: 'rgba(102, 126, 234, 0.1)',
                border: '2px solid rgba(102, 126, 234, 0.3)',
                borderRadius: '8px',
                margin: '1rem 0',
                fontFamily: 'monospace',
                fontSize: '1rem',
                color: '#667eea',
                wordBreak: 'break-all'
              }}>
                www.bit.ly/limitedsnecker59
              </div>
              <p style={{ marginTop: '1rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                Look for this comment in the image above and click on it to proceed.
              </p>
            </div>
            <button
              onClick={handleCloseModal}
              style={{
                marginTop: '2rem',
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#5568d3';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#667eea';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Got it!
            </button>
          </div>
        </Modal>
      </div>
    </main>
  );
}

