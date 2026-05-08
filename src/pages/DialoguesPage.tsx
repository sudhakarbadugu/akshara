import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { getDialogues } from '../data/dialogues'
import { SectionHeader } from '../components/ui/SectionHeader'
import { SpeechButton } from '../components/SpeechButton'
import { LANGUAGES } from '../i18n/languages'

export function DialoguesPage() {
  const navigate = useNavigate()
  const darkMode = useAppStore(s => s.darkMode)
  const currentLanguage = useAppStore(s => s.currentLanguage)

  const dialogues = getDialogues(currentLanguage)
  const langConfig = LANGUAGES[currentLanguage]

  const cardBg = darkMode ? 'bg-slate-800/60' : 'bg-white'
  const borderColor = darkMode ? 'border-slate-700' : 'border-slate-200'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'
  const textTertiary = darkMode ? '#64748b' : '#94a3b8'
  const speakerABg = darkMode ? 'bg-indigo-500/15' : 'bg-indigo-50'
  const speakerBBg = darkMode ? 'bg-emerald-500/15' : 'bg-emerald-50'
  const speakerABorder = darkMode ? 'border-indigo-500/30' : 'border-indigo-200'
  const speakerBBorder = darkMode ? 'border-emerald-500/30' : 'border-emerald-200'

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
        title="Dialogues"
        subtitle={`${dialogues.length} conversations in ${langConfig.name}`}
        icon="🗣️"
        darkMode={darkMode}
      />

      <div className="space-y-6">
        {dialogues.map((dialogue, dIdx) => (
          <motion.div
            key={dialogue.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dIdx * 0.06 }}
            className={`rounded-2xl border overflow-hidden ${cardBg} ${borderColor}`}
          >
            {/* Dialogue header */}
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{ borderBottom: `1px solid ${borderColor}` }}
            >
              <span className="text-3xl">{dialogue.emoji}</span>
              <div>
                <h2 className="font-bold text-base" style={{ color: textPrimary }}>
                  {dialogue.title}
                </h2>
                <p className="text-xs" style={{ color: textSecondary }}>
                  {dialogue.scenario}
                </p>
              </div>
            </div>

            {/* Dialogue lines */}
            <div className="p-4 space-y-4">
              {dialogue.lines.map((line, lIdx) => {
                const isA = line.speaker === 'A'
                const lineBg = isA ? speakerABg : speakerBBg
                const lineBorder = isA ? speakerABorder : speakerBBorder
                const speakerColor = isA
                  ? (darkMode ? '#a5b4fc' : '#6366f1')
                  : (darkMode ? '#6ee7b7' : '#10b981')

                return (
                  <motion.div
                    key={lIdx}
                    initial={{ opacity: 0, x: isA ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: dIdx * 0.06 + lIdx * 0.04 }}
                    className={`rounded-xl p-4 border ${lineBg} ${lineBorder}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: speakerColor + '20',
                            color: speakerColor,
                          }}
                        >
                          {isA ? 'A' : 'B'}
                        </span>
                      </div>
                      <SpeechButton text={line.native} lang={langConfig.voiceLang} size="sm" />
                    </div>

                    {/* Native */}
                    <p
                      className="font-black break-words leading-snug mb-2"
                      style={{
                        fontFamily: '"Noto Sans Tamil", "Noto Sans Devanagari", "Noto Sans Telugu", serif',
                        fontSize: '1.1rem',
                        color: '#fbbf24',
                        wordBreak: 'break-word',
                      }}
                    >
                      {line.native}
                    </p>

                    {/* English */}
                    <p className="text-sm font-semibold mb-1" style={{ color: textPrimary }}>
                      {line.english}
                    </p>

                    {/* Pronunciation */}
                    <p className="text-xs" style={{ color: textTertiary }}>
                      {line.pronunciation}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default DialoguesPage
