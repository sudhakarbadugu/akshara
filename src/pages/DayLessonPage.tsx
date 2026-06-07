import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { getJourney } from '../data/journey'
import { SectionHeader } from '../components/ui/SectionHeader'
import { SpeechButton } from '../components/SpeechButton'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import { useSpeech } from '../hooks/useSpeech'
import { LANGUAGES } from '../i18n/languages'
import type { Language, JourneyDay, JourneyActivity } from '../types'
import {
  ArrowRight, ArrowLeft, CheckCircle2, XCircle, Volume2,
  Lock, Star, Trophy, Flame, RotateCcw, Home, Map
} from 'lucide-react'

// ─── Activity Components ───

function TapListenActivity({ activity, voiceLang, darkMode, onComplete }: {
  activity: JourneyActivity
  voiceLang: string
  darkMode: boolean
  onComplete: (correct: boolean) => void
}) {
  const { data } = activity
  const audioWord = (data as any).audioWord as string
  const options = (data as any).options as string[]
  const correctIndex = (data as any).correctIndex as number

  const sounds = useSounds()
  const { speak } = useSpeech()
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      speak(audioWord, voiceLang, 0.75).catch(() => {})
    }, 500)
    return () => clearTimeout(timer)
  }, [audioWord, voiceLang, speak])

  const handleSelect = (idx: number) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    const correct = idx === correctIndex
    if (correct) {
      sounds.playCorrect()
    } else {
      sounds.playWrong()
    }
    onComplete(correct)
  }

  const playAudio = () => {
    speak(audioWord, voiceLang, 0.75).catch(() => {})
  }

  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'

  return (
    <div className="space-y-4">
      <button
        onClick={playAudio}
        className={`w-full py-4 rounded-2xl border flex items-center justify-center gap-3 transition-all ${
          darkMode
            ? 'border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20'
            : 'border-indigo-300 bg-indigo-50 hover:bg-indigo-100'
        }`}
      >
        <Volume2 size={24} className="text-indigo-400" />
        <span className="font-bold" style={{ color: textPrimary }}>🔊 Tap to hear again</span>
      </button>

      <div className="grid grid-cols-2 gap-3">
        {options.map((opt, idx) => {
          const isSelected = selected === idx
          const isCorrect = idx === correctIndex
          const showCorrect = answered && isCorrect
          const showWrong = answered && isSelected && !isCorrect

          return (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className={`py-4 px-4 rounded-2xl border text-center font-bold text-sm transition-all ${
                showCorrect
                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
                  : showWrong
                    ? 'border-red-500/40 bg-red-500/15 text-red-400'
                    : darkMode
                      ? 'border-slate-700 bg-slate-800/60 hover:border-indigo-400/40'
                      : 'border-slate-200 bg-white hover:border-indigo-300'
              }`}
            >
              {showCorrect && <CheckCircle2 size={16} className="inline mr-1 mb-0.5" />}
              {showWrong && <XCircle size={16} className="inline mr-1 mb-0.5" />}
              {opt}
            </motion.button>
          )
        })}
      </div>

      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center py-3 rounded-xl ${
            selected === correctIndex
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-amber-500/10 text-amber-400'
          }`}
        >
          {selected === correctIndex ? '✅ Correct! Well done!' : `⚠️ The correct answer was: ${options[correctIndex]}`}
        </motion.div>
      )}
    </div>
  )
}

function MatchActivity({ activity, voiceLang, darkMode, onComplete }: {
  activity: JourneyActivity
  voiceLang: string
  darkMode: boolean
  onComplete: (correct: boolean) => void
}) {
  const pairs = (activity.data as any).pairs as { native: string; english: string }[]
  const sounds = useSounds()
  const { speak } = useSpeech()

  const [leftSelected, setLeftSelected] = useState<string | null>(null)
  const [rightSelected, setRightSelected] = useState<string | null>(null)
  const [matched, setMatched] = useState<string[]>([])
  const [shakeId, setShakeId] = useState<string | null>(null)

  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'

  const shuffledLeft = pairs.map(p => p.native).sort(() => Math.random() - 0.5)
  const shuffledRight = pairs.map(p => p.english).sort(() => Math.random() - 0.5)

  useEffect(() => {
    if (matched.length === pairs.length) {
      onComplete(true)
    }
  }, [matched.length, pairs.length, onComplete])

  const handleLeft = (native: string) => {
    if (matched.includes(native)) return
    sounds.playClick()
    speak(native, voiceLang, 0.75).catch(() => {})
    if (rightSelected) {
      const pair = pairs.find(p => p.native === native && p.english === rightSelected)
      if (pair) {
        sounds.playMatch()
        setMatched(prev => [...prev, native])
        setLeftSelected(null)
        setRightSelected(null)
      } else {
        sounds.playWrong()
        setShakeId(native)
        setTimeout(() => setShakeId(null), 400)
        setLeftSelected(null)
        setRightSelected(null)
      }
    } else {
      setLeftSelected(native)
    }
  }

  const handleRight = (english: string) => {
    if (leftSelected) {
      const pair = pairs.find(p => p.native === leftSelected && p.english === english)
      if (pair) {
        sounds.playMatch()
        setMatched(prev => [...prev, leftSelected])
        setLeftSelected(null)
        setRightSelected(null)
      } else {
        sounds.playWrong()
        setShakeId(english)
        setTimeout(() => setShakeId(null), 400)
        setLeftSelected(null)
        setRightSelected(null)
      }
    } else {
      setRightSelected(english)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Left column — native words */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-60" style={{ color: textSecondary }}>Word</div>
          {shuffledLeft.map((native) => {
            const isMatched = matched.includes(native)
            const isSelected = leftSelected === native
            return (
              <motion.button
                key={native}
                whileTap={{ scale: 0.95 }}
                animate={shakeId === native ? { x: [0, -8, 8, -4, 4, 0] } : {}}
                transition={{ duration: 0.3 }}
                onClick={() => handleLeft(native)}
                disabled={isMatched}
                className={`w-full py-3 px-3 rounded-xl border text-sm font-bold text-center transition-all ${
                  isMatched
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                    : isSelected
                      ? 'border-indigo-500/40 bg-indigo-500/20 text-indigo-300'
                      : darkMode
                        ? 'border-slate-700 bg-slate-800/60 hover:border-indigo-400/40'
                        : 'border-slate-200 bg-white hover:border-indigo-300'
                }`}
              >
                {native}
              </motion.button>
            )
          })}
        </div>

        {/* Right column — english meanings */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-60" style={{ color: textSecondary }}>Meaning</div>
          {shuffledRight.map((english) => {
            const isMatched = pairs.some(p => matched.includes(p.native) && p.english === english)
            const isSelected = rightSelected === english
            return (
              <motion.button
                key={english}
                whileTap={{ scale: 0.95 }}
                animate={shakeId === english ? { x: [0, -8, 8, -4, 4, 0] } : {}}
                transition={{ duration: 0.3 }}
                onClick={() => handleRight(english)}
                disabled={isMatched}
                className={`w-full py-3 px-3 rounded-xl border text-sm font-medium text-center transition-all ${
                  isMatched
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                    : isSelected
                      ? 'border-indigo-500/40 bg-indigo-500/20 text-indigo-300'
                      : darkMode
                        ? 'border-slate-700 bg-slate-800/60 hover:border-indigo-400/40'
                        : 'border-slate-200 bg-white hover:border-indigo-300'
                }`}
              >
                {english}
              </motion.button>
            )
          })}
        </div>
      </div>

      {matched.length === pairs.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-3 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold"
        >
          🎉 All pairs matched! Great job!
        </motion.div>
      )}
    </div>
  )
}

function WriteActivity({ activity, voiceLang, darkMode, onComplete }: {
  activity: JourneyActivity
  voiceLang: string
  darkMode: boolean
  onComplete: (correct: boolean) => void
}) {
  const targetWord = (activity.data as any).targetWord as string
  const hint = (activity.data as any).hint as string
  const { speak } = useSpeech()
  const sounds = useSounds()
  const [practiced, setPracticed] = useState(false)

  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'

  return (
    <div className="space-y-4 text-center">
      <div
        className="text-4xl font-black py-6 rounded-2xl border"
        style={{
          color: '#fbbf24',
          borderColor: darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)',
          background: darkMode ? 'rgba(30,41,59,0.5)' : 'rgba(255,255,255,0.7)',
        }}
      >
        {targetWord}
      </div>

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-medium" style={{ color: textSecondary }}>Hint:</span>
        <span className="text-sm font-bold text-indigo-400">{hint}</span>
        <SpeechButton text={targetWord} lang={voiceLang} size="sm" />
      </div>

      <p className="text-sm" style={{ color: textSecondary }}>
        Practice writing this word on paper. Trace the letters carefully!
      </p>

      {!practiced ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => { sounds.playClick(); setPracticed(true); onComplete(true) }}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
            darkMode
              ? 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30'
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-300'
          }`}
        >
          ✍️ I practiced writing
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-3 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold"
        >
          ✅ Practice recorded!
        </motion.div>
      )}
    </div>
  )
}

