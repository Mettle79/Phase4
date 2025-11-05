'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Thermometer from '@/components/Thermometer';
import ClickableMessage from '@/components/ClickableMessage';

const TOTAL_RED_FLAGS_PHONE1 = 4;
const TOTAL_RED_FLAGS_PHONE2 = 4;
const TOTAL_RED_FLAGS_PHONE3 = 3;

// Phone1 Red Flags
const PHONE1_RED_FLAGS = [
  {
    id: 1,
    text: "Hi Alex, we're hiring Financial Processors...",
    description: "Vague Job Description",
    searchText: "We're hiring Financial Processors",
    searchTextLower: "we're hiring financial processors"
  },
  {
    id: 2,
    text: "Earn up to £5,000 weekly for part-time work, no experience needed.",
    description: "High Pay for Low Effort",
    searchText: "Earn up to £5,000 weekly for part-time work, no experience needed.",
    searchTextLower: "earn up to £5,000 weekly for part-time work, no experience needed."
  },
  {
    id: 3,
    text: "use your personal bank account for transactions.",
    description: "Use of Personal Accounts",
    searchText: "use your personal bank account for transactions.",
    searchTextLower: "use your personal bank account for transactions."
  },
  {
    id: 4,
    text: "reply with your bank name and full details ASAP to get started this week.",
    description: "Urgency/Pressure",
    searchText: "reply with your bank name and full details ASAP to get started this week.",
    searchTextLower: "reply with your bank name and full details asap to get started this week."
  }
];

// Phone2 Red Flags
const PHONE2_RED_FLAGS = [
  {
    id: 1,
    text: "Great! The funds are in.",
    description: "Unexpected, unsolicited funds",
    searchText: "Great! The funds are in",
    searchTextLower: "great! the funds are in"
  },
  {
    id: 2,
    text: "£5059",
    description: "Suspiciously large, rounded amount",
    searchText: "(£5059)",
    searchTextLower: "(£5059)"
  },
  {
    id: 3,
    text: "Keep your 15% commission (£727.50).",
    description: "The bribe/payment for illegal activity",
    searchText: "Keep your 15% commission",
    searchTextLower: "keep your 15% commission"
  },
  {
    id: 4,
    text: "Now, IMMEDIATELY transfer the remaining £4,122.50",
    description: "Extreme Urgency/Pressure",
    searchText: "Now, IMMEDIATELY transfer the remaining £4,122.50",
    searchTextLower: "now, immediately transfer the remaining £4,122.50"
  }
];

const PHONE1_MESSAGE = "Hi Alex. We're hiring Financial Processors for easy WFH tasks. Earn up to £5,000 weekly for part-time work, no experience needed.\n\nYour main duty will be to receive and transfer funds for international clients. You'll need to use your personal bank account for transactions.\n\nThis is a limited offer! Please reply with your bank name and full details ASAP to get started this week.";

const PHONE2_MESSAGE = "Great! The funds are in (£5059).  This is the first client payment.  Keep your 15% commission Now, IMMEDIATELY transfer the remaining £4,122.50 as per instructions in the next message.";

// Phone3 Red Flags
const PHONE3_RED_FLAGS = [
  {
    id: 1,
    text: "New Balance: £936.50",
    description: "The fact that most of the money has gone, but the 'commission' remains",
    searchText: "New Balance: £936.50",
    searchTextLower: "new balance: £936.50"
  },
  {
    id: 2,
    text: "Thank you for the fast and professional service. Enjoy your commission.",
    description: "False praise/validation to lower guard",
    searchText: "Thank you for the fast and professional service. Enjoy your commission.",
    searchTextLower: "thank you for the fast and professional service. enjoy your commission."
  },
  {
    id: 3,
    text: "We have another urgent transfer coming tomorrow morning. Please be ready!",
    description: "Re-engagement for repeated money muling",
    searchText: "We have another urgent transfer coming tomorrow morning.  Please be ready!",
    searchTextLower: "we have another urgent transfer coming tomorrow morning.  please be ready!"
  }
];

const PHONE3_MESSAGE = "Thank you for the fast and professional service. Enjoy your commission. We have another urgent transfer coming tomorrow morning.  Please be ready!\n\nNew Balance: £936.50";

