import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Mic, Loader2 } from 'lucide-react'
import { useSpeech, useSpeechRecognition } from '../hooks/useSpeech'
import { useSounds } from '../hooks/useSounds'
import { useState } from 'react'

interface SpeechButtonProps {
  text: string
  lang?: string
  rate?: number
  size?: 'sm' | 'md' | 'lg'
  showMic?: boolean
  onMicResult?: (result: { transcript: string; matched: boolean; alternatives: string[] }) => void
  expectedAnswer?: string
  disabled?: boolean
}

export function SpeechButton({
  text, lang = 'ta-IN', rate = 0.75, size = 'md', showMic = false,
  onMicResult, expectedAnswer, disabled = false
}: SpeechButtonProps) {
  const { speak, isSpeaking, muted, setMuted } = useSpeech()
  const { startListening, isListening, checkMatch, notSupported } = useSpeechRecognition(lang)
  const { playClick, playCorrect, playWrong } = useSounds()
  const [micResult, setMicResult] = useState<{ transcript: string; matched: boolean } | null>(null)
  const [showResult, setShowResult] = useState(false)

  const sizeClasses: Record<string, string> = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12' }
  const iconSizes: Record<string, number> = { sm: 14, md: 16, lg: 20 }

  const handleSpeak = async (e: React.MouseEvent) => {
    e?.stopPropagation()
    if (disabled) return
    playClick()
    try { await speak(text, lang, rate) } catch {}
  }

  const handleMic = async (e: React.MouseEvent) => {
    e?.stopPropagation()
    if (disabled || isListening || notSupported) return
    playClick()
    try {
      const results = await startListening()
      if (results?.length > 0) {
        const matched = checkMatch(expectedAnswer || text, results[0])
        setMicResult({ transcript: results[0], matched })
        setShowResult(true)
        setTimeout(() => setShowResult(false), 2500)
        onMicResult?.({ transcript: results[0], matched, alternatives: results })
        if (matched) playCorrect(); else playWrong()
      }
    } catch {}
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={handleSpeak}
          disabled={disabled || isSpeaking}
          className={`${sizeClasses[size]} rounded-xl flex items-center justify-center transition-all duration-200
            ${disabled ? 'opacity-30 cursor-not-allowed' : 'bg-indigo-500/20 hover:bg-indigo-500/40 active:bg-indigo-600'}`}
          title={muted ? 'Sound muted' : 'Play pronunciation'}
        >
          {isSpeaking ? <Loader2 size={iconSizes[size]} className="animate-spin text-indigo-400" /> : <Volume2 size={iconSizes[size]} className="text-indigo-400" />}
        </motion.button>

        {showMic && !notSupported && (
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleMic}
            disabled={disabled || isListening}
            className={`${sizeClasses[size]} rounded-xl flex items-center justify-center transition-all
              ${isListening ? 'bg-red-500/30 animate-pulse' : 'bg-emerald-500/20 hover:bg-emerald-500/40'}`}
            title="Speak the letter"
          >
            {isListening ? (
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                <Mic size={iconSizes[size]} className="text-red-400" />
              </motion.div>
            ) : <Mic size={iconSizes[size]} className="text-emerald-400" />}
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showResult && micResult && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`border rounded-lg px-2 py-1 text-xs text-center max-w-[120px] ${micResult.matched ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-amber-500/20 border-amber-500/40 text-amber-400'}`}
          >
            <span>{micResult.matched ? '✅' : '⚠️'}</span> {micResult.transcript}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SpeechButton