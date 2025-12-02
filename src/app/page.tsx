'use client'

import { useState, useEffect, useRef } from 'react'
import '../styles/Game.css'

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [gameStage, setGameStage] = useState(0) // 0: empty, 1: seed, 2: sprout, 3: bud, 4: bloom
  const [waterProgress, setWaterProgress] = useState(0)
  const [isWatering, setIsWatering] = useState(false)
  const [nailongMessage, setNailongMessage] = useState("Aninn, bantuin Haris dong menyirami bunganya supaya mekarr gampang kok cuma perlu click gambar air dan di tahan yaa 🌹")
  const [showEnding, setShowEnding] = useState(false)
  const [notification, setNotification] = useState("")
  const [waterLevel, setWaterLevel] = useState(0)
  const [messageHidden, setMessageHidden] = useState(false)

  // Audio states
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.1)
  const backgroundMusicRef = useRef<HTMLAudioElement>(null)

  // Ending interaction states
  const [showFirstQuestion, setShowFirstQuestion] = useState(true)
  const [showSecondQuestion, setShowSecondQuestion] = useState(false)
  const [showMeetQuestion, setShowMeetQuestion] = useState(false)
  const [showFinalMessage, setShowFinalMessage] = useState(false)
  const [showPlantAgainMessage, setShowPlantAgainMessage] = useState(false)
  const [plantType, setPlantType] = useState('mawar') // 'mawar' or 'jagung'
  const [errorMessage, setErrorMessage] = useState(false)
  
  // Audio initialization and background music
  useEffect(() => {
    initAudio()
    if (showWelcome) {
      playBackgroundMusic()
    }
  }, [])

  // Handle music for different pages
  useEffect(() => {
    playBackgroundMusic()
  }, [showWelcome, isMuted])

  // Update volume when changed
  useEffect(() => {
    if (backgroundMusicRef.current) backgroundMusicRef.current.volume = volume
  }, [volume])

  // Watering mechanic: Press and hold
  useEffect(() => {
    if (isWatering) {
      const interval = setInterval(() => {
        setWaterProgress((prev) => {
          if (prev >= 100) {
            return 100
          }
          return prev + 2
        })
      }, 50)

      return () => clearInterval(interval)
    }
  }, [isWatering])
  
  const handleWaterStart = () => {
    setIsWatering(true)
    setWaterProgress(0)

    // Create wet soil effect
    const soilMedia = document.getElementById('soilMedia')
    if (soilMedia) {
      soilMedia.classList.add('wet')
    }
    
    // Add water animation effect
    const waterSurface = document.getElementById('waterSurface')
    const wetSoil = document.getElementById('wetSoil')

    waterSurface?.classList.add('active')
    wetSoil?.classList.add('active')

    // Reset water drops
    const waterDrops = waterSurface?.querySelectorAll('.water-drop')
    waterDrops?.forEach((drop, index) => {
      const dropElement = drop as HTMLElement
      dropElement.style.animation = 'none'
      setTimeout(() => {
        dropElement.style.animation = `water-drop-fall 2s ease-out ${index * 0.2}s forwards`
      }, 10)
    })

    // Reset water ripples
    const waterRipples = waterSurface?.querySelectorAll('.water-ripple')
    waterRipples?.forEach((ripple, index) => {
      const rippleElement = ripple as HTMLElement
      rippleElement.style.animation = 'none'
      setTimeout(() => {
        rippleElement.style.animation = `water-ripple-expand 3s ease-out ${0.5 + index * 0.3}s forwards`
      }, 10)
    })
  }
  
  const handleWaterEnd = () => {
    setIsWatering(false)
    
    // Remove wet soil effect after delay
    setTimeout(() => {
      const soilMedia = document.getElementById('soilMedia')
      if (soilMedia) {
        soilMedia.classList.remove('wet')
      }
    }, 2000)
    
    // Remove water animation effects after delay
    setTimeout(() => {
      const waterSurface = document.getElementById('waterSurface')
      const wetSoil = document.getElementById('wetSoil')
      
      waterSurface?.classList.remove('active')
      wetSoil?.classList.remove('active')
    }, 2000)
    
    // SUPER EASY MODE - hampir selalu berhasil (10-90% safe zone)
    // Ini sangat mudah! Hanya gagal jika terlalu cepat atau terlalu lambat
    if (waterProgress >= 10 && waterProgress <= 90) {
      // Success!
      const newWaterLevel = waterLevel + 1
      setWaterLevel(newWaterLevel)
      
      // Check for stage progression - persyaratan jauh lebih mudah
      if (newWaterLevel === 2 && gameStage === 0) {
        // Move to seed stage
        setGameStage(1)
        setNailongMessage("Waaa, sudah siap untuk di tanam biji mawar nih 🌹")
      } else if (newWaterLevel === 4 && gameStage === 1) {
        // Move to sprout stage
        setGameStage(2)
        setNailongMessage("Wuii, Ayo lanjuti menyiram yaa sedikit lagi tumbuh akar mawar")
      } else if (newWaterLevel === 6 && gameStage === 2) {
        // Move to bud stage
        setGameStage(3)
        setNailongMessage("Sudah tumbuh akar mawar sedikit lagi tumbuh batangnya ayoo semangat cantik 💕")
      } else if (newWaterLevel === 8 && gameStage === 3) {
        // Move to bloom stage
        setGameStage(4)
        setNailongMessage("Tadaaa! Mawarnya mekar sempurna! Tanahnya jadi indah! 🌹💕")

        // Show confetti effect
        createConfetti()

        // Show ending after a delay
        setTimeout(() => {
          setShowEnding(true)
        }, 3000)
      } else {
        // Just successful watering dengan pesan positif sesuai tahap
        let messages = []
        if (gameStage === 0) {
          // Pesan untuk tahap awal (belum ada tanaman)
          messages = [
            "Yess, tanahnya udah basah dan lembab nih kita siram lagi yaa!",
            "Bagus! Tanahnya udah siap untuk ditanam biji mawar!",
            "Mantap! Tanahnya makin subur nih, terus siram ya!"
          ]
        } else if (gameStage === 1) {
          // Pesan untuk tahap biji
          messages = [
            "Hebat! Biji mawarnya udah cukup air!",
            "Perfect! Biji mawarnya siap tumbuh!",
            "Great! Airnya meresap dengan baik di biji mawar!"
          ]
        } else if (gameStage === 2) {
          // Pesan untuk tahap akar
          messages = [
            "Asik! Akarnya udah seger dengan air ini!",
            "Mantap! Akarnya makin kuat dengan air yang cukup!",
            "Nice! Airnya membantu akar tumbuh dengan baik!"
          ]
        } else if (gameStage === 3) {
          // Pesan untuk tahap kuncup/batang
          messages = [
            "Wow! Batangnya udah segar dengan air ini!",
            "Awesome! Batang mawarnya siap mekar!",
            "Amazing! Airnya membuat batang makin kuat untuk mekar!"
          ]
        } else {
          // Pesan default
          messages = [
            "Yess, tanahnya udah basah dan lembab nih kita siram lagi yaa!",
            "Hebat! Terus rawat bunganya!",
            "Perfect! Tanah terbaik!"
          ]
        }
        const randomMessage = messages[Math.floor(Math.random() * messages.length)]
        setNailongMessage(randomMessage)
      }
    } else {
      // Failed - tapi tetap sangat friendly
      if (waterProgress < 10) {
        setNailongMessage("Terlalu cepet! Tapi gapapa, coba lagi ya! 😊")
      } else {
        setNailongMessage("Kelewat sedikit! Yakin, kamu pasti bisa! 🎯")
      }
    }
    
    // Reset progress
    setWaterProgress(0)
  }
  
  const createConfetti = () => {
    // Enhanced confetti effect with different shapes and colors
    const colors = ['#FF5252', '#FF9800', '#FFEB3B', '#4CAF50', '#2196F3', '#9C27B0', '#E91E63', '#00BCD4']
    const shapes = ['confetti', 'confetti circle', 'confetti star', 'confetti square']
    const confettiCount = 80
    
    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div')
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)]
        confetti.className = randomShape
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.left = `${Math.random() * 100}%`
        confetti.style.top = '40%'
        confetti.style.animationDelay = `${Math.random() * 0.5}s`
        
        document.querySelector('.game-container')?.appendChild(confetti)
        
        setTimeout(() => {
          confetti.remove()
        }, 4000)
      }, i * 20)
    }
  }
  
  const handleButtonClick = (text: string) => {
    navigator.clipboard.writeText(text)
    setNotification(`Teks "${text}" disalin!`)
    setTimeout(() => setNotification(""), 2000)
  }

  // Ending interaction functions
  const handleFirstChoice = (choice: 'iya' | 'tidak') => {
    if (choice === 'iya') {
      // User says it's good - move to second question
      setShowFirstQuestion(false)
      setShowSecondQuestion(true)
    } else {
      // User says it's not good - restart game
      resetGame()
    }
  }

  const handleSecondChoice = (choice: 'iya' | 'tidak') => {
    if (choice === 'iya') {
      // User confirms it's good - move to meet question
      setShowSecondQuestion(false)
      setShowMeetQuestion(true)
    } else {
      // User says no - show plant again message and restart after 4 seconds
      setShowSecondQuestion(false)
      setShowPlantAgainMessage(true)
      setTimeout(() => {
        resetGame()
      }, 4000)
    }
  }

  const handleMeetChoice = async (choice: 'ayo' | 'gamau') => {
    if (choice === 'ayo') {
      try {
        // Hit WhatsApp API endpoint
        const response = await fetch('/api/whatsapp', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          console.log('WhatsApp API triggered successfully')
        } else {
          console.error('Failed to trigger WhatsApp API')
        }
      } catch (error) {
        console.error('Error triggering WhatsApp API:', error)
      }

      // User agrees to meet - show final message
      setShowMeetQuestion(false)
      setShowFinalMessage(true)
    } else {
      // User says gamau - show error (cannot click gamau)
      setErrorMessage(true)
      setTimeout(() => {
        setErrorMessage(false)
        setShowMeetQuestion(true)
      }, 3000)
    }
  }

  const resetGame = () => {
    setGameStage(0)
    setWaterLevel(0)
    setWaterProgress(0)
    setShowEnding(false)
    setShowFirstQuestion(true)
    setShowSecondQuestion(false)
    setShowMeetQuestion(false)
    setShowFinalMessage(false)
    setShowPlantAgainMessage(false)
    setErrorMessage(false)
    setNailongMessage("Uh oh, semangatnya lagi layu nih... Bantuin aku siram tanaman biar mawarnya mekar lagi, yuk! GAMPANG BANGET KOK! 🌹")
  }

  // Audio Management Functions
  const initAudio = () => {
    // Initialize background music
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = volume
      backgroundMusicRef.current.loop = true
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.muted = !isMuted
    }
  }

  const playBackgroundMusic = () => {
    if (backgroundMusicRef.current && !isMuted) {
      backgroundMusicRef.current.play().catch(e => console.log('Background music play failed:', e))
    }
  }
  
  const renderPlantStage = () => {
    switch (gameStage) {
      case 1:
        return (
          <div className="plant-seed active" style={{animation: 'seed-entrance 0.6s ease-out forwards, seed-magical-float 4s ease-in-out 0.6s infinite'}}>
            <div className="seed-icon">🌰</div>
          </div>
        )
      case 2:
        return (
          <div className="plant-sprout active" style={{animation: 'sprout-entrance 0.8s ease-out forwards, sprout-mystic-sway 5s ease-in-out 0.3s infinite'}}>
            <div className="sprout-icon">🌱</div>
          </div>
        )
      case 3:
        return (
          <div className="plant-bud active" style={{animation: 'bud-entrance 1s ease-out forwards, bud-glowing-pulse 3.5s ease-in-out 0.6s infinite'}}>
            <div className="rose-icon-medium">🥀</div>
          </div>
        )
      case 4:
        return (
          <div className="plant-bloom active" style={{animation: 'bloom-entrance 1.2s ease-out forwards, bloom-ethereal-shimmer 6s ease-in-out 0.9s infinite'}}>
            <div className="rose-icon-bloom">🌹</div>
          </div>
        )
      default:
        // No plant at the beginning - show empty pot
        return null
    }
  }

  // const getEmotionEmoji = () => {
  //   switch (gameStage) {
  //     case 0: return "😢"
  //     case 1: return "🤔"
  //     case 2: return "😊"
  //     case 3: return "😄"
  //     case 4: return "🥰"
  //     default: return "😢"
  //   }
  // }

  const renderNailongCharacters = () => {
    const positions = [
      { top: "15%", left: "5%", size: 100, zIndex: 15, rotation: -15, emoji: "😊" },
      { top: "15%", right: "8%", size: 90, zIndex: 14, rotation: 20, emoji: "😄" },
      { top: "75%", left: "3%", size: 95, zIndex: 13, rotation: -10, emoji: "🥰" },
      { top: "75%", right: "5%", size: 85, zIndex: 12, rotation: 15, emoji: "😍" },
      { top: "40%", left: "2%", size: 110, zIndex: 16, rotation: -5, emoji: "🤗" },
      { top: "15%", right: "15%", size: 80, zIndex: 11, rotation: 25, emoji: "💕" },
      { top: "85%", left: "15%", size: 75, zIndex: 10, rotation: -20, emoji: "✨" },
      // Additional cute nailongs
      { top: "25%", left: "8%", size: 70, zIndex: 9, rotation: 12, emoji: "🌟" },
      { top: "55%", right: "8%", size: 65, zIndex: 8, rotation: -8, emoji: "💖" },
      { top: "26%", right: "25%", size: 75, zIndex: 7, rotation: 18, emoji: "🌸" },
      // Special nailong-1.png character
      { top: "20%", right: "5%", size: 90, zIndex: 17, rotation: 8, image: "nailong-1" },
      // Special nailong-2.png character
      { top: "70%", right: "20%", size: 85, zIndex: 19, rotation: -12, image: "nailong-2" },
      // Interactive nailong that hides message on hover
      
    ]

    const handleNailongHover = (hideMessage: boolean) => {
      setMessageHidden(hideMessage)
    }

    return positions.map((pos, index) => (
      <div
        key={index}
        className="floating-nailong"
        style={{
          position: 'absolute',
          top: pos.top,
          left: pos.left,
          right: pos.right,
          width: `${pos.size}px`,
          height: `${pos.size}px`,
          zIndex: pos.zIndex,
          transform: `rotate(${pos.rotation}deg)`,
          animation: `float-${index} ${3 + index * 0.3}s ease-in-out infinite`,
        }}
        onMouseEnter={pos.hideMessage ? () => handleNailongHover(true) : undefined}
        onMouseLeave={pos.hideMessage ? () => handleNailongHover(false) : undefined}
      >
        {pos.emoji ? (
          <div style={{
            position: 'absolute',
            top: '-15px',
            right: '-10px',
            fontSize: `${pos.size * 0.3}px`,
            zIndex: pos.zIndex + 1,
            animation: `emotion-pulse 1s ease-in-out infinite`
          }}>
            {pos.emoji}
          </div>
        ) : null}
        <img
          src={pos.image ? `/assets/${pos.image}.png` : "/assets/nailong-no-bg.png"}
          alt="Nailong"
          className="floating-character"
        />
      </div>
    ))
  }

  const renderProgressDots = () => {
    const dots = []
    const totalStages = 4
    for (let i = 0; i < totalStages; i++) {
      dots.push(
        <div 
          key={i} 
          className={`progress-dot ${gameStage > i ? 'active' : ''}`}
        />
      )
    }
    return dots
  }

  if (showWelcome) {
    return (
      <div className="welcome-container">
        {/* Audio Elements */}
        <audio
          ref={backgroundMusicRef}
          src="/music/bgm-music.mp3"
          preload="auto"
          loop
        />

        {/* Audio Controls */}
        <button
          className="audio-toggle"
          onClick={toggleMute}
          aria-label="Toggle music"
        >
          {isMuted ? '🔇' : '🔊'}
        </button>

        <div className="welcome-content">
          <h1 className="welcome-title">🌸 Selamat Datang di Taman Nailong Hai Anin 🌸</h1>
          <div className="welcome-description">
            <p>Halo! Anin Aku Nailong dan Haris, butuh bantuanmu untuk merawat taman mawar Nailong</p>
            <p>Mawar Aku sedang layu nih... Bantuin aku siram biar mawar merah mekar lagi, yuk!</p>
            <p className="instruction">🎮 Cara main: Tekan dan tahan tombol siram untuk menyiram tanaman</p>
          </div>
          <button
            className="start-button"
            onClick={() => setShowWelcome(false)}
          >
            🌱 Mulai Bermain
          </button>
        </div>
        {renderNailongCharacters()}
      </div>
    )
  }

  return (
    <div className="game-container">
      {/* Audio Elements for Game */}
      <audio
        ref={backgroundMusicRef}
        src="/music/bgm-music.mp3"
        preload="auto"
        loop
      />

      {/* Audio Controls */}
      <button
        className="audio-toggle-game"
        onClick={toggleMute}
        aria-label="Toggle music"
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      {renderNailongCharacters()}

      <div className="game-background">
        <div className="game-header">
          <h1 className="game-title">Taman Nailong</h1>
          <p className="game-subtitle">Untuk Meningkatkan Semangat Anin!!</p>
        </div>
        
        <div className="game-content">
          <div className="nailong-container">
            <img src="/assets/nailong-no-bg.png" alt="Nailong" className="nailong-character" />
            {/* <div className="nailong-emotion">{getEmotionEmoji()}</div> */}
          </div>
          
          <div className="plant-container">
            <div className="flower-pot">
              <div className="soil-media" id="soilMedia"></div>
            </div>
            <div className="plant-stage">
              {renderPlantStage()}
            </div>
          </div>
          
          {!messageHidden && (
            <div className="message-container">
              <p className="nailong-message">{nailongMessage}</p>
            </div>
          )}
          <div className="water-progress-indicator">
            {renderProgressDots()}
          </div>
          
          {gameStage < 4 && (
            <div className="water-button-container">
              <button 
                className={`water-button ${isWatering ? 'watering' : ''}`}
                onMouseDown={handleWaterStart}
                onMouseUp={handleWaterEnd}
                onTouchStart={handleWaterStart}
                onTouchEnd={handleWaterEnd}
              >
                <span className="water-icon">💧</span>
                <div className="water-splash"></div>
              </button>
              <div className="water-progress">
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${waterProgress}%`}}></div>
                  </div>
                  <div className="progress-zones">
                    <div className="danger-zones">
                      <div className="danger-zone"></div>
                      <div className="danger-zone"></div>
                    </div>
                    <div className="safe-zone"></div>
                  </div>
                </div>
                <div className="progress-indicators">
                  {renderProgressDots()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showEnding && (
        <div className="ending-screen">
          <div className="ending-content">
            {/* Pop Up 1: First Question */}
            {showFirstQuestion && (
              <>
                <h2 className="ending-title">🌹 How do you feel right now? sedih? capek? 🌹</h2>
                <p className="ending-message">
                  Udah lebih baik belum?? 
                </p>
                <div className="ending-buttons">
                  <button className="ending-button yes-button" onClick={() => handleFirstChoice('iya')}>
                    Sudah ✨
                  </button>
                  <button className="ending-button no-button" onClick={() => handleFirstChoice('tidak')}>
                    Belum (Main Lagi)
                  </button>
                </div>
              </>
            )}

            {/* Pop Up 2: Second Question */}
            {showSecondQuestion && (
              <>
                <h2 className="ending-title">🌹 Udah better ni yakin? 🌹</h2>
                <p className="ending-message">
                  Yakin nih everything sudah better banget?
                </p>
                <div className="ending-buttons">
                  <button className="ending-button yes-button" onClick={() => handleSecondChoice('iya')}>
                    Iya ✨
                  </button>
                  <button className="ending-button no-button" onClick={() => handleSecondChoice('tidak')}>
                    Tidak
                  </button>
                </div>
              </>
            )}

            {/* Plant Again Message - When user says tidak in second question */}
            {showPlantAgainMessage && (
              <>
                <h2 className="ending-title">🌱 Kalo Gitu Kita Menanam Lagi 🌱</h2>
                <p className="ending-message">
                  Oke deh, mari kita menanam lagi untuk menambah semangat!
                </p>
                <div className="ending-buttons">
                  <button className="ending-button retry-button" disabled>
                    Game akan dimulai ulang...
                  </button>
                </div>
              </>
            )}

            {/* Pop Up 3: Meet Question */}
            {showMeetQuestion && (
              <>
                <h2 className="ending-title">🌹 Haris mau dong di kabarin lagi, ditelpon lagi 🌹</h2>
                <p className="ending-message">
                  Ayo Main lagi, ngobrol lagi kita yapping lagi kalo Anin sudah feel much better bisa Pilih "Ayo"
                </p>
                <div className="ending-buttons">
                  <button className="ending-button yes-button" onClick={() => handleMeetChoice('ayo')}>
                    Ayo ✨
                  </button>
                  <button className="ending-button no-button" onClick={() => handleMeetChoice('gamau')}>
                    Ga mau
                  </button>
                </div>
              </>
            )}

            {/* Final Message */}
            {showFinalMessage && (
              <>
                <h2 className="ending-title">🎉 Yeyyy Ayo Kita Mainnnnn Lagii 🎉</h2>
                <p className="ending-message">
                  Im Happy Really Really Happy After ini aku Telepon ya kalo sudah tidak Working Hour! 😊💕
                </p>
                <div className="ending-buttons">
                  <button className="ending-button restart-button" onClick={resetGame}>
                    🌱 Main Lagi
                  </button>
                </div>
              </>
            )}

            {/* Error Message - Cannot click "Tidak" or "Ga mau" */}
            {errorMessage && (
              <>
                <h2 className="ending-title error-title">⚠️ Maaf ya! ⚠️</h2>
                <p className="ending-message error-message">
                  Error: Jawaban tidak tersedia! Ini Koding nya error ihh ga tau deh benerinn gimana! 😊
                </p>
                <div className="ending-buttons">
                  <button className="ending-button retry-button" disabled>
                    Mohon tunggu...
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
    </div>
  )
}
