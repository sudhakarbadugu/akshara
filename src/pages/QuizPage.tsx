import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { getLessons } from '../data/lessons'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import { useEffect, useState } from 'react'
import type { WordItem, AlphabetChar } from '../types'
import { Settings, Eye, EyeOff, BookOpen, Type, X } from 'lucide-react'

// Animated feedback overlay component
function QuizFeedbackOverlay({ feedback, onNext, onRetry, onClose }: { feedback: 'correct' | 'wrong' | null; onNext: () => void; onRetry: () => void; onClose: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (feedback) {
      setVisible(true)
      if (feedback === 'correct') {
        const timer = setTimeout(() => {
          setVisible(false)
          onNext()
        }, 2500)
        return () => clearTimeout(timer)
      }
    }
  }, [feedback, onNext, onClose])

  if (!feedback) return null
  const isCorrect = feedback === 'correct'

  return (
    <AnimatePresence>
      {visible && feedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 bg-black/20"
          />
          <motion.div
            initial={{ scale: 0.3, y: 100, rotate: -10 }}
            animate={{ scale: [0.3, 1.2, 1], y: [100, -20, 0], rotate: [-10, 5, 0] }}
            exit={{ scale: 0.5, y: 50, opacity: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 15 }}
            className={`relative pointer-events-auto rounded-3xl p-8 text-center shadow-2xl border-4 ${
              isCorrect ? 'bg-emerald-500/95 border-emerald-300 text-white' : 'bg-red-500/95 border-red-300 text-white'
            }`}
            style={{ minWidth: 280 }}
          >
            {isCorrect && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], x: [0, (i % 2 === 0 ? 1 : -1) * (40 + Math.random() * 60)], y: [0, -80 - Math.random() * 60] }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="absolute top-1/2 left-1/2 text-3xl"
                  >
                    {['✨', '🎉', '⭐', '💫', '🌟', '🔥'][i]}
                  </motion.div>
                ))}
              </>
            )}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1], rotate: isCorrect ? [0, -15, 15, 0] : [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl mb-3"
            >
              {isCorrect ? '🎉' : '😅'}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="text-2xl font-black mb-1">{isCorrect ? 'Excellent!' : 'Not quite!'}</div>
              <div className="text-sm opacity-90 mb-4">{isCorrect ? 'You got it right!' : 'Keep practicing!'}</div>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => { setVisible(false); isCorrect ? onNext() : onRetry() }}
              className="px-8 py-3 rounded-xl bg-white text-gray-900 font-bold shadow-lg hover:shadow-xl transition-shadow"
            >
              {isCorrect ? 'Next →' : 'Try Again'}
            </motion.button>

            {!isCorrect && (
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => { setVisible(false); onNext() }}
                className="mt-2 px-6 py-2 rounded-xl text-sm text-white/70 hover:text-white/90 underline underline-offset-2 transition-colors"
              >
                Skip
              </motion.button>
            )}

            {/* Close X button */}
            <button
              onClick={() => { setVisible(false); onClose() }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function QuizPage() {
  const location = useLocation()
  const sounds = useSounds()
  const mascot = useMascot()

  const quizActive = useAppStore(s => s.quizActive)
  const quizWord = useAppStore(s => s.quizWord)
  const quizOptions = useAppStore(s => s.quizOptions)
  const selectedAnswer = useAppStore(s => s.selectedAnswer)
  const quizFeedback = useAppStore(s => s.quizFeedback)
  const quizType = useAppStore(s => s.quizType)
  const selectedCategory = useAppStore(s => s.selectedCategory)
  const score = useAppStore(s => s.score)
  const darkMode = useAppStore(s => s.darkMode)
  const streak = useAppStore(s => s.streak)
  const showEnglishInAlphaQuiz = useAppStore(s => s.showEnglishInAlphaQuiz)
  const setQuizActive = useAppStore(s => s.setQuizActive)
  const setQuizType = useAppStore(s => s.setQuizType)
  const setSelectedCategory = useAppStore(s => s.setSelectedCategory)
  const startAlphaQuiz = useAppStore(s => s.startAlphaQuiz)
  const startWordQuiz = useAppStore(s => s.startWordQuiz)
  const handleQuizAnswer = useAppStore(s => s.handleQuizAnswer)
  const setShowEnglishInAlphaQuiz = useAppStore(s => s.setShowEnglishInAlphaQuiz)
  const currentLanguage = useAppStore(s => s.currentLanguage)

  const lessons = getLessons(currentLanguage)
  const [showSettings, setShowSettings] = useState(false)

  const stateCatId = (location.state as any)?.wordCategoryId as number | undefined
  const activeCategory = stateCatId ?? selectedCategory ?? null

  useEffect(() => {
    if (!quizActive && activeCategory) {
      const cat = lessons.find(c => c.id === activeCategory)
      if (cat) {
        setQuizType('words')
        setQuizActive(true)
        startWordQuiz(activeCategory)
      }
    }
  }, [activeCategory])

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'
  const borderColor = darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'

  const handleAnswer = (option: AlphabetChar | WordItem) => {
    if (selectedAnswer) return
    const correct = handleQuizAnswer(option)
    if (correct) { sounds.playCorrect(); mascot.celebrate() }
    else { sounds.playWrong(); mascot.encourage() }
  }

  const nextQuestion = () => {
    if (quizType === 'alpha') startAlphaQuiz()
    else if (activeCategory) startWordQuiz(activeCategory)
    else { const randCat = lessons[Math.floor(Math.random() * lessons.length)]; if (randCat) startWordQuiz(randCat.id) }
  }

  const retryAnswer = () => {
    useAppStore.getState().setSelectedAnswer(null)
    useAppStore.getState().setQuizFeedback(null)
  }

  const totalQ = score.correct + score.wrong
  const accuracy = totalQ > 0 ? Math.round((score.correct / totalQ) * 100) : 0

  return (
    <div className="max-w-5xl mx-auto">
      {!quizActive ? (
        <>
          <SectionHeader title="Quiz Time!" subtitle="Test your knowledge" icon="📝" darkMode={darkMode} />

          <div className="lg:flex lg:gap-6 mt-6">
            {/* Quiz type selection — side by side on desktop */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => { setQuizType('alpha'); setQuizActive(true); startAlphaQuiz() }}
                aria-label="Start alphabet quiz"
                className="rounded-2xl p-8 text-center border-2 border-indigo-500/30 focus-visible:ring-2 focus-visible:ring-indigo-400"
                style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))' }}
              >
                <div className="text-5xl mb-3">🔤</div>
                <div className="font-bold text-white text-lg mb-1">Alphabet Quiz</div>
                <div className="text-sm text-slate-400">Test script recognition</div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => { setQuizType('words'); setQuizActive(false); setSelectedCategory(null) }}
                aria-label="Start word quiz"
                className="rounded-2xl p-8 text-center border-2 border-emerald-500/30 focus-visible:ring-2 focus-visible:ring-indigo-400"
                style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(52,211,153,0.15))' }}
              >
                <div className="text-5xl mb-3">📚</div>
                <div className="font-bold text-white text-lg mb-1">Word Quiz</div>
                <div className="text-sm text-slate-400">Test meaning & translation</div>
              </motion.button>
            </div>

            {/* Score summary on desktop */}
            <div className="lg:w-56 xl:w-64 space-y-3 mt-5 lg:mt-0">
              {[
                { label: 'Correct', value: score.correct, color: '#10b981', icon: '✅' },
                { label: 'Wrong', value: score.wrong, color: '#ef4444', icon: '❌' },
                { label: 'Streak', value: `${streak} 🔥`, color: '#f59e0b', icon: '🔥' },
                { label: 'Accuracy', value: `${accuracy}%`, color: '#6366f1', icon: '🎯' },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-4 border flex items-center gap-3" style={{ background: bgCard, borderColor }}>
                  <div className="text-xl">{s.icon}</div>
                  <div>
                    <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-[10px]" style={{ color: textSecondary }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {quizType === 'words' && (
            <div className="mt-6">
              <div className="text-sm font-bold mb-3" style={{ color: textSecondary }}>Choose a category</div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {lessons.map((cat, i) => {
                  const icons = ['👋', '🔢', '👨‍👩‍👧‍👦', '🍛', '🎨', '📅', '💬', '🦴']
                  return (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setQuizActive(true); startWordQuiz(cat.id); }}
                      aria-label={`Word quiz: ${cat.category}`}
                      className="rounded-xl p-4 text-center border bg-slate-800/50 border-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-400 hover:border-emerald-500/40 transition-all"
                    >
                      <div className="text-3xl mb-2">{icons[i]}</div>
                      <div className="text-sm font-semibold text-slate-300">{cat.category}</div>
                      <div className="text-[10px] text-slate-500 mt-1">{cat.words.length} words</div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="lg:flex lg:gap-8 lg:items-start">
          {/* ─── Left: Quiz content ─── */}
          <div className="flex-1 space-y-5">
            {/* Header bar */}
            <div className="flex items-center justify-between">
              <button onClick={() => { setQuizActive(false); setSelectedCategory(null) }}
                aria-label="Back to quiz selection"
                className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-indigo-400"
              >← Back</button>

              {quizType === 'alpha' && (
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    aria-label="Quiz settings"
                    className={`p-2 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 ${showSettings ? 'bg-indigo-500/30 text-indigo-400' : 'text-slate-400 hover:text-slate-300'}`}
                  >
                    <Settings size={18} />
                  </button>
                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 z-20 rounded-xl p-3 border min-w-[200px]"
                        style={{ background: darkMode ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)', borderColor: darkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)', backdropFilter: 'blur(12px)' }}
                      >
                        <div className="text-xs font-bold mb-2" style={{ color: textSecondary }}>Quiz Settings</div>
                        <button onClick={() => setShowEnglishInAlphaQuiz(!showEnglishInAlphaQuiz)}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-indigo-500/10"
                          style={{ color: textPrimary }}
                        >
                          {showEnglishInAlphaQuiz ? <Eye size={16} className="text-emerald-400" /> : <EyeOff size={16} className="text-slate-500" />}
                          <span>Show English labels</span>
                          <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${showEnglishInAlphaQuiz ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                            {showEnglishInAlphaQuiz ? 'ON' : 'OFF'}
                          </span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Mobile score bar */}
            <div className="lg:hidden text-center text-sm" style={{ color: textSecondary }} aria-live="polite" role="status">
              Score: <span className="text-emerald-400 font-bold">{score.correct}</span>
              <span className="mx-2">·</span>
              <span className="text-red-400 font-bold">{score.wrong}</span>
              <span className="mx-2">·</span>
              Streak: 🔥 {streak}
            </div>

            {/* Question card — larger on desktop */}
            <div className="rounded-2xl p-8 lg:p-12 text-center border" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)' }}>
              <div className="text-xs mb-3 font-semibold uppercase tracking-wider" style={{ color: textSecondary }}>
                {quizType === 'alpha' ? 'Which character is this?' : 'What is the translation for:'}
              </div>
              <motion.div
                key={(quizWord as any)?.char || (quizWord as WordItem)?.english}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="text-4xl lg:text-5xl font-black mb-3"
                style={{ fontFamily: '"Noto Sans Tamil", "Noto Sans Devanagari", "Noto Sans Telugu", serif', color: '#fbbf24' }}
              >
                {quizType === 'alpha' ? (quizWord as any)?.name : (quizWord as WordItem)?.english}
              </motion.div>
              {quizType === 'words' && <div className="text-indigo-400 text-sm">{(quizWord as WordItem)?.meaning}</div>}
            </div>

            {/* Options — 2 cols mobile, 2 cols desktop but wider */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {quizOptions.map((opt, i) => {
                let btnStyle: React.CSSProperties = {
                  background: darkMode ? 'rgba(30,41,59,0.8)' : '#f8fafc',
                  borderColor: darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)',
                  color: textPrimary,
                }
                if (selectedAnswer) {
                  const isCorrectOpt = quizType === 'alpha'
                    ? (opt as any).char === (quizWord as any)?.char
                    : (opt as WordItem).english === (quizWord as WordItem)?.english
                  const isSelected = quizType === 'alpha'
                    ? (opt as any).char === (selectedAnswer as any)?.char
                    : (opt as WordItem).english === (selectedAnswer as WordItem)?.english
                  if (isCorrectOpt) btnStyle = { background: '#10b981', borderColor: '#10b981', color: 'white' }
                  else if (isSelected) btnStyle = { background: '#ef4444', borderColor: '#ef4444', color: 'white' }
                  else btnStyle = { background: darkMode ? 'rgba(30,41,59,0.4)' : '#f1f5f9', borderColor: 'rgba(99,102,241,0.1)', color: '#64748b' }
                }

                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, type: 'spring', stiffness: 300 }}
                    whileHover={!selectedAnswer ? { scale: 1.03, y: -2 } : {}}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(opt)}
                    disabled={!!selectedAnswer}
                    aria-label={`Option: ${quizType === 'alpha' ? (opt as any).char : (opt as WordItem).native}`}
                    className="p-5 lg:p-6 rounded-xl border-2 font-bold transition-all text-lg focus-visible:ring-2 focus-visible:ring-indigo-400 relative overflow-hidden"
                    style={btnStyle}
                  >
                    <div className="text-3xl lg:text-4xl mb-1">{quizType === 'alpha' ? (opt as any).char : (opt as WordItem).native}</div>
                    <AnimatePresence>
                      {(quizType !== 'alpha' || showEnglishInAlphaQuiz) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 0.6, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs lg:text-sm"
                        >
                          {quizType === 'alpha' ? (opt as any).english : (opt as WordItem).pronunciation}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* ─── Right: Desktop score panel ─── */}
          <div className="hidden lg:block lg:w-56 xl:w-64 space-y-3 lg:pt-14">
            {[
              { label: 'Correct', value: score.correct, color: '#10b981', icon: '✅' },
              { label: 'Wrong', value: score.wrong, color: '#ef4444', icon: '❌' },
              { label: 'Streak', value: `${streak} 🔥`, color: '#f59e0b', icon: '🔥' },
              { label: 'Accuracy', value: `${accuracy}%`, color: '#6366f1', icon: '🎯' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-4 border flex items-center gap-3" style={{ background: bgCard, borderColor }}>
                <div className="text-xl">{s.icon}</div>
                <div>
                  <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[10px]" style={{ color: textSecondary }}>{s.label}</div>
                </div>
              </div>
            ))}

            {/* Quiz type badge */}
            <div className="rounded-xl p-4 border text-center" style={{ background: bgCard, borderColor }}>
              <div className="text-xl mb-1">{quizType === 'alpha' ? '🔤' : '📚'}</div>
              <div className="text-xs font-bold" style={{ color: textSecondary }}>
                {quizType === 'alpha' ? 'Alphabet Quiz' : 'Word Quiz'}
              </div>
            </div>
          </div>
        </div>
      )}

      <QuizFeedbackOverlay feedback={quizFeedback} onNext={nextQuestion} onRetry={retryAnswer} onClose={() => useAppStore.getState().setQuizFeedback(null)} />
    </div>
  )
}

export default QuizPage