function SpeakActivity({ activity, voiceLang, darkMode, onComplete }: {
  activity: JourneyActivity
  voiceLang: string
  darkMode: boolean
  onComplete: (correct: boolean) => void
}) {
  const targetWords = (activity.data as any).targetWords as string[]
  const sounds = useSounds()
  const [practiced, setPracticed] = useState(false)

  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {targetWords.map((word, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center justify-between py-3 px-4 rounded-xl border ${
              darkMode
                ? 'border-slate-700 bg-slate-800/60'
                : 'border-slate-200 bg-white'
            }`}
          >
            <span className="font-bold text-lg" style={{ color: textPrimary }}>{word}</span>
            <SpeechButton text={word} lang={voiceLang} size="sm" showMic />
          </motion.div>
        ))}
      </div>

      {!practiced ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => { sounds.playClick(); setPracticed(true); onComplete(true) }}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
            darkMode
              ? 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30'
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-300'
          }`}
        >
          🎤 I practiced speaking
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-3 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold"
        >
          ✅ Speaking practice recorded!
        </motion.div>
      )}
    </div>
  )
}

function QuizSection({ questions, darkMode, onComplete }: {
  questions: { question: string; options: string[]; correct: number; correctAnswer: string }[]
  darkMode: boolean
  onComplete: (score: number) => void
}) {
  const sounds = useSounds()
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'

  const handleSelect = (idx: number) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    const q = questions[currentQ]
    const correct = idx === q.correct
    if (correct) {
      sounds.playCorrect()
      setScore(s => s + 1)
    } else {
      sounds.playWrong()
    }
  }

  const handleNext = () => {
    sounds.playClick()
    if (currentQ + 1 >= questions.length) {
      setFinished(true)
      onComplete(score + (selected === questions[currentQ].correct ? 1 : 0))
    } else {
      setCurrentQ(c => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  if (finished) {
    const total = questions.length
    const finalScore = score + (selected === questions[currentQ].correct ? 1 : 0)
    const allCorrect = finalScore === total
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4 py-6"
      >
        <div className="text-5xl mb-2">{allCorrect ? '🏆' : '⭐'}</div>
        <h3 className="text-xl font-bold" style={{ color: textPrimary }}>
          Quiz Complete!
        </h3>
        <div className="text-3xl font-black text-indigo-400">
          {finalScore} / {total}
        </div>
        <p className={`text-sm ${allCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
          {allCorrect ? 'Perfect score! Amazing!' : 'Good effort! Keep practicing!'}
        </p>
      </motion.div>
    )
  }

  const q = questions[currentQ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: darkMode ? '#94a3b8' : '#475569' }}>
          Question {currentQ + 1} of {questions.length}
        </span>
        <span className="text-xs font-bold text-amber-400">Score: {score}</span>
      </div>

      <h3 className="font-bold text-base" style={{ color: textPrimary }}>{q.question}</h3>

      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          const isSelected = selected === idx
          const isCorrect = idx === q.correct
          const showCorrect = answered && isCorrect
          const showWrong = answered && isSelected && !isCorrect

          return (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className={`w-full py-3 px-4 rounded-xl border text-left font-medium text-sm transition-all ${
                showCorrect
                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
                  : showWrong
                    ? 'border-red-500/40 bg-red-500/15 text-red-400'
                    : isSelected
                      ? 'border-indigo-500/40 bg-indigo-500/15 text-indigo-400'
                      : darkMode
                        ? 'border-slate-700 bg-slate-800/60 hover:border-indigo-400/40'
                        : 'border-slate-200 bg-white hover:border-indigo-300'
              }`}
            >
              {showCorrect && <CheckCircle2 size={16} className="inline mr-2 mb-0.5" />}
              {showWrong && <XCircle size={16} className="inline mr-2 mb-0.5" />}
              {opt}
            </motion.button>
          )
        })}
      </div>

      {answered && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button
            onClick={handleNext}
            className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-colors"
          >
            {currentQ + 1 >= questions.length ? 'See Results →' : 'Next Question →'}
          </button>
        </motion.div>
      )}
    </div>
  )
}

// ─── Main DayLessonPage ───

const SECTIONS = [
  'intro',
  'vocabulary',
  'learningCard',
  'sentence',
  'activities',
  'quiz',
  'realLife',
  'completion',
] as const

type Section = typeof SECTIONS[number]

export function DayLessonPage() {
  const { day: dayParam } = useParams<{ day: string }>()
  const navigate = useNavigate()
  const sounds = useSounds()
  const mascot = useMascot()
  const { speak } = useSpeech()

  const dayNum = parseInt(dayParam || '1', 10)

  const darkMode = useAppStore(s => s.darkMode)
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const currentJourneyDay = useAppStore(s => s.currentJourneyDay)
  const completedJourneyDays = useAppStore(s => s.completedJourneyDays)
  const journeyStartDate = useAppStore(s => s.journeyStartDate)
  const startJourney = useAppStore(s => s.startJourney)
  const completeDay = useAppStore(s => s.completeDay)
  const setShowConfetti = useAppStore(s => s.setShowConfetti)

  const [section, setSection] = useState<Section>('intro')
  const [activityResults, setActivityResults] = useState<boolean[]>([])
  const [quizScore, setQuizScore] = useState(0)
  const [totalXP, setTotalXP] = useState(0)

  const journey = getJourney(currentLanguage)
  const dayData = journey.find(d => d.day === dayNum)

  const voiceLang = LANGUAGES[currentLanguage as Language]?.voiceLang || 'en-US'

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'
  const borderColor = darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'

  useEffect(() => {
    if (!journeyStartDate) {
      startJourney()
    }
  }, [journeyStartDate, startJourney])

  useEffect(() => {
    setSection('intro')
    setActivityResults([])
    setQuizScore(0)
    setTotalXP(0)
  }, [dayNum])

  if (!dayData) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4">😕</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: textPrimary }}>Day not found</h2>
        <p className="text-sm mb-6" style={{ color: textSecondary }}>
          This day's content is not available yet for {LANGUAGES[currentLanguage as Language]?.name}.
        </p>
        <button
          onClick={() => navigate('/journey')}
          className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-bold text-sm"
        >
          ← Back to Journey
        </button>
      </div>
    )
  }

  const sectionIndex = SECTIONS.indexOf(section)
  const progress = ((sectionIndex + 1) / SECTIONS.length) * 100

  const handleNext = () => {
    sounds.playClick()
    const nextIdx = sectionIndex + 1
    if (nextIdx < SECTIONS.length) {
      setSection(SECTIONS[nextIdx])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrev = () => {
    sounds.playClick()
    const prevIdx = sectionIndex - 1
    if (prevIdx >= 0) {
      setSection(SECTIONS[prevIdx])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleActivityComplete = (correct: boolean) => {
    setActivityResults(prev => [...prev, correct])
    if (correct) {
      sounds.playCorrect()
      mascot.celebrate()
    }
  }

  const handleQuizComplete = (score: number) => {
    setQuizScore(score)
    const xp = score * 10
    setTotalXP(prev => prev + xp)
    if (score === dayData.quiz.length) {
      sounds.playStar()
    }
  }

  const handleFinish = () => {
    const activityXP = activityResults.filter(Boolean).length * 5
    const baseXP = dayData.xpReward
    const finalXP = baseXP + activityXP + quizScore * 10
    setTotalXP(finalXP)

    const result = completeDay(dayNum, finalXP)
    if (result.leveledUp) {
      sounds.playLevelUp()
    } else {
      sounds.playAchievement()
    }
    setShowConfetti(true)
    setSection('completion')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isDayCompleted = completedJourneyDays.includes(dayNum)
  const isDayLocked = dayNum > currentJourneyDay && !isDayCompleted

  // ─── Section: Intro ───
  if (section === 'intro') {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="text-6xl">{dayData.icon}</div>
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-1">
              Day {dayData.day} · Week {dayData.week}
            </div>
            <h1 className="text-3xl font-black" style={{ color: textPrimary }}>{dayData.theme}</h1>
            <p className="text-base mt-2" style={{ color: textSecondary }}>{dayData.subtitle}</p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Star size={14} className="text-amber-400" />
              <span className="text-xs font-bold text-amber-400">+{dayData.xpReward} XP</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <Volume2 size={14} className="text-indigo-400" />
              <span className="text-xs font-bold text-indigo-400">{dayData.vocabulary.length} words</span>
            </div>
          </div>

          <div className="rounded-2xl p-5 border text-left" style={{ background: bgCard, borderColor }}>
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={16} className="text-indigo-400" />
              <span className="text-sm font-bold" style={{ color: textPrimary }}>Daily Goal</span>
            </div>
            <p className="text-sm" style={{ color: textSecondary }}>{dayData.dailyGoal}</p>
          </div>

          {isDayLocked && (
            <div className="rounded-2xl p-4 border bg-amber-500/10 border-amber-500/20 text-amber-400 text-sm font-bold">
              🔒 Complete Day {currentJourneyDay} first to unlock this day.
            </div>
          )}

          {isDayCompleted && (
            <div className="rounded-2xl p-4 border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 text-sm font-bold">
              ✅ You already completed this day! Replay for practice.
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            disabled={isDayLocked}
            className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all ${
              isDayLocked
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
            }`}
          >
            {isDayCompleted ? '▶️ Replay Day' : '🚀 Start Day'}
          </motion.button>
        </motion.div>
      </div>
    )
  }

  // ─── Shared wrapper for lesson sections ───
  const SectionWrapper = ({ children, title }: { children: React.ReactNode; title: string }) => (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress bar */}
      <div className="sticky top-0 z-30 py-2" style={{ background: darkMode ? '#0f172a' : '#f1f5f9' }}>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl hover:bg-slate-700/30 transition-colors"
            style={{ color: textSecondary }}
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 h-2 bg-slate-700/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs font-bold text-indigo-400">{Math.round(progress)}%</span>
        </div>
      </div>

      <SectionHeader title={title} darkMode={darkMode} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 border"
        style={{ background: bgCard, borderColor }}
      >
        {children}
      </motion.div>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-colors flex items-center gap-2"
        >
          Continue <ArrowRight size={16} />
        </motion.button>
      </div>
    </div>
  )

  // ─── Section: Vocabulary ───
  if (section === 'vocabulary') {
    return (
      <SectionWrapper title={`${dayData.theme} — Vocabulary`}>
        <div className="grid grid-cols-2 gap-3">
          {dayData.vocabulary.map((word, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl p-3 border flex flex-col gap-1.5 ${
                darkMode
                  ? 'border-slate-700 bg-slate-800/60'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className="font-black text-lg"
                  style={{
                    fontFamily: currentLanguage !== 'english'
                      ? '"Noto Sans Tamil", "Noto Sans Devanagari", "Noto Sans Telugu", serif'
                      : 'inherit',
                    color: '#fbbf24',
                  }}
                >
                  {word.native}
                </span>
                <SpeechButton text={word.native} lang={voiceLang} size="sm" />
              </div>
              <div className="text-xs font-bold text-indigo-300">{word.english}</div>
              <div className="text-[10px] text-slate-400">{word.pronunciation}</div>
              <div className="text-[10px] text-slate-500">{word.meaning}</div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    )
  }

  // ─── Section: Learning Card ───
  if (section === 'learningCard') {
    const card = dayData.learningCard
    return (
      <SectionWrapper title="Featured Word">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-5xl font-black py-8 rounded-2xl border"
            style={{
              fontFamily: currentLanguage !== 'english'
                ? '"Noto Sans Tamil", "Noto Sans Devanagari", "Noto Sans Telugu", serif'
                : 'inherit',
              color: '#fbbf24',
              borderColor: darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)',
              background: darkMode ? 'rgba(30,41,59,0.5)' : 'rgba(255,255,255,0.7)',
            }}
          >
            {card.native}
          </motion.div>

          <div className="flex items-center justify-center gap-3">
            <span className="text-lg font-bold" style={{ color: textPrimary }}>{card.english}</span>
            <SpeechButton text={card.native} lang={voiceLang} size="md" />
          </div>

          <div className="text-sm font-medium text-indigo-400">{card.pronunciation}</div>
          <div className="text-sm" style={{ color: textSecondary }}>{card.meaning}</div>

          {card.tip && (
            <div className="rounded-xl p-4 border bg-amber-500/10 border-amber-500/20 text-amber-400 text-sm">
              💡 {card.tip}
            </div>
          )}
        </div>
      </SectionWrapper>
    )
  }

  // ─── Section: Sentence of the Day ───
  if (section === 'sentence') {
    const sentence = dayData.sentenceOfDay
    return (
      <SectionWrapper title="Sentence of the Day">
        <div className="space-y-4">
          <div className="text-center space-y-3">
            <div
              className="text-2xl font-bold leading-relaxed"
              style={{
                fontFamily: currentLanguage !== 'english'
                  ? '"Noto Sans Tamil", "Noto Sans Devanagari", "Noto Sans Telugu", serif'
                  : 'inherit',
                color: '#fbbf24',
              }}
            >
              {sentence.native}
            </div>
            <div className="text-sm font-medium" style={{ color: textSecondary }}>{sentence.english}</div>
            <div className="text-xs text-indigo-400">{sentence.pronunciation}</div>
            <SpeechButton text={sentence.native} lang={voiceLang} size="md" />
          </div>

          {sentence.wordByWordBreakdown && sentence.wordByWordBreakdown.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: textSecondary }}>
                Word-by-word Breakdown
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {sentence.wordByWordBreakdown.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`rounded-lg p-2.5 border text-center ${
                      darkMode
                        ? 'border-slate-700 bg-slate-800/40'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="font-bold text-sm" style={{ color: textPrimary }}>{item.word}</div>
                    <div className="text-[10px] text-slate-400">{item.meaning}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionWrapper>
    )
  }

  // ─── Section: Activities ───
  if (section === 'activities') {
    return (
      <SectionWrapper title="Activities">
        <div className="space-y-6">
          {dayData.activities.map((activity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-xl p-4 border ${
                darkMode
                  ? 'border-slate-700 bg-slate-800/40'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-bold" style={{ color: textPrimary }}>{activity.title}</div>
                  <div className="text-xs" style={{ color: textSecondary }}>{activity.instruction}</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400">
                  +{activity.xpReward} XP
                </span>
              </div>

              {activity.type === 'tap-listen' && (
                <TapListenActivity activity={activity} voiceLang={voiceLang} darkMode={darkMode} onComplete={handleActivityComplete} />
              )}
              {activity.type === 'match' && (
                <MatchActivity activity={activity} voiceLang={voiceLang} darkMode={darkMode} onComplete={handleActivityComplete} />
              )}
              {activity.type === 'write' && (
                <WriteActivity activity={activity} voiceLang={voiceLang} darkMode={darkMode} onComplete={handleActivityComplete} />
              )}
              {activity.type === 'speak' && (
                <SpeakActivity activity={activity} voiceLang={voiceLang} darkMode={darkMode} onComplete={handleActivityComplete} />
              )}
              {['arrange', 'listen-fill', 'dialogue'].includes(activity.type) && (
                <div className="text-center py-4 text-sm text-slate-400">
                  🚧 {activity.type} activity — available in later weeks
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    )
  }

  // ─── Section: Quiz ───
  if (section === 'quiz') {
    return (
      <SectionWrapper title="Quiz">
        <QuizSection questions={dayData.quiz} darkMode={darkMode} onComplete={handleQuizComplete} />
      </SectionWrapper>
    )
  }

  // ─── Section: Real Life Usage ───
  if (section === 'realLife') {
    return (
      <SectionWrapper title="Real-Life Usage">
        <div className="space-y-3">
          {dayData.realLifeUsage.map((usage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-start gap-3 p-4 rounded-xl border ${
                darkMode
                  ? 'border-slate-700 bg-slate-800/40'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <span className="text-lg flex-shrink-0">💬</span>
              <p className="text-sm leading-relaxed" style={{ color: textPrimary }}>{usage}</p>
            </motion.div>
          ))}
        </div>

        {dayData.revisionWords.length > 0 && (
          <div className="mt-4">
            <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-60" style={{ color: textSecondary }}>
              Revision Words
            </div>
            <div className="flex flex-wrap gap-2">
              {dayData.revisionWords.map((word, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/20"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Finish button replaces Continue */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleFinish}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-colors flex items-center gap-2"
          >
            <CheckCircle2 size={16} />
            Complete Day
          </motion.button>
        </div>
      </SectionWrapper>
    )
  }

  // ─── Section: Completion ───
  if (section === 'completion') {
    const allCorrect = quizScore === dayData.quiz.length
    const activityCorrect = activityResults.filter(Boolean).length

    return (
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="space-y-4"
        >
          <div className="text-6xl">{allCorrect ? '🎉' : '⭐'}</div>
          <h1 className="text-3xl font-black" style={{ color: textPrimary }}>
            Day {dayData.day} Complete!
          </h1>
          <p className="text-base" style={{ color: textSecondary }}>
            Great job completing <strong>{dayData.theme}</strong>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-6 border"
          style={{ background: bgCard, borderColor }}
        >
          <h3 className="font-bold text-sm mb-4" style={{ color: textPrimary }}>XP Earned</h3>
          <div className="text-5xl font-black text-amber-400 mb-4">+{totalXP}</div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between" style={{ color: textSecondary }}>
              <span>Base completion</span>
              <span className="font-bold">{dayData.xpReward} XP</span>
            </div>
            <div className="flex justify-between" style={{ color: textSecondary }}>
              <span>Activities ({activityCorrect}/{dayData.activities.length})</span>
              <span className="font-bold">+{activityCorrect * 5} XP</span>
            </div>
            <div className="flex justify-between" style={{ color: textSecondary }}>
              <span>Quiz ({quizScore}/{dayData.quiz.length} correct)</span>
              <span className="font-bold">+{quizScore * 10} XP</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          {dayNum < journey.length && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                sounds.playClick()
                navigate(`/journey/${dayNum + 1}`)
              }}
              className="px-8 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
            >
              Next Day <ArrowRight size={18} />
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              sounds.playClick()
              navigate('/journey')
            }}
            className={`px-8 py-4 rounded-2xl font-bold text-base transition-colors flex items-center justify-center gap-2 ${
              darkMode
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
            }`}
          >
            <Map size={18} />
            Journey Hub
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return null
}

export default DayLessonPage