export default function Task4() {
  const [clickedFlags, setClickedFlags] = useState<Set<number>>(new Set());
  const [currentPhone, setCurrentPhone] = useState(1); // Start with Phone1
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleRedFlagClick = (flagId: number) => {
    setClickedFlags(prev => {
      const newSet = new Set(prev);
      newSet.add(flagId);
      return newSet;
    });
  };

  const getTotalRedFlags = () => {
    if (currentPhone === 1) return TOTAL_RED_FLAGS_PHONE1;
    if (currentPhone === 2) return TOTAL_RED_FLAGS_PHONE2;
    return TOTAL_RED_FLAGS_PHONE3;
  };

  const handleNext = () => {
    const totalFlags = getTotalRedFlags();
    if (clickedFlags.size === totalFlags) {
      if (currentPhone === 1) {
        // Move to Phone2
        setCurrentPhone(2);
        setClickedFlags(new Set());
      } else if (currentPhone === 2) {
        // Move to Phone3
        setCurrentPhone(3);
        setClickedFlags(new Set());
      } else if (currentPhone === 3) {
        // Phone3 is complete - play video
        setShowVideo(true);
        // Play video after a brief delay to ensure it's rendered
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play();
          }
        }, 100);
      }
    }
  };

  const totalFlags = getTotalRedFlags();
  const allFlagsClicked = clickedFlags.size === totalFlags;

  return (
    <main className="main-container">
      {showVideo && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <video
            ref={videoRef}
            src="/Task4.mp4"
            controls
            autoPlay
            style={{
              width: '90%',
              height: '90%',
              maxWidth: '1200px',
              maxHeight: '800px'
            }}
            onEnded={() => setShowVideo(false)}
          />
          <button
            onClick={() => setShowVideo(false)}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            Close
          </button>
        </div>
      )}
      <div style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100vh',
        padding: '2rem',
        gap: '2rem',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Phone Image - Position varies by phone */}
        <div 
          key={`phone-${currentPhone}`}
          style={{
            position: 'absolute',
            left: currentPhone === 1 ? '2rem' : currentPhone === 2 ? '60%' : 'auto',
            right: currentPhone === 3 ? '2rem' : 'auto',
            top: currentPhone === 1 ? '45%' : currentPhone === 2 ? '40%' : '45%',
            transform: currentPhone === 1 ? 'translateY(-50%)' : currentPhone === 2 ? 'translate(-50%, -50%)' : 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '225vh',
            width: 'calc(225vh * 9 / 16)',
            minWidth: '1000px',
            zIndex: 1
          }}
        >
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%'
          }}>
            <Image
              src={currentPhone === 1 ? '/Phone1.png' : currentPhone === 2 ? '/Phone2.png' : '/Phone3.png'}
              alt={`Phone ${currentPhone}`}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>

        {/* Message Box - Position varies by phone */}
        <div style={{
          position: 'absolute',
          left: currentPhone === 1 ? '50%' : currentPhone === 3 ? '47%' : '2rem',
          top: '50%',
          transform: (currentPhone === 1 || currentPhone === 3) ? 'translate(-50%, -50%)' : 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40%',
          maxWidth: '600px',
          zIndex: 2
        }}>
          <ClickableMessage
            message={currentPhone === 1 ? PHONE1_MESSAGE : currentPhone === 2 ? PHONE2_MESSAGE : PHONE3_MESSAGE}
            clickedFlags={clickedFlags}
            onRedFlagClick={handleRedFlagClick}
            redFlags={currentPhone === 1 ? PHONE1_RED_FLAGS : currentPhone === 2 ? PHONE2_RED_FLAGS : PHONE3_RED_FLAGS}
          />
        </div>

        {/* Thermometer - Position varies by phone */}
        <div style={{
          position: 'absolute',
          left: currentPhone === 3 ? '6rem' : 'auto',
          right: currentPhone === 3 ? 'auto' : '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20%',
          maxWidth: '250px',
          gap: '2rem',
          zIndex: 2
        }}>
          <Thermometer
            progress={(clickedFlags.size / totalFlags) * 100}
            totalFlags={totalFlags}
            clickedFlags={clickedFlags.size}
          />
          
          {/* Next/Done Button */}
          <button
            onClick={handleNext}
            disabled={!allFlagsClicked}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              fontWeight: '600',
              background: allFlagsClicked ? '#667eea' : 'rgba(102, 126, 234, 0.3)',
              color: allFlagsClicked ? 'white' : 'rgba(255, 255, 255, 0.5)',
              border: 'none',
              borderRadius: '12px',
              cursor: allFlagsClicked ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              boxShadow: allFlagsClicked ? '0 4px 12px rgba(102, 126, 234, 0.4)' : 'none'
            }}
          >
            {currentPhone === 3 ? 'Done' : 'Next'}
          </button>
        </div>
      </div>
    </main>
  );
}

