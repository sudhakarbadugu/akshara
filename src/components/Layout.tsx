import { useAppStore } from '../store/useAppStore'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import { useAdaptiveLearning } from '../hooks/useAdaptiveLearning'
import { ConfettiCelebration, LevelUpModal } from './ui/Confetti'
import { StreakBadge, XPIndicator } from './ui/Gamification'
import { BottomNav } from './ui/BottomNav'
import { Mascot } from './ui/Mascot'
import { Sun, Moon, Volume2, VolumeX, Home, PenTool, FileQuestion, BarChart3, User, Brain, BookOpen, Grid3X3 } from 'lucide-react'
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
  home: '/', practice: '/practice', homework: '/homework', flashcard: '/flashcard',
  match: '/match', quiz: '/quiz', progress: '/progress', profile: '/profile',
  review: '/review', sentences: '/sentences', dialogues: '/dialogues', charts: '/charts',
}

const routeToPage: Record<string, string> = {
  '/': 'home', '/practice': 'practice', '/homework': 'homework', '/flashcard': 'flashcard',
  '/match': 'match', '/quiz': 'quiz', '/progress': 'progress', '/profile': 'profile',
  '/review': 'review', '/sentences': 'sentences', '/dialogues': 'dialogues', '/charts': 'charts',
}

const sidebarItems = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'practice', label: 'Practice', icon: PenTool },
  { key: 'charts', label: 'Alphabet Chart', icon: Grid3X3 },
  { key: 'homework', label: 'Homework', icon: BookOpen },
  { key: 'review', label: 'Review', icon: Brain },
  { key: 'quiz', label: 'Quiz', icon: FileQuestion },
  { key: 'progress', label: 'Progress', icon: BarChart3 },
  { key: 'profile', label: 'Profile', icon: User },
]

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

  const dismissLevelUp = useCallback(() => setShowLevelUp(false), [setShowLevelUp])

  useEffect(() => {
    if (showLevelUp) {
      sounds.playLevelUp()
      mascot.celebrate()
    }
  }, [showLevelUp, sounds, mascot])

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
  const sidebarBg = darkMode ? 'rgba(15,23,42,0.95)' : 'rgba(248,250,252,0.95)'
  const sidebarBorder = darkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)'

  return (
    <div className="min-h-screen" style={{ background: darkMode ? '#0f172a' : '#f1f5f9', color: textPrimary }}>
      <ConfettiCelebration active={showConfetti} />
      <LevelUpModal level={level} show={showLevelUp} onDismiss={dismissLevelUp} />

      {/* Desktop sidebar — hidden on mobile/tablet */}
      <aside
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-56 z-40 border-r"
        style={{
          background: sidebarBg,
          borderColor: sidebarBorder,
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Sidebar header */}
        <div className="px-5 py-5 flex items-center gap-3 border-b" style={{ borderColor: sidebarBorder }}>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            🌐
          </div>
          <div>
            <div className="font-bold text-sm leading-tight" style={{ color: textPrimary }}>Language Learning</div>
            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">v{APP_VERSION}</span>
          </div>
        </div>

        {/* Language switcher */}
        <div className="px-4 py-3 border-b" style={{ borderColor: sidebarBorder }}>
          <select
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value as Language)}
            aria-label="Select language"
            className="w-full text-xs font-semibold rounded-lg px-3 py-2 border-0 cursor-pointer focus:ring-2 focus:ring-indigo-400"
            style={{ background: bgCard, color: textPrimary }}
          >
            {(Object.keys(LANGUAGES) as Language[]).map(lang => (
              <option key={lang} value={lang}>{LANGUAGES[lang].flag} {LANGUAGES[lang].name}</option>
            ))}
          </select>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-3 space-y-1">
          {sidebarItems.map(item => {
            const Icon = item.icon
            const isActive = activePage === item.key
            return (
              <motion.button
                key={item.key}
                onClick={() => navigateTo(item.key)}
                whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? darkMode
                      ? 'bg-indigo-500/20 text-indigo-300'
                      : 'bg-indigo-50 text-indigo-600'
                    : darkMode
                      ? 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                )}
              </motion.button>
            )
          })}
        </nav>

        {/* Sidebar footer: stats + controls */}
        <div className="px-4 py-3 border-t space-y-3" style={{ borderColor: sidebarBorder }}>
          <div className="flex items-center gap-3">
            <StreakBadge streak={streak} size="sm" showLabel={true} />
            <XPIndicator xp={xp} level={level} size="sm" showProgress={false} />
          </div>
          <div className="flex items-center gap-2">
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
        </div>
      </aside>

      {/* Mobile/tablet header — hidden on desktop */}
      <header
        className="lg:hidden sticky top-0 z-40 px-4 py-3 flex items-center justify-between backdrop-blur-xl border-b"
        style={{
          background: darkMode ? 'rgba(15,23,42,0.85)' : 'rgba(248,250,252,0.85)',
          borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            🌐
          </motion.div>
          <h1 className="font-bold text-sm leading-tight" style={{ color: textPrimary }}>Language Learning</h1>
          <span className="px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 whitespace-nowrap">v{APP_VERSION}</span>
        </div>
        <div className="flex items-center gap-1.5">
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

      {/* Main content area — offset on desktop for sidebar */}
      <main className="lg:ml-56 px-4 md:px-8 pb-24 lg:pb-8">
        <motion.div {...pageVariants} className="pt-6 max-w-5xl mx-auto">
          <Outlet />
        </motion.div>
      </main>

      <Mascot visible={mascot.visible} message={mascot.message} emotion={mascot.emotion} onDismiss={mascot.hide} darkMode={darkMode} />

      {/* Mobile bottom nav — hidden on desktop */}
      <BottomNav active={activePage} onNavigate={navigateTo} darkMode={darkMode} />

      {/* Build info footer */}
      <div className="fixed bottom-20 lg:bottom-4 right-4 text-[10px] font-mono opacity-40" style={{ color: textSecondary }}>
        Build: {APP_BUILD}
      </div>
    </div>
  )
}

export default Layout