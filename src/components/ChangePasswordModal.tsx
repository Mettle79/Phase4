'use client';

import { useState, useEffect } from 'react';

interface ChangePasswordModalProps {
  onClose: () => void;
  onAmberPenalty?: () => void;
  onSuccess?: () => void;
}

const CORRECT_CURRENT_PASSWORD = 'Alex9';

export default function ChangePasswordModal({ onClose, onAmberPenalty, onSuccess }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [penalty, setPenalty] = useState(false);
  const [penaltyMessage, setPenaltyMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const getPasswordStrength = (password: string): { level: 'red' | 'amber' | 'green'; message: string } => {
    const length = password.length;
    if (length <= 5) {
      return { level: 'red', message: 'Password is too weak. Please use 10 or more characters.' };
    } else if (length >= 6 && length <= 9) {
      return { level: 'amber', message: 'Password could be stronger. Consider using 10 or more characters.' };
    } else {
      return { level: 'green', message: 'Password strength is good!' };
    }
  };

  const passwordStrength = newPassword ? getPasswordStrength(newPassword) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate current password
    if (currentPassword !== CORRECT_CURRENT_PASSWORD) {
      setError('Current password is incorrect. Please check your Hint Board.');
      return;
    }

    // Check password strength and apply penalties
    if (newPassword.length <= 5) {
      setPenalty(true);
      setPenaltyMessage('Penalty: Password is too weak (5 characters or fewer). Action: Restart the password input sequence.');
      // Restart sequence - clear all fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      return;
    }

    // Check if passwords match first
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match. Please re-enter them.');
      return;
    }

    // Check final password length
    if (newPassword.length < 10) {
      if (newPassword.length >= 6 && newPassword.length <= 9) {
        // AMBER: Smaller penalty - mark task as complete and show warning on main screen
        if (onAmberPenalty) {
          onAmberPenalty();
        }
        onClose();
        return;
      } else {
        // This shouldn't happen due to earlier check, but safety check
        setError('Password must be at least 10 characters long for security.');
      }
      return;
    }

    // Success - GREEN (10+ characters): SAFE! No penalty
    setPenalty(false);
    setPenaltyMessage('');
    if (onSuccess) {
      onSuccess();
    }
    setShowSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  // Reset penalty when password changes
  useEffect(() => {
    if (newPassword.length === 0) {
      setPenalty(false);
      setPenaltyMessage('');
    }
  }, [newPassword]);

  if (showSuccess) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', color: '#00ff00', marginBottom: '1rem' }}>✓</div>
        <h2 style={{ color: '#00ff00', marginBottom: '1rem' }}>Password Changed Successfully!</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginBottom: '1.5rem',
        color: '#667eea'
      }}>
        Change Password
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Current Password Field */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            fontSize: '0.95rem',
            fontWeight: '500',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            Current Password
            <span style={{ 
              marginLeft: '0.5rem',
              fontSize: '0.85rem',
              color: '#ffc107'
            }}>
              (Check your Hint Board for the current password)
            </span>
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              setError('');
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '1rem'
            }}
            required
          />
        </div>

        {/* New Password Field */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            fontSize: '0.95rem',
            fontWeight: '500',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setError('');
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: `1px solid ${
                passwordStrength?.level === 'red' ? '#ff4444' :
                passwordStrength?.level === 'amber' ? '#ffc107' :
                passwordStrength?.level === 'green' ? '#00ff00' :
                'rgba(255, 255, 255, 0.3)'
              }`,
              borderRadius: '8px',
              color: 'white',
              fontSize: '1rem'
            }}
            required
          />
          
          {/* Password Strength Gauge */}
          {newPassword && passwordStrength && (
            <div style={{ marginTop: '0.75rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  flex: 1,
                  height: '8px',
                  background: passwordStrength.level === 'red' ? '#ff4444' :
                              passwordStrength.level === 'amber' ? '#ffc107' :
                              '#00ff00',
                  borderRadius: '4px',
                  transition: 'all 0.3s'
                }} />
                <span style={{
                  fontSize: '0.85rem',
                  color: passwordStrength.level === 'red' ? '#ff4444' :
                         passwordStrength.level === 'amber' ? '#ffc107' :
                         '#00ff00',
                  fontWeight: '600',
                  minWidth: '60px',
                  textAlign: 'right'
                }}>
                  {passwordStrength.level === 'red' ? 'WEAK' :
                   passwordStrength.level === 'amber' ? 'MODERATE' :
                   'STRONG'}
                </span>
              </div>
              <p style={{
                fontSize: '0.85rem',
                color: passwordStrength.level === 'red' ? '#ff4444' :
                       passwordStrength.level === 'amber' ? '#ffc107' :
                       '#00ff00',
                margin: 0
              }}>
                {passwordStrength.message}
              </p>
            </div>
          )}
        </div>

        {/* Confirm New Password Field */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            fontSize: '0.95rem',
            fontWeight: '500',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError('');
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '1rem'
            }}
            required
          />
          {confirmPassword && newPassword && confirmPassword !== newPassword && (
            <p style={{ 
              fontSize: '0.85rem', 
              color: '#ff4444', 
              marginTop: '0.5rem',
              margin: 0
            }}>
              Passwords do not match
            </p>
          )}
        </div>

        {/* Penalty Message */}
        {penalty && penaltyMessage && (
          <div style={{
            padding: '1rem',
            background: passwordStrength?.level === 'red' ? 'rgba(255, 68, 68, 0.1)' : 'rgba(255, 193, 7, 0.1)',
            border: `1px solid ${passwordStrength?.level === 'red' ? '#ff4444' : '#ffc107'}`,
            borderRadius: '8px',
            color: passwordStrength?.level === 'red' ? '#ff4444' : '#ffc107'
          }}>
            {penaltyMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '1rem',
            background: 'rgba(255, 68, 68, 0.1)',
            border: '1px solid #ff4444',
            borderRadius: '8px',
            color: '#ff4444'
          }}>
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            type="submit"
            className="panel-action"
            style={{
              flex: 1,
              background: '#667eea',
              padding: '0.75rem 2rem',
              fontSize: '1rem'
            }}
          >
            Change Password
          </button>
          <button
            type="button"
            className="panel-action"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '0.75rem 2rem',
              fontSize: '1rem'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

