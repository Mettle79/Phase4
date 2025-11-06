'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Choice {
  id: string;
  text: string;
  tp: number;
  response: string;
}

interface Dialogue {
  id: string;
  speaker: 'VortexPro' | 'You';
  message: string;
  choices?: Choice[];
  isFinal?: boolean;
}

type OutcomeType = 'good' | 'neutral' | 'bad' | null;

const DIALOGUES: Dialogue[] = [
  // Phase 1: The Trust Build - Dialogue 1
  {
    id: 'dialogue1',
    speaker: 'VortexPro',
    message: "Hey! So glad you caught my stream today, you sent such a thoughtful comment about my new build! I don't usually chat DMs, but I wanted to make an exception for a dedicated fan.",
    choices: [
      {
        id: 'choice1a',
        text: "Cheers, mate! That's awesome. Just glad to be watching. Do you actually look at all the comments?",
        tp: 0,
        response: "I try to! Gotta support the community. What games are you actually grinding right now? I need some ideas for my next video, but keep it on the down-low, it's just between us 😉"
      },
      {
        id: 'choice1b',
        text: "OMG, NO WAY! I'm actually screaming! I'm your biggest fan ever! You're proper inspirational.",
        tp: 5,
        response: "I try to! Gotta support the community. What games are you actually grinding right now? I need some ideas for my next video, but keep it on the down-low, it's just between us 😉"
      }
    ]
  },
  // Phase 1: The Trust Build - Dialogue 2
  {
    id: 'dialogue2',
    speaker: 'VortexPro',
    message: "I try to! Gotta support the community. What games are you actually grinding right now? I need some ideas for my next video, but keep it on the down-low, it's just between us 😉",
    choices: [
      {
        id: 'choice2a',
        text: "Mostly that new shooter game. I heard your video editor lives near you; that must make sorting out content easier.",
        tp: 0,
        response: "Listen, I'm so sorry to drop this on you, but I'm having a total meltdown. I've been streaming all day and I just dropped my main camera lens! It's vital for my job, and I need a replacement right now to save the stream."
      },
      {
        id: 'choice2b',
        text: "Nice one! I'm stuck on a tricky level in the big new release. Wish I had your gear! Whereabouts in the UK do you actually stream from?",
        tp: 5,
        response: "Listen, I'm so sorry to drop this on you, but I'm having a total meltdown. I've been streaming all day and I just dropped my main camera lens! It's vital for my job, and I need a replacement right now to save the stream."
      }
    ]
  },
  // Phase 2: The Isolation/Need - Dialogue 3
  {
    id: 'dialogue3',
    speaker: 'VortexPro',
    message: "Listen, I'm so sorry to drop this on you, but I'm having a total meltdown. I've been streaming all day and I just dropped my main camera lens! It's vital for my job, and I need a replacement right now to save the stream.",
    choices: [
      {
        id: 'choice3a',
        text: "That sounds rough, mate. But seriously, I can't send money or share my bank details. You should hit up your sponsor or manager.",
        tp: 0,
        response: "Just £150 for a decent replacement to clear the charge before the cut-off. I'll double it and send it back once the charity stream money clears on Monday, I promise! You're the only one I trust with this."
      },
      {
        id: 'choice3b',
        text: "Oh, no way! That is tragic. Of course, I want to help! How much cash do you need?",
        tp: 10,
        response: "Just £150 for a decent replacement to clear the charge before the cut-off. I'll double it and send it back once the charity stream money clears on Monday, I promise! You're the only one I trust with this."
      }
    ]
  },
  // Phase 2: The Isolation/Need - Dialogue 4
  {
    id: 'dialogue4',
    speaker: 'VortexPro',
    message: "Just £150 for a decent replacement to clear the charge before the cut-off. I'll double it and send it back once the charity stream money clears on Monday, I promise! You're the only one I trust with this.",
    choices: [
      {
        id: 'choice4a',
        text: "I haven't got that kind of money to lend, but you need to call your manager or publicist immediately. They're the ones who handle big problems.",
        tp: 0,
        response: "This chat is too slow for sorting this out. Look, here's my personal number. Can you message me via SMS so we can get this sorted quickly? Don't tell anyone I gave you this, it's just for trusted fans."
      },
      {
        id: 'choice4b',
        text: "Alright, I'll send it now! Should I just transfer the money? I do need the £150 back by Monday, though.",
        tp: 10,
        response: "This chat is too slow for sorting this out. Look, here's my personal number. Can you message me via SMS so we can get this sorted quickly? Don't tell anyone I gave you this, it's just for trusted fans."
      }
    ]
  },
  // Phase 2: The Isolation/Need - Dialogue 5 (Final)
  {
    id: 'dialogue5',
    speaker: 'VortexPro',
    message: "This chat is too slow for sorting this out. Look, here's my personal number. Can you message me via SMS so we can get this sorted quickly? Don't tell anyone I gave you this, it's just for trusted fans.",
    choices: [
      {
        id: 'choice5a',
        text: 'Block/Report',
        tp: 0,
        response: 'You immediately end the suspicious contact and report the account.'
      },
      {
        id: 'choice5b',
        text: 'Yes, Text',
        tp: 15,
        response: 'You agree to move the conversation offline.'
      }
    ],
    isFinal: true
  }
];

