import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { getAlphabets } from '../data/alphabets'
import { getLessons } from '../data/lessons'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import { useEffect } from 'react'
import type { WordItem } from '../types'

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
  const setQuizActive = useAppStore(s => s.setQuizActive)
  const setQuizType = useAppStore(s => s.setQuizType)
  const setSelectedCategory = useAppStore(s => s.setSelectedCategory)
  const startAlphaQuiz = useAppStore(s => s.startAlphaQuiz)
  const startWordQuiz = useAppStore(s => s.startWordQuiz)
  const handleQuizAnswer = useAppStore(s => s.handleQuizAnswer)
  const setSelectedAnswer = useAppStore(s => s.setSelectedAnswer)
  const setQuizFeedback = useAppStore(s => s.setQuizFeedback)
  const setQuizWord = useAppStore(s => s.setQuizWord)
  const setQuizOptions = useAppStore(s => s.setQuizOptions)
  const currentLanguage = useAppStore(s => s.currentLanguage)

  const lessons = getLessons(currentLanguage)

  // Category ID from router state (home page) or store (nav bar)
  const stateCatId = (location.state as any)?.wordCategoryId as number | undefined
  const activeCategory = stateCatId ?? selectedCategory ?? null

  // Auto-start word quiz when category is pre-selected
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

  const handleWordAnswer = (option: WordItem) => {
    if (selectedAnswer) return
    const correct = option.english === (quizWord as WordItem)?.english
    setSelectedAnswer(option)
    setQuizFeedback(correct ? 'correct' : 'wrong')
    if (correct) {
      const state = useAppStore.getState()
      useAppStore.setState({ score: { correct: state.score.correct + 1, wrong: state.score.wrong } })
      useAppStore.getState().addXp(5)
      sounds.playCorrect()
      mascot.celebrate()
    } else {
      const state = useAppStore.getState()
      useAppStore.setState({ score: { correct: state.score.correct, wrong: state.score.wrong + 1 } })
      sounds.playWrong()
      mascot.encourage()
    }
  }

  const nextQuestion = () => {
    if (quizType === 'alpha') {
      startAlphaQuiz()
    } else {
      const cat = lessons.find(c => c.id === activeCategory)
      const randWord = cat?.words[Math.floor(Math.random() * cat.words.length)]
      if (randWord) {
        setQuizWord(randWord)
        setQuizOptions([...cat!.words.filter(w => w.english !== randWord.english).slice(0, 3), randWord].sort(() => Math.random() - 0.5))
        setSelectedAnswer(null)
        setQuizFeedback(null)
      }
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      {!quizActive ? (
        <>
          <SectionHeader title="Quiz Time!" subtitle="Test your knowledge" icon="📝" darkMode={darkMode} />
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => { setQuizType('alpha'); setQuizActive(true); startAlphaQuiz() }}
              aria-label="Start alphabet quiz"
              className="rounded-2xl p-6 text-center border-2 border-indigo-500/30 focus-visible:ring-2 focus-visible:ring-indigo-400"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))' }}
            >
              <div className="text-4xl mb-2">🔤</div>
              <div className="font-bold text-white mb-1">Alphabet Quiz</div>
              <div className="text-xs text-slate-400">Test script recognition</div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => { setQuizType('words'); setQuizActive(true); setSelectedCategory(null) }}
              aria-label="Start word quiz"
              className="rounded-2xl p-6 text-center border-2 border-emerald-500/30 focus-visible:ring-2 focus-visible:ring-indigo-400"
              style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(52,211,153,0.15))' }}
            >
              <div className="text-4xl mb-2">📚</div>
              <div className="font-bold text-white mb-1">Word Quiz</div>
              <div className="text-xs text-slate-400">Test meaning & translation</div>
            </motion.button>
          </div>

          {quizType === 'words' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {lessons.map((cat, i) => {
                const icons = ['👋', '🔢', '👨‍👩‍👧‍👦', '🍛', '🎨', '📅', '💬', '🦴']
                return (
                  <button key={cat.id} onClick={() => startWordQuiz(cat.id)}
                    aria-label={`Word quiz: ${cat.category}`}
                    className="rounded-xl p-3 text-center border bg-slate-800/50 border-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    <div className="text-2xl">{icons[i]}</div>
                    <div className="text-xs text-slate-300 mt-1">{cat.category}</div>
                  </button>
                )
              })}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <button onClick={() => { setQuizActive(false); setSelectedCategory(null) }}
            aria-label="Back to quiz selection"
            className="text-sm font-semibold text-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400"
          >← Back</button>

          <div className="text-center text-sm" style={{ color: textSecondary }} aria-live="polite" role="status">
            Score: <span className="text-emerald-400 font-bold">{score.correct}</span>
            <span className="mx-2">·</span>
            <span className="text-red-400 font-bold">{score.wrong}</span>
            <span className="mx-2">·</span>
            Streak: 🔥 {streak}
          </div>

          <div className="rounded-2xl p-8 text-center border" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)' }}>
            <div className="text-xs mb-2 font-semibold" style={{ color: textSecondary }}>
              {quizType === 'alpha' ? 'Which character is this?' : 'What is the translation for:'}
            </div>
            <div className="text-4xl font-black mb-3">
              {quizType === 'alpha' ? (quizWord as any)?.name : (quizWord as WordItem)?.english}
            </div>
            {quizType === 'words' && <div className="text-indigo-400 text-sm">{(quizWord as WordItem)?.meaning}</div>}
          </div>

          <div className="grid grid-cols-2 gap-3">
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

                if (isCorrectOpt) {
                  btnStyle = { background: '#10b981', borderColor: '#10b981', color: 'white' }
                } else if (isSelected) {
                  btnStyle = { background: '#ef4444', borderColor: '#ef4444', color: 'white' }
                } else {
                  btnStyle = { background: darkMode ? 'rgba(30,41,59,0.4)' : '#f1f5f9', borderColor: 'rgba(99,102,241,0.1)', color: '#64748b' }
                }
              }
              return (
                <motion.button
                  key={i}
                  whileHover={!selectedAnswer ? { scale: 1.03 } : {}}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => quizType === 'alpha' ? handleQuizAnswer(opt) : handleWordAnswer(opt as WordItem)}
                  disabled={!!selectedAnswer}
                  aria-label={`Option: ${quizType === 'alpha' ? (opt as any).char : (opt as WordItem).native}`}
                  className="p-4 rounded-xl border-2 font-bold transition-all text-lg focus-visible:ring-2 focus-visible:ring-indigo-400"
                  style={btnStyle}
                >
                  <div>{quizType === 'alpha' ? (opt as any).char : (opt as WordItem).native}</div>
                  <div className="text-xs mt-1 opacity-60">{quizType === 'alpha' ? (opt as any).english : (opt as WordItem).pronunciation}</div>
                </motion.button>
              )
            })}
          </div>

          {quizFeedback && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center" aria-live="polite">
              <div className={`text-2xl font-black mb-3 ${quizFeedback === 'correct' ? 'text-emerald-400' : 'text-red-400'}`}>
                {quizFeedback === 'correct' ? '✅ Excellent!' : `❌ It was "${(quizWord as WordItem)?.native}"`}
              </div>
              <button
                onClick={nextQuestion} aria-label="Next question"
                className="px-8 py-3 rounded-xl font-bold text-white text-sm focus-visible:ring-2 focus-visible:ring-indigo-400"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >Next →</button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}

export default QuizPage