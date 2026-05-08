import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { getSentences } from '../data/sentences'
import { SectionHeader } from '../components/ui/SectionHeader'
import { SpeechButton } from '../components/SpeechButton'
import { LANGUAGES } from '../i18n/languages'
import type { SentenceItem } from '../types'

export function SentencesPage() {
  const navigate = useNavigate()
  const darkMode = useAppStore(s => s.darkMode)
  const currentLanguage = useAppStore(s => s.currentLanguage)

  const sentences = getSentences(currentLanguage)
  const langConfig = LANGUAGES[currentLanguage]

  // Group sentences by category
  const grouped: Record<string, SentenceItem[]> = {}
  for (const s of sentences) {
    const cat = s.category || 'General'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(s)
  }

  const categories = Object.keys(grouped)

  const cardBg = darkMode ? 'bg-slate-800/60' : 'bg-white'
  const borderColor = darkMode ? 'border-slate-700' : 'border-slate-200'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'
  const textTertiary = darkMode ? '#64748b' : '#94a3b8'
  const accentColor = '#fbbf24'

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-indigo-400"
        aria-label="Go back"
      >
        ← Back
      </button>

      <SectionHeader
        title="Sentences"
        subtitle={`${sentences.length} useful phrases in ${langConfig.name}`}
        icon="💬"
        darkMode={darkMode}
      />

      {categories.map((category, catIdx) => (
        <div key={category}>
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-3"
            style={{ color: textSecondary }}
          >
            {category}
          </h2>
          <div className="space-y-3">
            {grouped[category].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.05 + idx * 0.02 }}
                className={`rounded-xl p-4 border ${cardBg} ${borderColor}`}
              >
                {/* Native sentence */}
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="font-black break-words leading-tight"
                    style={{
                      fontFamily: '"Noto Sans Tamil", "Noto Sans Devanagari", "Noto Sans Telugu", serif',
                      fontSize: '1.2rem',
                      color: accentColor,
                      wordBreak: 'break-word',
                      maxWidth: '85%',
                    }}
                  >
                    {item.native}
                  </span>
                  <div className="flex-shrink-0 ml-2">
                    <SpeechButton text={item.native} lang={langConfig.voiceLang} size="sm" />
                  </div>
                </div>

                {/* English */}
                <p className="text-sm font-semibold mb-1" style={{ color: textPrimary }}>
                  {item.english}
                </p>

                {/* Pronunciation */}
                <p className="text-xs mb-1" style={{ color: textSecondary }}>
                  <span className="font-semibold">Pronunciation: </span>
                  <span style={{ color: darkMode ? '#a5b4fc' : '#6366f1' }}>{item.pronunciation}</span>
                </p>

                {/* Meaning */}
                <p className="text-xs" style={{ color: textTertiary }}>
                  <span className="font-semibold">Meaning: </span>{item.meaning}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SentencesPage