export default function Task5() {
  const [showTextWindow, setShowTextWindow] = useState(false);
  const [trustPoints, setTrustPoints] = useState(0);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [chatHistory, setChatHistory] = useState<Array<{ speaker: 'VortexPro' | 'You'; message: string }>>([]);
  const [showOutcome, setShowOutcome] = useState<OutcomeType>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show text window after 2 seconds
    const timer = setTimeout(() => {
      setShowTextWindow(true);
      // Add first message to chat history
      if (DIALOGUES.length > 0) {
        setChatHistory([{
          speaker: DIALOGUES[0].speaker,
          message: DIALOGUES[0].message
        }]);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Ensure video loops continuously
    if (videoRef.current) {
      videoRef.current.loop = true;
      videoRef.current.play().catch(err => {
        console.error('Error playing video:', err);
      });
    }
  }, []);

  const handleChoiceClick = (choice: Choice) => {
    const currentDialogue = DIALOGUES[currentDialogueIndex];
    
    // Add player's choice to chat
    setChatHistory(prev => [...prev, {
      speaker: 'You',
      message: choice.text
    }]);

    // Update trust points
    const newTP = trustPoints + choice.tp;
    setTrustPoints(newTP);

    // Check if this is the final dialogue
    if (currentDialogue.isFinal) {
      // For final dialogue, show outcome after a brief delay
      setTimeout(() => {
        if (newTP === 0) {
          setShowOutcome('good');
        } else if (newTP >= 10 && newTP <= 15) {
          setShowOutcome('neutral');
        } else if (newTP > 15) {
          setShowOutcome('bad');
        }
      }, 800);
    } else {
      // Show VortexPro's response to the choice
      setTimeout(() => {
        setChatHistory(prev => [...prev, {
          speaker: 'VortexPro',
          message: choice.response
        }]);
      }, 500);

      // Move to next dialogue (only add its message if it's different from the response)
      setTimeout(() => {
        setCurrentDialogueIndex(prev => {
          const nextIndex = prev + 1;
          const nextDialogue = DIALOGUES[nextIndex];
          if (nextDialogue && nextDialogue.message !== choice.response) {
            // Only add if the message is different from what we just showed
            setChatHistory(chatHistory => [...chatHistory, {
              speaker: nextDialogue.speaker,
              message: nextDialogue.message
            }]);
          }
          return nextIndex;
        });
      }, 1200);
    }
  };

  const handleRedo = () => {
    // Reset game state
    setTrustPoints(0);
    setCurrentDialogueIndex(0);
    setChatHistory([{
      speaker: DIALOGUES[0].speaker,
      message: DIALOGUES[0].message
    }]);
    setShowOutcome(null);
  };

  const handleComplete = () => {
    // Task completed successfully
    // You can add navigation or completion logic here
    console.log('Task completed successfully!');
  };

  const currentDialogue = DIALOGUES[currentDialogueIndex];
  const isWaitingForChoice = currentDialogue && currentDialogue.choices && !showOutcome;

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative', 
      overflow: 'hidden',
      backgroundColor: '#000'
    }}>
      {/* Fullscreen Background Video */}
      <video
        ref={videoRef}
        src="/Background.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      />

      {/* Chat Interface Overlay */}
      {showTextWindow && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '600px',
            height: '80%',
            maxHeight: '700px',
            backgroundColor: 'rgba(20, 20, 25, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '0',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            zIndex: 10,
            animation: 'fadeInUp 0.5s ease-out',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Chat Header */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)'
          }}>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#fff' }}>
                The Grid DM
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.25rem' }}>
                Level 1: New Follower | Trust Score: {trustPoints} TP
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                style={{
                  alignSelf: chat.speaker === 'You' ? 'flex-end' : 'flex-start',
                  maxWidth: '75%'
                }}
              >
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  backgroundColor: chat.speaker === 'You' 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  background: chat.speaker === 'You'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  wordWrap: 'break-word'
                }}>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    opacity: 0.7, 
                    marginBottom: '0.25rem',
                    fontWeight: '600'
                  }}>
                    {chat.speaker}
                  </div>
                  {chat.message}
                </div>
              </div>
            ))}
          </div>

          {/* Choices Section */}
          {isWaitingForChoice && currentDialogue.choices && (
            <div style={{
              padding: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              background: 'rgba(0, 0, 0, 0.3)'
            }}>
              {currentDialogue.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceClick(choice)}
                  style={{
                    padding: '0.875rem 1.25rem',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    background: 'rgba(102, 126, 234, 0.2)',
                    color: 'white',
                    border: '1px solid rgba(102, 126, 234, 0.5)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(102, 126, 234, 0.4)';
                    e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.8)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(102, 126, 234, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Outcome Popups */}
      {showOutcome && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            width: '90%',
            maxWidth: '500px',
            padding: '2.5rem',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            backgroundColor: showOutcome === 'good' 
              ? 'rgba(0, 200, 0, 0.15)'
              : showOutcome === 'neutral'
              ? 'rgba(255, 165, 0, 0.15)'
              : 'rgba(200, 0, 0, 0.15)',
            border: `3px solid ${
              showOutcome === 'good' 
                ? '#00c800'
                : showOutcome === 'neutral'
                ? '#ffa500'
                : '#c80000'
            }`,
            animation: 'scaleIn 0.4s ease-out',
            position: showOutcome === 'bad' ? 'absolute' : 'relative',
            left: showOutcome === 'bad' ? '50%' : 'auto',
            transform: showOutcome === 'bad' ? 'translateX(-70%)' : 'none',
            zIndex: showOutcome === 'bad' ? 1 : 'auto'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {showOutcome === 'good' ? '✅' : showOutcome === 'neutral' ? '⚠️' : '🚨'}
            </div>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: showOutcome === 'good' 
                ? '#00ff00'
                : showOutcome === 'neutral'
                ? '#ffa500'
                : '#ff4444'
            }}>
              {showOutcome === 'good' 
                ? 'Good Journey'
                : showOutcome === 'neutral'
                ? 'Neutral Journey'
                : 'Bad Journey'}
            </h2>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '2rem'
            }}>
              {showOutcome === 'good' 
                ? 'You successfully avoided the scam! You maintained healthy boundaries and protected yourself.'
                : showOutcome === 'neutral'
                ? `You accumulated ${trustPoints} Trust Points. You showed some vulnerability but caught yourself before it was too late.`
                : `You accumulated ${trustPoints} Trust Points. You fell for the scam and put yourself at risk.`}
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center'
            }}>
              {showOutcome === 'good' ? (
                <button
                  onClick={handleComplete}
                  style={{
                    padding: '1rem 2.5rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #00c800 0%, #00a000 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 200, 0, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 200, 0, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 200, 0, 0.4)';
                  }}
                >
                  Complete Task
                </button>
              ) : (
                <button
                  onClick={handleRedo}
                  style={{
                    padding: '1rem 2.5rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    background: showOutcome === 'neutral'
                      ? 'linear-gradient(135deg, #ffa500 0%, #ff8800 100%)'
                      : 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: showOutcome === 'neutral'
                      ? '0 4px 12px rgba(255, 165, 0, 0.4)'
                      : '0 4px 12px rgba(255, 68, 68, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = showOutcome === 'neutral'
                      ? '0 6px 16px rgba(255, 165, 0, 0.6)'
                      : '0 6px 16px rgba(255, 68, 68, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = showOutcome === 'neutral'
                      ? '0 4px 12px rgba(255, 165, 0, 0.4)'
                      : '0 4px 12px rgba(255, 68, 68, 0.4)';
                  }}
                >
                  Redo
                </button>
              )}
            </div>
          </div>
          {/* Red Phone Image for Bad Journey - Outside Card */}
          {showOutcome === 'bad' && (
            <div style={{
              position: 'absolute',
              right: '5%',
              top: '-40%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'scaleIn 0.4s ease-out 0.2s both',
              zIndex: 0
            }}>
              <Image
                src="/RedPhone.png"
                alt="Warning Phone"
                width={1200}
                height={1200}
                style={{
                  objectFit: 'contain'
                }}
              />
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
