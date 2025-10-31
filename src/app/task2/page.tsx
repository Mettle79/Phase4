'use client';

import { useState, useEffect } from 'react';
import PhoneAlertPanel from '@/components/PhoneAlertPanel';
import SecurityAlertPanel from '@/components/SecurityAlertPanel';
import PhoneDecisionCard from '@/components/PhoneDecisionCard';
import ChangePasswordModal from '@/components/ChangePasswordModal';
import Modal from '@/components/Modal';

const STORAGE_KEY = 'task2_decision';
const TASK2_COMPLETE_KEY = 'task2_complete';
const TASK2_AMBER_KEY = 'task2_amber';

// Helper function to load task2 decision from localStorage
function loadTask2Decision(): 'me' | 'someone_else' | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return stored as 'me' | 'someone_else';
    }
  } catch (error) {
    console.error('Error loading task2 decision from localStorage:', error);
  }
  
  return null;
}

// Helper function to load task2 completion status
function loadTask2Complete(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const stored = localStorage.getItem(TASK2_COMPLETE_KEY);
    return stored === 'true';
  } catch (error) {
    console.error('Error loading task2 completion from localStorage:', error);
    return false;
  }
}

export default function Task2() {
  const [decision, setDecision] = useState<'me' | 'someone_else' | null>(null);
  const [showDecisionCard, setShowDecisionCard] = useState(true);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [taskComplete, setTaskComplete] = useState(false);
  const [completedWithAmber, setCompletedWithAmber] = useState(false);

  // Load decision and completion status from localStorage on mount
  useEffect(() => {
    const savedDecision = loadTask2Decision();
    if (savedDecision) {
      setDecision(savedDecision);
    }
    const savedComplete = loadTask2Complete();
    if (savedComplete) {
      setTaskComplete(true);
      // Check if completed with amber penalty
      if (typeof window !== 'undefined') {
        try {
          const savedAmber = localStorage.getItem(TASK2_AMBER_KEY);
          setCompletedWithAmber(savedAmber === 'true');
        } catch (error) {
          console.error('Error loading task2 amber status:', error);
        }
      }
    }
  }, []);

  const handleDecision = (choice: 'me' | 'someone_else') => {
    setDecision(choice);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, choice);
      } catch (error) {
        console.error('Error saving task2 decision to localStorage:', error);
      }
    }
  };

  const handleCloseDecisionCard = () => {
    setShowDecisionCard(false);
  };

  const handleOpenChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePassword = () => {
    setShowChangePasswordModal(false);
  };

  const handleTaskComplete = (isAmber: boolean = false) => {
    setTaskComplete(true);
    setCompletedWithAmber(isAmber);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(TASK2_COMPLETE_KEY, 'true');
        localStorage.setItem(TASK2_AMBER_KEY, isAmber ? 'true' : 'false');
      } catch (error) {
        console.error('Error saving task2 completion to localStorage:', error);
      }
    }
  };

  const handleAmberPenalty = () => {
    handleTaskComplete(true);
  };

  return (
    <main className="main-container">
      <div className="game-area">
        <div className="background-container">
          <PhoneAlertPanel decision={decision} />
        </div>

        <div className="sidebar">
          {!decision && <SecurityAlertPanel decision={decision} />}
          {/* Decision Card in Sidebar */}
          {showDecisionCard && (
            <PhoneDecisionCard
              decision={decision}
              onDecision={handleDecision}
              onClose={handleCloseDecisionCard}
            />
          )}
          {/* Change Password Button - Show after decision is made, hide when complete */}
          {decision && !taskComplete && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              marginTop: '1rem'
            }}>
              <button
                className="panel-action"
                onClick={handleOpenChangePassword}
                style={{
                  background: '#667eea',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  width: '100%'
                }}
              >
                Change Password
              </button>
            </div>
          )}
          
          {/* Task Complete Message - Show when password change completed */}
          {taskComplete && (
            <div style={{
              background: completedWithAmber ? 'rgba(255, 193, 7, 0.1)' : 'rgba(0, 255, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: `1px solid ${completedWithAmber ? 'rgba(255, 193, 7, 0.3)' : 'rgba(0, 255, 0, 0.3)'}`,
              marginTop: '1rem'
            }}>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: completedWithAmber ? '#ffc107' : '#00ff00',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                ✓ Task Complete
              </div>
              {completedWithAmber && (
                <div style={{
                  padding: '1rem',
                  background: 'rgba(255, 193, 7, 0.15)',
                  border: '1px solid rgba(255, 193, 7, 0.4)',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  color: '#ffc107',
                  lineHeight: '1.6'
                }}>
                  <p style={{ margin: 0, fontWeight: '600', marginBottom: '0.5rem' }}>
                    Smaller Penalty:
                  </p>
                  <p style={{ margin: 0 }}>
                    Your password could be stronger. Prompt: Please consider using 10 or more characters for better security.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal isOpen={showChangePasswordModal} onClose={handleCloseChangePassword} size="large">
        <ChangePasswordModal 
          onClose={handleCloseChangePassword} 
          onAmberPenalty={handleAmberPenalty}
          onSuccess={() => handleTaskComplete(false)}
        />
      </Modal>
    </main>
  );
}

