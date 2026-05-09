import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Volume2 } from 'lucide-react'
import { getWordsForLetter } from '../data/wordsForLetter'
import { useSpeech } from '../hooks/useSpeech'
import type { Language } from '../types'

interface WordChipBarProps {
  letter: string
  lang: Language
  darkMode: boolean
  voiceLang: string
}

export function WordChipBar({ letter, lang, darkMode, voiceLang }: WordChipBarProps) {
  const { speak, isSpeaking } = useSpeech()
  const words = useMemo(() => getWordsForLetter(letter, lang, 10), [letter, lang])

  if (words.length === 0) return null

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const borderColor = darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'
  const chipBg = darkMode ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)'
  const chipHover = darkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.18)'
  const chipBorder = darkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)'

  const handleSpeak = (text: string) => {
    if (isSpeaking) return
    speak(text, voiceLang, 0.75).catch(() => {})
  }

  return (
    <motion.div
      key={`chipbar-${letter}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="rounded-2xl p-4 border"
      style={{ background: bgCard, borderColor }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-bold" style={{ color: textPrimary }}>
          📝 Words with “<span className="text-amber-400">{letter}</span>”
        </div>
        <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: textSecondary }}>
          {words.length} word{words.length > 1 ? 's' : ''}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {words.map((w, idx) => (
          <motion.div
            key={`${w.native}-${idx}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.04 }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer select-none transition-colors"
            style={{
              background: chipBg,
              borderColor: chipBorder,
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.background = chipHover
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.background = chipBg
            }}
          >
            <div className="flex flex-col leading-tight">
              <span
                className="text-base font-bold"
                style={{ color: textPrimary, fontFamily: `"Noto Sans ${lang === 'tamil' ? 'Tamil' : lang === 'telugu' ? 'Telugu' : 'Devanagari'}", serif` }}
              >
                {w.native}
              </span>
              <span className="text-[10px] font-medium" style={{ color: textSecondary }}>
                {w.english}
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={e => { e.stopPropagation(); handleSpeak(w.native) }}
              disabled={isSpeaking}
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-indigo-500/15 hover:bg-indigo-500/30 transition-colors disabled:opacity-40"
              title="Play pronunciation"
            >
              <Volume2 size={13} className="text-indigo-400" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default WordChipBar
