'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from './Modal';

interface ImageCarouselProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string, gridType: 'safe' | 'delete') => void;
  currentGridType: 'safe' | 'delete' | null;
}

export default function ImageCarousel({ 
  images, 
  isOpen, 
  onClose, 
  onSelectImage, 
  currentGridType 
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSelect = () => {
    if (currentGridType && images[currentIndex]) {
      onSelectImage(images[currentIndex], currentGridType);
      onClose();
      setCurrentIndex(0);
    }
  };

  if (!images.length) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '1.5rem',
          color: '#667eea'
        }}>
          Select an Image for {currentGridType === 'safe' ? 'Safe Upload' : 'Delete'}
        </h2>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <button
            onClick={handlePrevious}
            className="panel-action"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '0.75rem 1.5rem',
              fontSize: '1.2rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ‹
          </button>

          <div style={{
            position: 'relative',
            width: '500px',
            height: '400px',
            background: '#2a2a2a',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Image
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>

          <button
            onClick={handleNext}
            className="panel-action"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '0.75rem 1.5rem',
              fontSize: '1.2rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ›
          </button>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <button
            onClick={handleSelect}
            className="panel-action"
            style={{
              background: '#667eea',
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              minWidth: '150px'
            }}
            disabled={!currentGridType}
          >
            Select Image
          </button>
          <button
            onClick={onClose}
            className="panel-action"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              minWidth: '150px'
            }}
          >
            Cancel
          </button>
        </div>

        <p style={{
          marginTop: '1rem',
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          {currentIndex + 1} of {images.length}
        </p>
      </div>
    </Modal>
  );
}

