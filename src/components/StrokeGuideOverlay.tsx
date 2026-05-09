import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import { getStrokesForChar } from '../data/strokeData'

interface StrokeGuideOverlayProps {
  char: string
  darkMode?: boolean
  visible?: boolean
}

/**
 * Stroke Guide Overlay — renders as an SVG overlay on top of the practice canvas.
 * Uses a ref to measure the actual canvas container size so SVG paths align perfectly.
 * Stroke data uses normalized 0-1 coordinates that get scaled to the measured dimensions.
 */
export function StrokeGuideOverlay({ char, darkMode, visible }: StrokeGuideOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStroke, setCurrentStroke] = useState(0)
  const [animProgress, setAnimProgress] = useState(0)
  const animRef = useRef<number | null>(null)
  const strokeData = getStrokesForChar(char)

  const total = strokeData ? strokeData.strokes.length : 0

  // Measure the actual container size so SVG matches the canvas
  useEffect(() => {
    const el = containerRef.current?.parentElement // the .relative wrapper around canvas
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        if (width > 0 && height > 0) {
          setCanvasSize({ width: Math.round(width), height: Math.round(height) })
        }
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const W = canvasSize.width
  const H = canvasSize.height

  // Scale normalized (0-1) point to pixel coords
  const sx = (v: number) => v * W
  const sy = (v: number) => v * H

  // Build SVG path data for a full stroke
  const fullPath = useCallback((strokeIdx: number) => {
    if (!strokeData) return ''
    const pts = strokeData.strokes[strokeIdx].points
    if (pts.length < 2) return ''
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.x).toFixed(1)} ${sy(p.y).toFixed(1)}`).join(' ')
  }, [strokeData, W, H])

  // Build partial SVG path for animation (0..1 progress)
  const partialPath = useCallback((strokeIdx: number, pct: number) => {
    if (!strokeData) return ''
    const pts = strokeData.strokes[strokeIdx].points
    if (pts.length < 2) return ''
    const n = pts.length
    const target = Math.min(Math.floor(pct * (n - 1)), n - 2)
    const sub = (pct * (n - 1)) - target

    const parts: string[] = [`M ${sx(pts[0].x).toFixed(1)} ${sy(pts[0].y).toFixed(1)}`]
    for (let i = 1; i <= target; i++) {
      parts.push(`L ${sx(pts[i].x).toFixed(1)} ${sy(pts[i].y).toFixed(1)}`)
    }
    if (target < n - 1) {
      const p1 = pts[target], p2 = pts[target + 1]
      const cx = sx(p1.x + (p2.x - p1.x) * sub)
      const cy = sy(p1.y + (p2.y - p1.y) * sub)
      parts.push(`L ${cx.toFixed(1)} ${cy.toFixed(1)}`)
    }
    return parts.join(' ')
  }, [strokeData, W, H])

  const animateStroke = useCallback((strokeIdx: number) => {
    if (!strokeData || strokeIdx >= total) {
      setIsPlaying(false)
      return
    }
    setCurrentStroke(strokeIdx)
    setAnimProgress(0)
    const start = performance.now()
    const duration = 1100

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(elapsed / duration, 1)
      setAnimProgress(p)
      if (p < 1) {
        animRef.current = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          if (strokeIdx + 1 < total) animateStroke(strokeIdx + 1)
          else setIsPlaying(false)
        }, 150)
      }
    }
    animRef.current = requestAnimationFrame(tick)
  }, [strokeData, total])

  const handlePlay = useCallback(() => {
    if (isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      animateStroke(currentStroke)
    }
  }, [isPlaying, currentStroke, animateStroke])

  const handleReset = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    setIsPlaying(false)
    setCurrentStroke(0)
    setAnimProgress(0)
  }, [])

  const goPrev = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    const n = Math.max(0, currentStroke - 1)
    setCurrentStroke(n)
    setAnimProgress(1)
    setIsPlaying(false)
  }, [currentStroke])

  const goNext = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    if (!strokeData) return
    const n = Math.min(total - 1, currentStroke + 1)
    setCurrentStroke(n)
    setAnimProgress(1)
    setIsPlaying(false)
  }, [currentStroke, strokeData, total])

  useEffect(() => {
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [])

  // Reset on character change
  useEffect(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    setIsPlaying(false)
    setCurrentStroke(0)
    setAnimProgress(0)
  }, [char])

  if (!visible) return null

  // No stroke data — show subtle hint
  if (!strokeData || total === 0) {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 flex items-end justify-center pb-3">
        <div className="pointer-events-auto px-3 py-1.5 rounded-lg text-[10px] font-medium backdrop-blur-md border"
          style={{
            background: darkMode ? 'rgba(15,23,42,0.8)' : 'rgba(255,255,255,0.85)',
            borderColor: darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)',
            color: darkMode ? '#64748b' : '#94a3b8',
          }}
        >
          📝 Stroke order not yet available for this character
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 flex flex-col pointer-events-none">
      {/* SVG stroke overlay — matches canvas dimensions via viewBox */}
      <div className="relative flex-1 min-h-0">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <filter id="strokeGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="strokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24"/>
              <stop offset="100%" stopColor="#f59e0b"/>
            </linearGradient>
          </defs>

          {/* Completed strokes — faded gold */}
          {strokeData.strokes.map((stroke, i) => (
            i < currentStroke ? (
              <path
                key={`done-${i}`}
                d={fullPath(i)}
                fill="none"
                stroke="rgba(251,191,36,0.30)"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : null
          ))}

          {/* Current active stroke */}
          {currentStroke < total && (
            <g>
              {/* The animated or paused path */}
              <path
                d={isPlaying ? partialPath(currentStroke, animProgress) : fullPath(currentStroke)}
                fill="none"
                stroke="url(#strokeGrad)"
                strokeWidth={isPlaying ? 6 : 5}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#strokeGlow)"
              />

              {/* Direction dots (when paused) */}
              {!isPlaying && strokeData.strokes[currentStroke].points.map((p, i) => {
                // Show a dot at start, and every other point
                if (i !== 0 && i !== strokeData.strokes[currentStroke].points.length - 1 && i % 2 !== 0) return null
                return (
                  <circle
                    key={`d-${i}`}
                    cx={sx(p.x)}
                    cy={sy(p.y)}
                    r={i === 0 ? 6 : i === strokeData.strokes[currentStroke].points.length - 1 ? 4 : 3}
                    fill={i === 0 ? '#fbbf24' : 'rgba(251,191,36,0.5)'}
                    stroke={i === 0 ? '#92400e' : 'none'}
                    strokeWidth={i === 0 ? 1.5 : 0}
                  />
                )
              })}

              {/* Start label (when paused) */}
              {!isPlaying && (() => {
                const p0 = strokeData.strokes[currentStroke].points[0]
                return (
                  <text
                    x={sx(p0.x)}
                    y={sy(p0.y) - 14}
                    textAnchor="middle"
                    fill="#fbbf24"
                    fontSize="12"
                    fontWeight="bold"
                    fontFamily="system-ui"
                  >
                    {currentStroke + 1}
                  </text>
                )
              })()}

              {/* Arrowhead at end (when paused) */}
              {!isPlaying && (() => {
                const pts = strokeData.strokes[currentStroke].points
                if (pts.length < 2) return null
                const last = pts[pts.length - 1]
                const prev = pts[pts.length - 2]
                const ang = Math.atan2(sy(last.y) - sy(prev.y), sx(last.x) - sx(prev.x))
                const lx = sx(last.x)
                const ly = sy(last.y)
                const s = 10
                return (
                  <path
                    d={`M ${lx} ${ly} L ${lx - s*Math.cos(ang-0.35)} ${ly - s*Math.sin(ang-0.35)} M ${lx} ${ly} L ${lx - s*Math.cos(ang+0.35)} ${ly - s*Math.sin(ang+0.35)}`}
                    stroke="#fbbf24"
                    strokeWidth={2.5}
                    fill="none"
                  />
                )
              })()}

              {/* Glowing tip during animation */}
              {isPlaying && animProgress > 0 && (() => {
                const pts = strokeData.strokes[currentStroke].points
                const n = pts.length
                const pos = animProgress * (n - 1)
                const idx = Math.min(Math.floor(pos), n - 2)
                const frac = pos - idx
                const cx = sx(pts[idx].x + (pts[idx + 1].x - pts[idx].x) * frac)
                const cy = sy(pts[idx].y + (pts[idx + 1].y - pts[idx].y) * frac)
                return (
                  <circle cx={cx} cy={cy} r={8} fill="#fbbf24" opacity={0.4}>
                    <animate attributeName="r" values="6;10;6" dur="0.6s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.4;0.15;0.4" dur="0.6s" repeatCount="indefinite"/>
                  </circle>
                )
              })()}
            </g>
          )}

          {/* Future strokes — very faint dashed ghost */}
          {strokeData.strokes.map((stroke, i) => (
            i > currentStroke ? (
              <path
                key={`fut-${i}`}
                d={fullPath(i)}
                fill="none"
                stroke="rgba(251,191,36,0.10)"
                strokeWidth={4}
                strokeLinecap="round"
                strokeDasharray="6 8"
              />
            ) : null
          ))}
        </svg>
      </div>

      {/* Controls bar — pointer-events-auto so buttons work */}
      <div className="pointer-events-auto flex justify-center pb-2 pt-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur-md shadow-lg"
          style={{
            background: darkMode ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.95)',
            borderColor: darkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.15)',
          }}
        >
          {/* Stroke progress indicators */}
          <div className="flex gap-1 mr-1">
            {strokeData.strokes.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === currentStroke ? 20 : 8,
                  background: i < currentStroke
                    ? 'rgba(251,191,36,0.5)'
                    : i === currentStroke
                    ? '#fbbf24'
                    : darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)',
                }}
              />
            ))}
          </div>

          <div className="w-px h-5 bg-slate-700/30" />

          <motion.button whileTap={{ scale: 0.85 }} onClick={goPrev} disabled={currentStroke === 0} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-700/20 transition-colors disabled:opacity-30">
            <ChevronLeft size={14} className="text-slate-400" />
          </motion.button>

          <span className="text-[11px] text-slate-400 min-w-[36px] text-center font-mono font-bold">
            {currentStroke + 1}/{total}
          </span>

          <motion.button whileTap={{ scale: 0.85 }} onClick={goNext} disabled={currentStroke >= total - 1} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-700/20 transition-colors disabled:opacity-30">
            <ChevronRight size={14} className="text-slate-400" />
          </motion.button>

          <div className="w-px h-5 bg-slate-700/30" />

          <motion.button whileTap={{ scale: 0.85 }} onClick={handleReset} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-700/20 transition-colors" title="Reset">
            <RotateCcw size={13} className="text-slate-400" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handlePlay}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-500/20 hover:bg-amber-500/35 transition-colors"
            title={isPlaying ? 'Pause' : 'Play stroke animation'}
          >
            {isPlaying ? <Pause size={13} className="text-amber-400" /> : <Play size={13} className="text-amber-400 ml-0.5" />}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default StrokeGuideOverlay