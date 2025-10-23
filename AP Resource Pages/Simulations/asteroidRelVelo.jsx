import React, { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';

const Asteroid = ({ size, label }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <radialGradient id={`asteroidGrad-${label}`} cx="35%" cy="35%">
          <stop offset="0%" style={{ stopColor: '#8B7355', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#6B5644', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4A3F35', stopOpacity: 1 }} />
        </radialGradient>
      </defs>
      {/* Main asteroid body - irregular shape */}
      <path
        d="M50,10 L65,15 L80,25 L90,45 L85,65 L70,85 L45,90 L25,85 L12,70 L10,50 L15,30 L30,15 Z"
        fill={`url(#asteroidGrad-${label})`}
        stroke="#3A2F25"
        strokeWidth="2"
      />
      {/* Craters */}
      <circle cx="35" cy="30" r="8" fill="#5A4A3A" opacity="0.7" />
      <circle cx="60" cy="45" r="6" fill="#5A4A3A" opacity="0.7" />
      <circle cx="45" cy="65" r="5" fill="#5A4A3A" opacity="0.6" />
      <circle cx="25" cy="55" r="4" fill="#5A4A3A" opacity="0.6" />
      <circle cx="70" cy="30" r="4" fill="#5A4A3A" opacity="0.5" />
      {/* Label */}
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fill="white"
        fontSize="32"
        fontWeight="bold"
        fontFamily="Arial"
      >
        {label}
      </text>
    </svg>
  );
};

export default function AsteroidSimulation() {
  const [referenceFrame, setReferenceFrame] = useState('earth');
  const [selectedToward, setSelectedToward] = useState([]);
  const [selectedAway, setSelectedAway] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [time, setTime] = useState(0);
  const [showVectors, setShowVectors] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Detect theme from document or localStorage
    const theme = document.documentElement.getAttribute('data-theme') ||
                  localStorage.getItem('theme') || 'light';
    setIsDarkMode(theme === 'dark');

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setIsDarkMode(currentTheme === 'dark');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);
  
  const objects = [
    { id: 'A', velocity: 600, size: 40, label: 'A' },
    { id: 'B', velocity: 700, size: 25, label: 'B' },
    { id: 'C', velocity: 800, size: 30, label: 'C' },
    { id: 'D', velocity: 400, size: 35, label: 'D' },
    { id: 'spaceship', velocity: 600, size: 50, label: 'Spaceship' },
    { id: 'E', velocity: 400, size: 30, label: 'E' }
  ];
  
  const spaceshipVelocity = 600;
  const correctToward = ['B', 'C', 'E'];
  const correctAway = ['D'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => (t + 0.01) % 10);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  const getPosition = (obj) => {
    const basePosition = objects.indexOf(obj) * 15 + 5;
    
    if (referenceFrame === 'earth') {
      return basePosition + (obj.velocity * time * 0.01);
    } else {
      const relativeVelocity = obj.velocity - spaceshipVelocity;
      return basePosition + (relativeVelocity * time * 0.01);
    }
  };
  
  const getVectorLength = (velocity) => {
    // Scale velocity to arrow length (max 100px for 800 m/s)
    const baseLength = Math.abs(velocity) / 8;
    return Math.max(baseLength, 10); // Minimum length of 10px
  };
  
  const getVectorColor = (velocity) => {
    if (velocity > 0) return isDarkMode ? '#66800B' : '#879A39'; // Flexoki green
    if (velocity < 0) return isDarkMode ? '#AF3029' : '#D14D41'; // Flexoki red
    return isDarkMode ? '#847759' : '#9C8F70'; // Flexoki base for zero
  };
  
  const toggleSelection = (list, setList, id) => {
    if (list.includes(id)) {
      setList(list.filter(item => item !== id));
    } else {
      setList([...list, id]);
    }
  };
  
  const checkAnswers = () => {
    setShowAnswer(true);
  };
  
  const resetAnswers = () => {
    setSelectedToward([]);
    setSelectedAway([]);
    setShowAnswer(false);
  };
  
  const getRelativeVelocity = (velocity) => {
    return velocity - spaceshipVelocity;
  };
  
  const asteroids = objects.filter(obj => obj.id !== 'spaceship');
  
  // Flexoki color definitions
  const colors = {
    bg: isDarkMode ? '#100F0F' : '#FFFCF0',
    bgSecondary: isDarkMode ? '#1C1B1A' : '#F2F0E5',
    bgTertiary: isDarkMode ? '#343331' : '#EFEBD4',
    text: isDarkMode ? '#FFFCF0' : '#100F0F',
    textSecondary: isDarkMode ? '#DAD4BA' : '#6F6144',
    textMuted: isDarkMode ? '#B5A988' : '#847759',
    border: isDarkMode ? '#403E39' : '#DAD4BA',
    accentBlue: isDarkMode ? '#205EA6' : '#4385BE',
    accentBlueHover: isDarkMode ? '#4385BE' : '#205EA6',
    accentPurple: isDarkMode ? '#5E409D' : '#8B7EC8',
    accentPurpleHover: isDarkMode ? '#8B7EC8' : '#5E409D',
    accentGreen: isDarkMode ? '#66800B' : '#879A39',
    accentGreenHover: isDarkMode ? '#879A39' : '#66800B',
    success: isDarkMode ? '#66800B' : '#879A39',
    error: isDarkMode ? '#AF3029' : '#D14D41',
    warning: isDarkMode ? '#BC5215' : '#DA702C',
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 rounded-lg" style={{
      backgroundColor: colors.bg,
      color: colors.text
    }}>
      <h1 className="text-3xl font-bold mb-4 text-center" style={{ color: colors.text }}>
        Relative Velocity Simulation
      </h1>

      <p className="mb-6 text-center" style={{ color: colors.textSecondary }}>
        Five asteroids and a spaceship are all moving away from Earth.
        Determine which asteroids are moving toward or away from the spaceship.
      </p>
      
      {/* Reference Frame Toggle */}
      <div className="mb-6 flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => setReferenceFrame('earth')}
          className="px-6 py-2 rounded-lg font-semibold transition-colors"
          style={{
            backgroundColor: referenceFrame === 'earth' ? colors.accentBlue : colors.bgTertiary,
            color: referenceFrame === 'earth' ? colors.bg : colors.textSecondary,
            border: `1px solid ${referenceFrame === 'earth' ? colors.accentBlue : colors.border}`
          }}
        >
          Earth's Reference Frame
        </button>
        <button
          onClick={() => setReferenceFrame('spaceship')}
          className="px-6 py-2 rounded-lg font-semibold transition-colors"
          style={{
            backgroundColor: referenceFrame === 'spaceship' ? colors.accentPurple : colors.bgTertiary,
            color: referenceFrame === 'spaceship' ? colors.bg : colors.textSecondary,
            border: `1px solid ${referenceFrame === 'spaceship' ? colors.accentPurple : colors.border}`
          }}
        >
          Spaceship's Reference Frame
        </button>
        <button
          onClick={() => setShowVectors(!showVectors)}
          className="px-6 py-2 rounded-lg font-semibold transition-colors"
          style={{
            backgroundColor: showVectors ? colors.accentGreen : colors.bgTertiary,
            color: showVectors ? colors.bg : colors.textSecondary,
            border: `1px solid ${showVectors ? colors.accentGreen : colors.border}`
          }}
        >
          {showVectors ? 'Hide' : 'Show'} Velocity Vectors
        </button>
      </div>
      
      {/* Visualization Area */}
      <div className="relative h-64 rounded-lg mb-6 overflow-hidden" style={{
        backgroundColor: colors.bgSecondary,
        border: `2px solid ${colors.border}`
      }}>
        <div className="absolute top-4 left-4 text-sm" style={{ color: colors.textMuted }}>
          {referenceFrame === 'earth' ? 'Viewing from Earth →' : 'Viewing from Spaceship'}
        </div>
        
        {objects.map((obj) => {
          const position = getPosition(obj);
          const displayVelocity = referenceFrame === 'earth' 
            ? obj.velocity 
            : getRelativeVelocity(obj.velocity);
          
          const vectorLength = getVectorLength(displayVelocity);
          const vectorColor = getVectorColor(displayVelocity);
          
          return (
            <div
              key={obj.id}
              className="absolute transition-all duration-50"
              style={{
                left: `${position}%`,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              {obj.id === 'spaceship' ? (
                <div className="flex flex-col items-center relative">
                  <Rocket className="text-yellow-400" size={obj.size} />
                  {showVectors && (
                    <svg 
                      className="absolute" 
                      style={{ 
                        left: obj.size / 2, 
                        top: '50%',
                        transform: 'translateY(-50%)',
                        overflow: 'visible'
                      }}
                      width={vectorLength + 20}
                      height="20"
                    >
                      {displayVelocity !== 0 && (
                        <>
                          <defs>
                            <marker
                              id={`arrowhead-${obj.id}`}
                              markerWidth="10"
                              markerHeight="10"
                              refX="9"
                              refY="3"
                              orient="auto"
                            >
                              <polygon
                                points="0 0, 10 3, 0 6"
                                fill={vectorColor}
                              />
                            </marker>
                          </defs>
                          <line
                            x1="5"
                            y1="10"
                            x2={vectorLength + 5}
                            y2="10"
                            stroke={vectorColor}
                            strokeWidth="3"
                            markerEnd={`url(#arrowhead-${obj.id})`}
                          />
                        </>
                      )}
                      {displayVelocity === 0 && (
                        <circle cx="10" cy="10" r="4" fill={vectorColor} />
                      )}
                    </svg>
                  )}
                  <div className="text-xs mt-1 px-2 py-1 rounded" style={{
                    backgroundColor: isDarkMode ? '#AD8301' : '#D0A215',
                    color: colors.bg
                  }}>
                    {displayVelocity} m/s
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center relative">
                  <Asteroid size={obj.size} label={obj.label} />
                  {showVectors && (
                    <svg 
                      className="absolute" 
                      style={{ 
                        left: obj.size / 2, 
                        top: '50%',
                        transform: 'translateY(-50%)',
                        overflow: 'visible'
                      }}
                      width={Math.abs(displayVelocity) > 0 ? vectorLength + 20 : 30}
                      height="20"
                    >
                      {displayVelocity > 0 && (
                        <>
                          <defs>
                            <marker
                              id={`arrowhead-${obj.id}`}
                              markerWidth="10"
                              markerHeight="10"
                              refX="9"
                              refY="3"
                              orient="auto"
                            >
                              <polygon
                                points="0 0, 10 3, 0 6"
                                fill={vectorColor}
                              />
                            </marker>
                          </defs>
                          <line
                            x1="5"
                            y1="10"
                            x2={vectorLength + 5}
                            y2="10"
                            stroke={vectorColor}
                            strokeWidth="3"
                            markerEnd={`url(#arrowhead-${obj.id})`}
                          />
                        </>
                      )}
                      {displayVelocity < 0 && (
                        <>
                          <defs>
                            <marker
                              id={`arrowhead-${obj.id}`}
                              markerWidth="10"
                              markerHeight="10"
                              refX="1"
                              refY="3"
                              orient="auto"
                            >
                              <polygon
                                points="10 0, 0 3, 10 6"
                                fill={vectorColor}
                              />
                            </marker>
                          </defs>
                          <line
                            x1={vectorLength + 5}
                            y1="10"
                            x2="5"
                            y2="10"
                            stroke={vectorColor}
                            strokeWidth="3"
                            markerEnd={`url(#arrowhead-${obj.id})`}
                          />
                        </>
                      )}
                      {displayVelocity === 0 && (
                        <circle cx="10" cy="10" r="4" fill={vectorColor} />
                      )}
                    </svg>
                  )}
                  <div className="text-xs mt-1 px-2 py-1 rounded" style={{
                    backgroundColor: colors.bgTertiary,
                    color: colors.text,
                    border: `1px solid ${colors.border}`
                  }}>
                    {displayVelocity > 0 ? '+' : ''}{displayVelocity} m/s
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Vector Legend */}
      {showVectors && (
        <div className="mb-6 p-4 rounded-lg" style={{
          backgroundColor: colors.bgSecondary,
          border: `1px solid ${colors.border}`
        }}>
          <h3 className="text-sm font-semibold mb-2" style={{ color: colors.text }}>
            Velocity Vector Legend:
          </h3>
          <div className="flex gap-6 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <svg width="40" height="20">
                <defs>
                  <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill={colors.success} />
                  </marker>
                </defs>
                <line x1="2" y1="10" x2="32" y2="10" stroke={colors.success} strokeWidth="3" markerEnd="url(#arrow-green)" />
              </svg>
              <span style={{ color: colors.success }}>Moving Right (Positive velocity)</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="40" height="20">
                <defs>
                  <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="1" refY="3" orient="auto">
                    <polygon points="8 0, 0 3, 8 6" fill={colors.error} />
                  </marker>
                </defs>
                <line x1="32" y1="10" x2="2" y2="10" stroke={colors.error} strokeWidth="3" markerEnd="url(#arrow-red)" />
              </svg>
              <span style={{ color: colors.error }}>Moving Left (Negative velocity)</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="40" height="20">
                <circle cx="20" cy="10" r="4" fill={colors.textMuted} />
              </svg>
              <span style={{ color: colors.textMuted }}>Stationary (Zero velocity)</span>
            </div>
          </div>
          <p className="text-xs mt-2" style={{ color: colors.textMuted }}>
            Note: Arrow length is proportional to speed (longer = faster)
          </p>
        </div>
      )}
      
      {/* Velocity Table */}
      <div className="mb-6 p-4 rounded-lg" style={{
        backgroundColor: colors.bgSecondary,
        border: `1px solid ${colors.border}`
      }}>
        <h3 className="text-lg font-semibold mb-3" style={{ color: colors.text }}>
          Velocities (as measured from Earth)
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          {objects.map(obj => (
            <div key={obj.id} className="p-2 rounded" style={{
              backgroundColor: colors.bgTertiary,
              border: `1px solid ${colors.border}`
            }}>
              <div className="font-bold" style={{ color: colors.text }}>{obj.label}</div>
              <div className="text-sm" style={{ color: colors.textSecondary }}>{obj.velocity} m/s</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Question Section */}
      <div className="p-6 rounded-lg mb-6" style={{
        backgroundColor: colors.bgSecondary,
        border: `1px solid ${colors.border}`
      }}>
        <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
          Answer the Questions:
        </h3>

        <div className="mb-4">
          <p className="font-semibold mb-2" style={{ color: colors.text }}>
            1. Which asteroids are moving TOWARD the spaceship?
          </p>
          <div className="flex gap-2">
            {asteroids.map(obj => (
              <button
                key={obj.id}
                onClick={() => toggleSelection(selectedToward, setSelectedToward, obj.id)}
                className="px-4 py-2 rounded-lg font-semibold transition-colors"
                style={{
                  backgroundColor: selectedToward.includes(obj.id) ? colors.accentGreen : colors.bgTertiary,
                  color: selectedToward.includes(obj.id) ? colors.bg : colors.textSecondary,
                  border: `1px solid ${selectedToward.includes(obj.id) ? colors.accentGreen : colors.border}`
                }}
              >
                {obj.label}
              </button>
            ))}
          </div>
          {showAnswer && (
            <div className="mt-2 p-2 rounded" style={{
              backgroundColor: JSON.stringify(selectedToward.sort()) === JSON.stringify(correctToward.sort())
                ? (isDarkMode ? 'rgba(102, 128, 11, 0.2)' : 'rgba(135, 154, 57, 0.2)')
                : (isDarkMode ? 'rgba(175, 48, 41, 0.2)' : 'rgba(209, 77, 65, 0.2)'),
              color: JSON.stringify(selectedToward.sort()) === JSON.stringify(correctToward.sort())
                ? colors.success
                : colors.error,
              border: `1px solid ${JSON.stringify(selectedToward.sort()) === JSON.stringify(correctToward.sort()) ? colors.success : colors.error}`
            }}>
              {JSON.stringify(selectedToward.sort()) === JSON.stringify(correctToward.sort())
                ? '✓ Correct! B and C (behind spaceship, moving faster) and E (ahead of spaceship, moving slower) are all moving toward the spaceship.'
                : `✗ Incorrect. The correct answer is B, C, and E. B and C catch up from behind; the spaceship catches up to E from behind.`}
            </div>
          )}
        </div>

        <div className="mb-4">
          <p className="font-semibold mb-2" style={{ color: colors.text }}>
            2. Which asteroids are moving AWAY from the spaceship?
          </p>
          <div className="flex gap-2">
            {asteroids.map(obj => (
              <button
                key={obj.id}
                onClick={() => toggleSelection(selectedAway, setSelectedAway, obj.id)}
                className="px-4 py-2 rounded-lg font-semibold transition-colors"
                style={{
                  backgroundColor: selectedAway.includes(obj.id) ? colors.error : colors.bgTertiary,
                  color: selectedAway.includes(obj.id) ? colors.bg : colors.textSecondary,
                  border: `1px solid ${selectedAway.includes(obj.id) ? colors.error : colors.border}`
                }}
              >
                {obj.label}
              </button>
            ))}
          </div>
          {showAnswer && (
            <div className="mt-2 p-2 rounded" style={{
              backgroundColor: JSON.stringify(selectedAway.sort()) === JSON.stringify(correctAway.sort())
                ? (isDarkMode ? 'rgba(102, 128, 11, 0.2)' : 'rgba(135, 154, 57, 0.2)')
                : (isDarkMode ? 'rgba(175, 48, 41, 0.2)' : 'rgba(209, 77, 65, 0.2)'),
              color: JSON.stringify(selectedAway.sort()) === JSON.stringify(correctAway.sort())
                ? colors.success
                : colors.error,
              border: `1px solid ${JSON.stringify(selectedAway.sort()) === JSON.stringify(correctAway.sort()) ? colors.success : colors.error}`
            }}>
              {JSON.stringify(selectedAway.sort()) === JSON.stringify(correctAway.sort())
                ? '✓ Correct! Only D is moving away from the spaceship.'
                : `✗ Incorrect. The correct answer is D. It's behind the spaceship and moving slower, so it falls further behind!`}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={checkAnswers}
            className="px-6 py-2 rounded-lg font-semibold transition-colors"
            style={{
              backgroundColor: colors.accentBlue,
              color: colors.bg,
              border: `1px solid ${colors.accentBlue}`
            }}
          >
            Check Answers
          </button>
          <button
            onClick={resetAnswers}
            className="px-6 py-2 rounded-lg font-semibold transition-colors"
            style={{
              backgroundColor: colors.bgTertiary,
              color: colors.textSecondary,
              border: `1px solid ${colors.border}`
            }}
          >
            Reset
          </button>
        </div>
      </div>
      
      {/* Explanation */}
      {showAnswer && (
        <div className="p-6 rounded-lg" style={{
          backgroundColor: isDarkMode ? 'rgba(32, 94, 166, 0.2)' : 'rgba(67, 133, 190, 0.2)',
          border: `1px solid ${colors.accentBlue}`
        }}>
          <h3 className="text-xl font-semibold mb-3" style={{ color: colors.text }}>
            Explanation:
          </h3>
          <p className="mb-3" style={{ color: colors.textSecondary }}>
            Even though all objects are moving away from Earth, whether they're moving toward or away from the spaceship depends on BOTH their position relative to the spaceship AND their velocity.
          </p>
          <p className="mb-3" style={{
            color: isDarkMode ? '#D0A215' : '#AD8301',
            fontWeight: '600'
          }}>
            💡 <strong>Key Concept:</strong> "Moving toward" means the distance between objects is DECREASING. "Moving away" means the distance is INCREASING.
          </p>
          <ul className="list-disc list-inside space-y-2" style={{ color: colors.textSecondary }}>
            <li><strong>Asteroid B (700 m/s):</strong> Behind spaceship and faster (700 &gt; 600) → B catches up → Moving TOWARD ✓</li>
            <li><strong>Asteroid C (800 m/s):</strong> Behind spaceship and faster (800 &gt; 600) → C catches up → Moving TOWARD ✓</li>
            <li><strong>Asteroid E (400 m/s):</strong> Ahead of spaceship and slower (400 &lt; 600) → Spaceship catches up to E → Moving TOWARD ✓</li>
            <li><strong>Asteroid D (400 m/s):</strong> Behind spaceship and slower (400 &lt; 600) → D falls further behind → Moving AWAY ✓</li>
            <li><strong>Asteroid A (600 m/s):</strong> Same speed as spaceship → Stays at constant distance (neither toward nor away)</li>
          </ul>
          <p className="mt-4" style={{
            color: isDarkMode ? '#D0A215' : '#AD8301',
            fontWeight: '600'
          }}>
            💡 In the spaceship's reference frame: B and C have positive velocities (catching up from behind), E has negative velocity (spaceship approaching it), and D has negative velocity (falling behind appears as backward motion).
          </p>
        </div>
      )}
    </div>
  );
}