import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { getJourney } from '../data/journey'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useSounds } from '../hooks/useSounds'
import { LANGUAGES } from '../i18n/languages'
import type { Language } from '../types'
import { Map, Lock, CheckCircle2, Play, Flame, Trophy, Star } from 'lucide-react'

const WEEK_LABELS = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
const WEEK_SUBTITLES = [
  'Word Foundation',
  'Basic Sentences',
  'Conversation',
  'Fluency & Confidence',
]

export function JourneyPage() {
  const navigate = useNavigate()
  const sounds = useSounds()

  const darkMode = useAppStore(s => s.darkMode)
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const currentJourneyDay = useAppStore(s => s.currentJourneyDay)
  const completedJourneyDays = useAppStore(s => s.completedJourneyDays)
  const journeyXP = useAppStore(s => s.journeyXP)
  const journeyStreak = useAppStore(s => s.journeyStreak)
  const journeyStartDate = useAppStore(s => s.journeyStartDate)
  const startJourney = useAppStore(s => s.startJourney)
  const getJourneyProgress = useAppStore(s => s.getJourneyProgress)

  const [selectedWeek, setSelectedWeek] = useState(1)

  const journey = getJourney(currentLanguage)
  const progress = getJourneyProgress()

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'
  const borderColor = darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'

  const getDayStatus = (day: number): 'locked' | 'active' | 'completed' => {
    if (completedJourneyDays.includes(day)) return 'completed'
    if (day === currentJourneyDay) return 'active'
    if (day < currentJourneyDay) return 'active' // past days that weren't completed
    return 'locked'
  }

  const handleDayClick = (day: number) => {
    const status = getDayStatus(day)
    if (status === 'locked') {
      sounds.playWrong()
      return
    }
    sounds.playClick()
    if (!journeyStartDate) {
      startJourney()
    }
    navigate(`/journey/${day}`)
  }

  const weekDays = journey.filter(d => d.week === selectedWeek)

  const langFlag = LANGUAGES[currentLanguage as Language]?.flag || '🌐'

  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl p-6 overflow-hidden"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)'
            : 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #e0e7ff 100%)',
        }}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
            <Map className="text-white" size={32} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white/60 text-sm font-medium mb-1">30-Day Learning Journey</div>
            <h3 className="text-white text-lg font-bold truncate">{langFlag} {LANGUAGES[currentLanguage as Language]?.name} Journey</h3>
            <p className="text-white/60 text-sm truncate">
              {progress.completedDays} of {journey.length} days completed
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress.percent}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
              <span className="text-white/80 text-sm font-bold">{progress.percent}%</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            {journeyStreak > 0 && (
              <div className="bg-white/20 backdrop-blur rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                <Flame size={16} className="text-orange-400" />
                <span className="text-white font-bold text-sm">{journeyStreak}</span>
              </div>
            )}
            <div className="bg-white/20 backdrop-blur rounded-xl px-3 py-1.5 flex items-center gap-1.5">
              <Star size={16} className="text-yellow-400" />
              <span className="text-white font-bold text-sm">{journeyXP}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Week selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {WEEK_LABELS.map((label, i) => {
          const week = i + 1
          const isActive = selectedWeek === week
          const hasData = journey.some(d => d.week === week)
          return (
            <motion.button
              key={week}
              whileTap={{ scale: 0.95 }}
              onClick={() => { sounds.playClick(); setSelectedWeek(week) }}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                isActive
                  ? darkMode
                    ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                    : 'bg-indigo-50 border-indigo-300 text-indigo-600'
                  : darkMode
                    ? 'bg-slate-800/60 border-slate-700 text-slate-400 hover:border-indigo-400/30'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
              } ${!hasData ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center gap-2">
                <span>{label}</span>
                <span className="text-[10px] opacity-60 font-medium">{WEEK_SUBTITLES[i]}</span>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Day grid */}
      <div>
        <SectionHeader
          title={WEEK_LABELS[selectedWeek - 1]}
          subtitle={WEEK_SUBTITLES[selectedWeek - 1]}
          icon="📅"
          darkMode={darkMode}
        />

        {weekDays.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-8 text-center border"
            style={{ background: bgCard, borderColor }}
          >
            <div className="text-4xl mb-3">🚧</div>
            <h3 className="font-bold text-lg mb-1" style={{ color: textPrimary }}>
              Coming Soon
            </h3>
            <p className="text-sm" style={{ color: textSecondary }}>
              {LANGUAGES[currentLanguage as Language]?.name} journey data for {WEEK_LABELS[selectedWeek - 1]} is being prepared.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {weekDays.map((day, i) => {
              const status = getDayStatus(day.day)
              const isCompleted = status === 'completed'
              const isActive = status === 'active'
              const isLocked = status === 'locked'

              return (
                <motion.button
                  key={day.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={isLocked ? {} : { y: -4, scale: 1.02 }}
                  whileTap={isLocked ? {} : { scale: 0.97 }}
                  onClick={() => handleDayClick(day.day)}
                  className={`relative rounded-2xl p-4 border text-left transition-all ${
                    isCompleted
                      ? darkMode
                        ? 'border-emerald-500/30 bg-emerald-500/10'
                        : 'border-emerald-300 bg-emerald-50'
                      : isActive
                        ? darkMode
                          ? 'border-indigo-500/30 bg-indigo-500/10 hover:border-indigo-400/50 hover:shadow-lg hover:shadow-indigo-500/10'
                          : 'border-indigo-300 bg-indigo-50 hover:border-indigo-400'
                        : darkMode
                          ? 'border-slate-700 bg-slate-800/40 opacity-60'
                          : 'border-slate-200 bg-slate-100 opacity-60'
                  }`}
                >
                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    {isCompleted ? (
                      <CheckCircle2 size={18} className="text-emerald-400" />
                    ) : isActive ? (
                      <Play size={18} className="text-indigo-400" />
                    ) : (
                      <Lock size={16} className="text-slate-500" />
                    )}
                  </div>

                  {/* Day number */}
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-2 opacity-60" style={{ color: textSecondary }}>
                    Day {day.day}
                  </div>

                  {/* Icon */}
                  <div className="text-3xl mb-2">{day.icon}</div>

                  {/* Theme */}
                  <h3 className="font-bold text-sm mb-1 truncate" style={{ color: textPrimary }}>
                    {day.theme}
                  </h3>
                  <p className="text-xs line-clamp-2 mb-3" style={{ color: textSecondary }}>
                    {day.subtitle}
                  </p>

                  {/* XP & words */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400">
                      +{day.xpReward} XP
                    </span>
                    <span className="text-[10px] opacity-60" style={{ color: textSecondary }}>
                      {day.vocabulary.length} words
                    </span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        )}
      </div>

      {/* Weekly progress summary */}
      {weekDays.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-5 border"
          style={{ background: bgCard, borderColor }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Trophy size={18} className="text-amber-400" />
            <h3 className="font-bold text-sm" style={{ color: textPrimary }}>Journey Stats</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-black text-indigo-400">{progress.completedDays}</div>
              <div className="text-xs" style={{ color: textSecondary }}>Days Done</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-amber-400">{journeyXP}</div>
              <div className="text-xs" style={{ color: textSecondary }}>Journey XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-orange-400">{journeyStreak}</div>
              <div className="text-xs" style={{ color: textSecondary }}>Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-400">{progress.percent}%</div>
              <div className="text-xs" style={{ color: textSecondary }}>Complete</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default JourneyPage
