'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'default' | 'large' | 'fullscreen';
}

export default function Modal({ isOpen, onClose, children, size = 'default' }: ModalProps) {
  const getModalSize = () => {
    switch (size) {
      case 'large':
        return { width: '1400px', height: '900px' };
      case 'fullscreen':
        return { width: '95vw', height: '95vh' };
      default:
        return { width: '900px', height: '600px' };
    }
  };

  const modalSize = getModalSize();
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-container"
            initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
            transition={{ type: 'spring', duration: 0.3 }}
            style={{
              width: modalSize.width,
              height: modalSize.height,
              top: '70%',
              left: '50%',
            }}
          >
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

