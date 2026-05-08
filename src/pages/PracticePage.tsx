import { useRef, useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { getAlphabets } from '../data/alphabets'
import { SectionHeader } from '../components/ui/SectionHeader'
import { SpeechButton } from '../components/SpeechButton'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import { LANGUAGES } from '../i18n/languages'
import { Eraser, PenTool, Pencil, ChevronLeft, ChevronRight, Check, Palette } from 'lucide-react'
import type { AlphabetChar } from '../types'

const PEN_COLORS = [
  { color: '#fbbf24', name: 'Gold' },
  { color: '#6366f1', name: 'Indigo' },
  { color: '#10b981', name: 'Emerald' },
  { color: '#ef4444', name: 'Red' },
  { color: '#f472b6', name: 'Pink' },
  { color: '#ffffff', name: 'White' },
]

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

  const [penColor, setPenColor] = useState('#fbbf24')
  const [penSize, setPenSize] = useState(5)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showLearnedAnim, setShowLearnedAnim] = useState(false)

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const bgCardHover = darkMode ? 'rgba(30,41,59,0.9)' : 'rgba(255,255,255,1)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'
  const borderColor = darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'

  const drawGuide = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (!canvasRef.current) return
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      if (!showGuide || practiceMode !== 'trace' || !practiceChar) return
      ctx.save()
      ctx.font = `bold 180px "Noto Sans ${langConfig.name}", serif`
      ctx.fillStyle = 'rgba(99, 102, 241, 0.08)'
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)'
      ctx.lineWidth = 2
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(practiceChar.char, ctx.canvas.width / 2, ctx.canvas.height / 2)
      ctx.strokeText(practiceChar.char, ctx.canvas.width / 2, ctx.canvas.height / 2)
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
    ctx.strokeStyle = penColor
    ctx.lineWidth = penSize
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

  const handleMarkLearned = () => {
    markAlphabetLearned(practiceChar!.char)
    sounds.playCorrect()
    mascot.celebrate()
    setShowLearnedAnim(true)
    setTimeout(() => {
      setShowLearnedAnim(false)
      advanceAlphaCard()
    }, 1200)
  }

  // ─── Letter selection view ───
  if (!practiceChar) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <SectionHeader title="Practice Writing" subtitle="Pick a character to trace" icon="✍️" darkMode={darkMode} />

        {Object.entries(alphabets).map(([key, group]) => {
          const groupChars = group.chars
          const learnedCount = groupChars.filter((c: AlphabetChar) => learnedAlphabets.includes(c.char)).length
          const pct = groupChars.length > 0 ? Math.round((learnedCount / groupChars.length) * 100) : 0

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-5 border"
              style={{ background: bgCard, borderColor }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-bold" style={{ color: textPrimary }}>
                  {group.name.split('—')[0].trim()}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs" style={{ color: textSecondary }}>{learnedCount}/{groupChars.length}</div>
                  <div className="w-16 h-1.5 bg-slate-700/40 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #6366f1, #10b981)' }}
                      animate={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {groupChars.map((c: AlphabetChar, i: number) => {
                  const isLearned = learnedAlphabets.includes(c.char)
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => { setPracticeChar(c); setAlphaCardIndex(i); setCurrentAlphaGroup(key); sounds.playClick() }}
                      aria-label={`Practice ${c.char} — ${c.name}`}
                      className="w-14 h-14 rounded-xl text-2xl font-bold flex items-center justify-center border-2 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 relative"
                      style={{
                        background: isLearned ? 'rgba(16,185,129,0.15)' : bgCardHover,
                        borderColor: isLearned ? '#10b981' : darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)',
                        color: isLearned ? '#34d399' : textPrimary,
                      }}
                    >
                      {c.char}
                      {isLearned && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                          <Check size={10} className="text-white" />
                        </div>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>
    )
  }

  // ─── Practice canvas view — responsive layout ───
  return (
    <div className="max-w-6xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => setPracticeChar(null)}
          className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-indigo-400"
        >← Back</button>
        <div className="text-xs px-3 py-1 rounded-full" style={{ background: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)', color: '#a5b4fc' }}>
          {alphaCardIndex + 1} / {currentAlphaChars.length}
        </div>
      </div>

      {/* Two-column on lg+, stacked on mobile/tablet */}
      <div className="lg:flex lg:gap-6 lg:items-start">
        {/* ─── Left column: Character reference panel ─── */}
        <div className="lg:w-72 xl:w-80 lg:flex-shrink-0 space-y-4 mb-5 lg:mb-0">
          {/* Character info card */}
          <motion.div
            key={practiceChar.char}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 border"
            style={{ background: bgCard, borderColor }}
          >
            <div className="flex lg:flex-col items-center lg:items-center gap-4 lg:gap-5">
              <div
                className="text-7xl lg:text-8xl font-black"
                style={{ fontFamily: `"Noto Sans ${langConfig.name}", serif`, color: '#fbbf24', lineHeight: '1' }}
              >
                {practiceChar.char}
              </div>
              <div className="flex-1 min-w-0 lg:text-center">
                <div className="text-lg font-bold" style={{ color: textPrimary }}>{practiceChar.name}</div>
                <div className="text-sm" style={{ color: textSecondary }}>Sound: {practiceChar.english}</div>
                {practiceChar.keyword && (
                  <div className="text-xs mt-1" style={{ color: darkMode ? '#a5b4fc' : '#6366f1' }}>
                    Keyword: {practiceChar.keyword}
                  </div>
                )}
                {practiceChar.tip && (
                  <div className="text-xs mt-1 italic" style={{ color: textSecondary }}>
                    💡 {practiceChar.tip}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <SpeechButton text={practiceChar.char} lang={langConfig.voiceLang} size="md" />
            </div>
          </motion.div>

          {/* Character strip — always visible as sidebar nav on desktop */}
          <div className="rounded-2xl p-3 border" style={{ background: bgCard, borderColor }}>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: textSecondary }}>
              Quick Jump
            </div>
            <div className="flex lg:flex-wrap gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              {currentAlphaChars.map((c: AlphabetChar, i: number) => {
                const isActive = i === alphaCardIndex
                const isLearned = learnedAlphabets.includes(c.char)
                return (
                  <button
                    key={i}
                    onClick={() => { setPracticeChar(c); setAlphaCardIndex(i); sounds.playClick() }}
                    className={`w-9 h-9 rounded-lg text-sm font-bold flex-shrink-0 flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-indigo-500 text-white ring-2 ring-indigo-400/50'
                        : isLearned
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : darkMode
                        ? 'bg-slate-800 text-slate-400 hover:text-slate-300'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-800'
                    }`}
                    aria-label={`Go to ${c.char}`}
                  >
                    {c.char}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Prev / Done / Next — desktop shows here in sidebar */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => useAppStore.getState().prevAlphaCard()}
              disabled={alphaCardIndex <= 0}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm disabled:opacity-30 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
              style={{ background: darkMode ? 'rgba(30,41,59,0.8)' : '#f1f5f9', color: textPrimary, border: `1px solid ${borderColor}` }}
            >
              <ChevronLeft size={18} /> Prev
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMarkLearned}
              disabled={showLearnedAnim}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-white focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}
            >
              <Check size={18} /> Done
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => advanceAlphaCard()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
              style={{ background: darkMode ? 'rgba(30,41,59,0.8)' : '#f1f5f9', color: textPrimary, border: `1px solid ${borderColor}` }}
            >
              Next <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>

        {/* ─── Right column: Canvas + toolbar ─── */}
        <div className="flex-1 space-y-4">
          {/* Toolbar */}
          <div className="rounded-2xl p-3 border flex items-center gap-2 flex-wrap" style={{ background: bgCard, borderColor }}>
            <div className="flex gap-1 mr-2">
              <button
                onClick={() => { setPracticeMode('trace'); setShowGuide(true) }}
                className={`p-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${practiceMode === 'trace' ? 'bg-indigo-500/30 text-indigo-300' : 'text-slate-400 hover:text-slate-300'}`}
              >
                <PenTool size={14} /> Trace
              </button>
              <button
                onClick={() => { setPracticeMode('write'); setShowGuide(false) }}
                className={`p-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${practiceMode === 'write' ? 'bg-indigo-500/30 text-indigo-300' : 'text-slate-400 hover:text-slate-300'}`}
              >
                <Pencil size={14} /> Write
              </button>
            </div>

            <div className="w-px h-6 bg-slate-700/50" />

            <button
              onClick={() => setShowGuide(!showGuide)}
              className={`p-2 rounded-lg text-xs font-semibold transition-all ${showGuide ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-slate-300'}`}
            >
              {showGuide ? '👁 Guide' : '👁‍🗨 Guide'}
            </button>

            <div className="w-px h-6 bg-slate-700/50" />

            {/* Color picker */}
            <div className="relative">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="p-2 rounded-lg text-xs font-semibold transition-all text-slate-400 hover:text-slate-300 flex items-center gap-1"
              >
                <Palette size={14} />
                <span className="w-3 h-3 rounded-full" style={{ background: penColor, border: '1px solid rgba(255,255,255,0.2)' }} />
              </button>

              <AnimatePresence>
                {showColorPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute left-0 bottom-full mb-2 z-10 rounded-xl p-2 border flex gap-1.5"
                    style={{ background: darkMode ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)', borderColor: darkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)' }}
                  >
                    {PEN_COLORS.map(c => (
                      <button
                        key={c.color}
                        onClick={() => { setPenColor(c.color); setShowColorPicker(false) }}
                        className={`w-7 h-7 rounded-lg border-2 transition-all ${penColor === c.color ? 'scale-110 border-white' : 'border-transparent hover:scale-105'}`}
                        style={{ background: c.color }}
                        aria-label={`Pen color: ${c.name}`}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pen size */}
            <div className="flex items-center gap-1 ml-1">
              <input
                type="range"
                min={2}
                max={12}
                value={penSize}
                onChange={e => setPenSize(Number(e.target.value))}
                className="w-16 accent-indigo-500 h-1"
                aria-label="Pen size"
              />
            </div>

            <div className="flex-1" />

            <button
              onClick={clearCanvas}
              className="p-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-300 flex items-center gap-1 transition-all"
            >
              <Eraser size={14} /> Clear
            </button>
          </div>

          {/* Canvas — fills available width, landscape on desktop */}
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              className="w-full rounded-2xl border-2 cursor-crosshair touch-none"
              style={{
                background: darkMode
                  ? 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)'
                  : 'radial-gradient(circle at center, #ffffff 0%, #f8fafc 100%)',
                borderColor: darkMode ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)',
                touchAction: 'none',
                aspectRatio: '8/5',
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              aria-label={`Drawing canvas for tracing ${langConfig.name} letters`}
            />

            {/* Learned animation overlay */}
            <AnimatePresence>
              {showLearnedAnim && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center rounded-2xl"
                  style={{ background: 'rgba(16,185,129,0.2)', backdropFilter: 'blur(4px)' }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: [0, 1.3, 1], rotate: [-20, 10, 0] }}
                    className="text-center"
                  >
                    <div className="text-6xl mb-2">✅</div>
                    <div className="text-xl font-black text-emerald-400">+3 XP</div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile/tablet nav buttons — hidden on desktop (shown in sidebar) */}
          <div className="flex lg:hidden items-center justify-between gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => useAppStore.getState().prevAlphaCard()}
              disabled={alphaCardIndex <= 0}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm disabled:opacity-30 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
              style={{ background: darkMode ? 'rgba(30,41,59,0.8)' : '#f1f5f9', color: textPrimary, border: `1px solid ${borderColor}` }}
            >
              <ChevronLeft size={18} /> Prev
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMarkLearned}
              disabled={showLearnedAnim}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-white focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}
            >
              <Check size={18} /> Done! +3 XP
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => advanceAlphaCard()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
              style={{ background: darkMode ? 'rgba(30,41,59,0.8)' : '#f1f5f9', color: textPrimary, border: `1px solid ${borderColor}` }}
            >
              Next <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PracticePage