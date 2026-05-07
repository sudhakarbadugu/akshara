import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { LearningCard } from '../components/ui/LearningCard'
import { SectionHeader, ContinueLearningBanner } from '../components/ui/SectionHeader'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import { useAdaptiveLearning } from '../hooks/useAdaptiveLearning'
import { getAlphabets } from '../data/alphabets'

const pathIdToCatId = (pathId: string): number => {
  const map: Record<string, number> = {
    greetings: 1, numbers: 2, 'numbers-1k': 9, 'numbers-lakh': 10,
    family: 3, food: 4, colors: 5, days: 6, phrases: 7, body: 8,
  }
  return map[pathId] || 1
}

// Gunihalu uses alphabet practice mode
const isAlphabetPath = (pathId: string): boolean => {
  return pathId === 'alphabets' || pathId === 'gunihalu'
}

type PathRoute = 'practice' | 'flashcard' | 'match' | 'quiz'

interface PathConfig {
  route: PathRoute
  label: string
}

const pathConfig: Record<string, PathConfig> = {
  alphabets:  { route: 'practice',  label: '✍️ Practice' },
  gunihalu:   { route: 'flashcard', label: '🔣 Gunithalu' },
  greetings:  { route: 'flashcard', label: '🃏 Flashcards' },
  numbers:    { route: 'flashcard', label: '📖 Study' },
  'numbers-1k': { route: 'flashcard', label: '📖 Study' },
  'numbers-lakh': { route: 'flashcard', label: '📖 Study' },
  family:     { route: 'flashcard', label: '🃏 Flashcards' },
  food:       { route: 'quiz',      label: '📝 Quiz' },
  colors:     { route: 'match',     label: '🧩 Match' },
  days:       { route: 'flashcard', label: '🃏 Flashcards' },
  phrases:    { route: 'quiz',      label: '📝 Quiz' },
  body:       { route: 'match',     label: '🧩 Match' },
}

const routePaths: Record<PathRoute, string> = {
  practice: '/practice',
  flashcard: '/flashcard',
  match: '/match',
  quiz: '/quiz',
}

export function HomePage() {
  const navigate = useNavigate()
  const sounds = useSounds()
  const mascot = useMascot()
  const adaptive = useAdaptiveLearning()

  const darkMode = useAppStore(s => s.darkMode)
  const xp = useAppStore(s => s.xp)
  const level = useAppStore(s => s.level)
  const streak = useAppStore(s => s.streak)
  const checkAndUpdateStreak = useAppStore(s => s.checkAndUpdateStreak)
  const learnedAlphabets = useAppStore(s => s.learnedAlphabets)
  const learnedWords = useAppStore(s => s.learnedWords)
  const getUpdatedPaths = useAppStore(s => s.getUpdatedPaths)
  const getAchievements = useAppStore(s => s.getAchievements)
  const getOverallPct = useAppStore(s => s.getOverallPct)
  const setCurrentAlphaGroup = useAppStore(s => s.setCurrentAlphaGroup)
  const setAlphaCardIndex = useAppStore(s => s.setAlphaCardIndex)
  const currentLanguage = useAppStore(s => s.currentLanguage)

  // Check and update streak on page load
  const streakResult = checkAndUpdateStreak()

  const overallPct = getOverallPct()
  const updatedPaths = getUpdatedPaths()
  const achievements = getAchievements()

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'

  const heroPath = updatedPaths.find(p => p.status === 'progress') || updatedPaths[0]

  const handlePathClick = (pathId: string) => {
    const config = pathConfig[pathId]
    const catId = pathIdToCatId(pathId)

    console.log('[HomePage] Click:', pathId, '→', config?.route || 'quiz (default)')

    sounds.playClick()
    adaptive.saveSession(config?.route || 'quiz')

    if (pathId === 'gunihalu') {
      // Dedicated gunithalu learning page
      console.log('[HomePage] Navigating to /gunithalu')
      navigate('/gunithalu')
    } else if (pathId === 'alphabets') {
      // Alphabet practice: set alphabet group then navigate
      const alphabets = getAlphabets(currentLanguage)
      const firstGroup = Object.keys(alphabets)[0] || 'vowels'
      setCurrentAlphaGroup(firstGroup)
      setAlphaCardIndex(0)
      console.log('[HomePage] Navigating to /practice')
      navigate('/practice')
    } else if (config) {
      const targetPath = routePaths[config.route]
      console.log('[HomePage] Navigating to', targetPath, 'with category', catId)
      navigate(targetPath, {
        state: { wordCategoryId: catId, fromPath: pathId },
      })
    } else {
      console.warn('[HomePage] Unknown path:', pathId, 'defaulting to quiz')
      navigate('/quiz', {
        state: { wordCategoryId: catId, fromPath: pathId },
      })
    }
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <ContinueLearningBanner
          title={heroPath.title}
          subtitle={heroPath.subtitle}
          progress={heroPath.progress || overallPct}
          icon={heroPath.icon}
          streak={streak}
          darkMode={darkMode}
          onResume={() => handlePathClick(heroPath.id)}
        />
      </motion.div>

      <motion.div
        className="rounded-2xl p-5 border"
        style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold" style={{ color: textSecondary }}>Overall Progress</span>
          <span className="text-lg font-black gradient-text">{overallPct}%</span>
        </div>
        <div className="h-3 bg-slate-700/30 rounded-full overflow-hidden" role="progressbar" aria-valuenow={overallPct} aria-valuemin={0} aria-valuemax={100}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa, #10b981)' }}
            initial={{ width: 0 }} animate={{ width: `${overallPct}%` }} transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs" style={{ color: textSecondary }}>
          <span>{learnedAlphabets.length + learnedWords.length} learned</span>
          <span>Level {level} · {xp} XP</span>
        </div>
      </motion.div>

      <div>
        <SectionHeader title="Learning Paths" subtitle="Choose a skill to master" icon="🧭" darkMode={darkMode} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {updatedPaths.map((path, i) => {
            const config = pathConfig[path.id] || { route: 'quiz', label: '📝 Quiz' }
            return (
              <motion.div key={path.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: i * 0.06 } }}>
                <LearningCard {...path} darkMode={darkMode} onClick={handlePathClick} />
                <div className="text-center mt-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400">{config.label}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div>
        <SectionHeader title="Achievements" subtitle="Milestones you've earned" icon="🏆" darkMode={darkMode} />
        <div className="grid grid-cols-3 gap-3">
          {achievements.map(a => (
            <motion.div
              key={a.id} whileHover={{ scale: 1.05 }}
              className={`rounded-2xl p-3 text-center border transition-all ${a.earned ? 'border-amber-500/30 bg-amber-500/10' : 'border-slate-700 bg-slate-800/30 opacity-40'}`}
            >
              <div className="text-2xl mb-1">{a.icon}</div>
              <div className="text-xs font-bold mb-0.5" style={{ color: a.earned ? '#fbbf24' : textSecondary }}>{a.title}</div>
              <div className="text-xs" style={{ color: textSecondary }}>{a.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage