import { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { getAlphabets } from '../data/alphabets'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import { LANGUAGES } from '../i18n/languages'
import type { AlphabetChar } from '../types'

export function PracticePage() {
  const sounds = useSounds()
  const mascot = useMascot()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawingRef = useRef(false)
  const lastPosRef = useRef({ x: 0, y: 0 })

  const practiceChar = useAppStore(s => s.practiceChar)
  const practiceMode = useAppStore(s => s.practiceMode)
  const showGuide = useAppStore(s => s.showGuide)
  const currentAlphaGroup = useAppStore(s => s.currentAlphaGroup)
  const alphaCardIndex = useAppStore(s => s.alphaCardIndex)
  const darkMode = useAppStore(s => s.darkMode)
  const learnedAlphabets = useAppStore(s => s.learnedAlphabets)
  const setPracticeChar = useAppStore(s => s.setPracticeChar)
  const setPracticeMode = useAppStore(s => s.setPracticeMode)
  const setShowGuide = useAppStore(s => s.setShowGuide)
  const setCurrentAlphaGroup = useAppStore(s => s.setCurrentAlphaGroup)
  const setAlphaCardIndex = useAppStore(s => s.setAlphaCardIndex)
  const markAlphabetLearned = useAppStore(s => s.markAlphabetLearned)
  const advanceAlphaCard = useAppStore(s => s.advanceAlphaCard)
  const currentLanguage = useAppStore(s => s.currentLanguage)

  const alphabets = getAlphabets(currentLanguage)
  const langConfig = LANGUAGES[currentLanguage]
  const currentAlphaChars = alphabets[currentAlphaGroup]?.chars || []

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'

  const drawGuide = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (!canvasRef.current) return
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      if (!showGuide || practiceMode !== 'trace' || !practiceChar) return
      ctx.save()
      ctx.font = `bold 160px "Noto Sans ${langConfig.name}", serif`
      ctx.fillStyle = 'rgba(99, 102, 241, 0.10)'
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.20)'
      ctx.lineWidth = 1.5
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(practiceChar.char, ctx.canvas.width / 2, ctx.canvas.height / 2)
      if (showGuide) ctx.strokeText(practiceChar.char, ctx.canvas.width / 2, ctx.canvas.height / 2)
      ctx.restore()
    },
    [practiceChar, practiceMode, showGuide, langConfig.name]
  )

  useEffect(() => {
    if (!practiceChar) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx) drawGuide(ctx)
  }, [practiceChar, practiceMode, showGuide, drawGuide])

  const getPos = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const nativeEvent = (e as React.MouseEvent).nativeEvent
    if (nativeEvent?.offsetX !== undefined) {
      return { x: nativeEvent.offsetX * scaleX, y: nativeEvent.offsetY * scaleY }
    }
    const clientX = 'clientX' in e ? e.clientX : (e as TouchEvent).touches?.[0]?.clientX ?? 0
    const clientY = 'clientY' in e ? e.clientY : (e as TouchEvent).touches?.[0]?.clientY ?? 0
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY }
  }

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawingRef.current = true
    lastPosRef.current = getPos(e)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current) return
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const { x, y } = getPos(e)
    const { x: lx, y: ly } = lastPosRef.current
    const mx = (lx + x) / 2
    const my = (ly + y) / 2
    ctx.beginPath()
    ctx.strokeStyle = '#fbbf24'
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.moveTo(lx, ly)
    ctx.quadraticCurveTo(lx, ly, mx, my)
    ctx.stroke()
    lastPosRef.current = { x, y }
  }

  const stopDrawing = () => { isDrawingRef.current = false }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    drawGuide(ctx)
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {!practiceChar ? (
        <>
          <SectionHeader title="Practice Writing" subtitle="Pick a character to trace" icon="✍️" darkMode={darkMode} />
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(alphabets).map(([key, group]) => (
              <div key={key} className="col-span-4">
                <div className="text-xs uppercase tracking-wider mb-2 font-bold text-indigo-400">
                  {group.name.split('—')[0]}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.chars.map((c: AlphabetChar, i: number) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      onClick={() => { setPracticeChar(c); setAlphaCardIndex(i); setCurrentAlphaGroup(key) }}
                      aria-label={`Practice letter ${c.char} — ${c.name}`}
                      className="w-12 h-12 rounded-xl text-xl font-bold flex items-center justify-center border transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
                      style={{
                        background: learnedAlphabets.includes(c.char) ? 'rgba(16,185,129,0.15)' : bgCard,
                        borderColor: learnedAlphabets.includes(c.char) ? '#10b981' : darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)',
                        color: textPrimary,
                      }}
                    >{c.char}</motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => setPracticeChar(null)}
            aria-label="Back to letter selection"
            className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-indigo-400"
          >← Back to selection</button>

          <div className="text-center">
            <div className="text-7xl font-black mb-1">{practiceChar.char}</div>
            <div className="text-lg text-indigo-400 mb-1">"{practiceChar.name}"</div>
            <div className="text-sm" style={{ color: textSecondary }}>Sound: {practiceChar.english}</div>
          </div>

          <div className="flex gap-2 justify-center">
            {(['trace', 'write'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => { setPracticeMode(mode); setShowGuide(mode === 'trace') }}
                aria-label={`Switch to ${mode} mode`}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 ${practiceMode === mode ? 'bg-indigo-600 text-white' : 'border text-slate-400'}`}
                style={{ borderColor: darkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)' }}
              >{mode === 'trace' ? '🖊️ Trace' : '✏️ Write'}</button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            <input type="checkbox" id="guideToggle" checked={showGuide} onChange={e => setShowGuide(e.target.checked)} className="accent-indigo-500 w-4 h-4" aria-label="Toggle guide visibility" />
            <label htmlFor="guideToggle" className="text-sm cursor-pointer" style={{ color: textSecondary }}>Show guide</label>
          </div>

          <div className="relative">
            <canvas
              ref={canvasRef} width={340} height={340}
              className="w-full rounded-2xl border-2 border-indigo-500/30 cursor-crosshair touch-none"
              style={{ background: darkMode ? '#0f172a' : '#ffffff', touchAction: 'none' }}
              onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
              onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
              aria-label={`Drawing canvas for tracing ${langConfig.name} letters`}
            />
            <button onClick={clearCanvas} aria-label="Clear canvas"
              className="absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-400"
            >Clear</button>
          </div>

          <div className="flex justify-center gap-3">
            <button onClick={() => useAppStore.getState().prevAlphaCard()} aria-label="Previous letter"
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-semibold text-sm focus-visible:ring-2 focus-visible:ring-indigo-400"
            >← Prev</button>
            <button
              onClick={() => { markAlphabetLearned(practiceChar.char); sounds.playCorrect(); mascot.celebrate(); advanceAlphaCard() }}
              aria-label="Mark as learned and go to next"
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-white focus-visible:ring-2 focus-visible:ring-indigo-400"
              style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}
            >✓ Done! +3 XP</button>
            <button onClick={() => advanceAlphaCard()} aria-label="Next letter"
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-semibold text-sm focus-visible:ring-2 focus-visible:ring-indigo-400"
            >Next →</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PracticePage