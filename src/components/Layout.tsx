import { useAppStore } from '../store/useAppStore'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import { useAdaptiveLearning } from '../hooks/useAdaptiveLearning'
import { ConfettiCelebration, LevelUpModal } from './ui/Confetti'
import { StreakBadge, XPIndicator } from './ui/Gamification'
import { BottomNav } from './ui/BottomNav'
import { Mascot } from './ui/Mascot'
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useCallback } from 'react'
import { LANGUAGES } from '../i18n/languages'
import type { Language } from '../types'

import { APP_VERSION, APP_BUILD } from '../version'

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
}

const pageToRoute: Record<string, string> = {
  home: '/', practice: '/practice', flashcard: '/flashcard',
  match: '/match', quiz: '/quiz', progress: '/progress', profile: '/profile',
  sentences: '/sentences', dialogues: '/dialogues',
}

const routeToPage: Record<string, string> = {
  '/': 'home', '/practice': 'practice', '/flashcard': 'flashcard',
  '/match': 'match', '/quiz': 'quiz', '/progress': 'progress', '/profile': 'profile',
  '/sentences': 'sentences', '/dialogues': 'dialogues',
}

export function Layout() {
  const navigate = useNavigate()
  const location = useLocation()

  const darkMode = useAppStore(s => s.darkMode)
  const toggleDarkMode = useAppStore(s => s.toggleDarkMode)
  const streak = useAppStore(s => s.streak)
  const xp = useAppStore(s => s.xp)
  const level = useAppStore(s => s.level)
  const showConfetti = useAppStore(s => s.showConfetti)
  const showLevelUp = useAppStore(s => s.showLevelUp)
  const setShowConfetti = useAppStore(s => s.setShowConfetti)
  const setShowLevelUp = useAppStore(s => s.setShowLevelUp)
  const setPracticeChar = useAppStore(s => s.setPracticeChar)
  const setQuizActive = useAppStore(s => s.setQuizActive)
  const setSelectedWordCategory = useAppStore(s => s.setSelectedWordCategory)
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const setCurrentLanguage = useAppStore(s => s.setCurrentLanguage)

  const sounds = useSounds()
  const mascot = useMascot()
  const adaptive = useAdaptiveLearning()

  const activePage = routeToPage[location.pathname] || 'home'

  useEffect(() => {
    if (showLevelUp) {
      sounds.playLevelUp()
      mascot.celebrate()
      const t = setTimeout(() => setShowLevelUp(false), 3000)
      return () => clearTimeout(t)
    }
  }, [showLevelUp, sounds, mascot, setShowLevelUp])

  useEffect(() => {
    if (showConfetti) {
      const t = setTimeout(() => setShowConfetti(false), 3500)
      return () => clearTimeout(t)
    }
  }, [showConfetti, setShowConfetti])

  const navigateTo = useCallback((page: string) => {
    navigate(pageToRoute[page] || '/')
    setPracticeChar(null)
    setQuizActive(false)
    setSelectedWordCategory(null)
    sounds.playClick()
    adaptive.saveSession(page)
  }, [navigate, sounds, adaptive, setPracticeChar, setQuizActive, setSelectedWordCategory])

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'

  return (
    <div className="min-h-screen pb-24" style={{ background: darkMode ? '#0f172a' : '#f1f5f9', color: textPrimary }}>
      <ConfettiCelebration active={showConfetti} />
      <LevelUpModal level={level} show={showLevelUp} />

      {/* Header */}
      <header
        className="sticky top-0 z-40 px-5 py-4 flex items-center justify-between backdrop-blur-xl border-b"
        style={{
          background: darkMode ? 'rgba(15,23,42,0.85)' : 'rgba(248,250,252,0.85)',
          borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)',
        }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            🌐
          </motion.div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-base leading-tight" style={{ color: textPrimary }}>Language Learning</h1>
            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 whitespace-nowrap">v{APP_VERSION}</span>
          </div>
          <p className="text-xs" style={{ color: textSecondary }}>Daily Goal: 10 min</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <select
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value as Language)}
            aria-label="Select language"
            className="text-xs font-semibold rounded-lg px-2 py-1.5 border-0 cursor-pointer focus:ring-2 focus:ring-indigo-400"
            style={{ background: bgCard, color: textPrimary }}
          >
            {(Object.keys(LANGUAGES) as Language[]).map(lang => (
              <option key={lang} value={lang}>{LANGUAGES[lang].flag} {LANGUAGES[lang].name}</option>
            ))}
          </select>
          <StreakBadge streak={streak} size="sm" showLabel={false} />
          <XPIndicator xp={xp} level={level} size="sm" showProgress={false} />
          <button
            onClick={() => sounds.setMuted()}
            aria-label={sounds.muted ? 'Unmute sound' : 'Mute sound'}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400"
            style={{ background: bgCard, color: textSecondary }}
          >
            {sounds.muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button
            onClick={() => toggleDarkMode()}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400"
            style={{ background: bgCard, color: textSecondary }}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      <main className="px-4 md:px-8 max-w-5xl mx-auto">
        <motion.div {...pageVariants} className="pt-6">
          <Outlet />
        </motion.div>
      </main>

      <Mascot visible={mascot.visible} message={mascot.message} emotion={mascot.emotion} onDismiss={mascot.hide} darkMode={darkMode} />
      <BottomNav active={activePage} onNavigate={navigateTo} darkMode={darkMode} />

      {/* Build info footer */}
      <div className="fixed bottom-20 right-4 text-[10px] font-mono opacity-40" style={{ color: textSecondary }}>
        Build: {APP_BUILD}
      </div>
    </div>
  )
}

export default Layout