import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MOODS: Record<string, string> = {
  happy: '🦜', excited: '🤩', thinking: '🤔', sad: '😟', teaching: '📖', celebrating: '🎉',
}

interface MascotProps {
  visible?: boolean
  message?: string
  emotion?: string
  onDismiss?: () => void
  darkMode?: boolean
  draggable?: boolean
}

export function Mascot({ visible = false, message = '', emotion = 'happy', onDismiss, darkMode = true, draggable = true }: MascotProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const posStart = useRef({ x: 0, y: 0 })

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!draggable) return
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    posStart.current = { ...pos }
  }, [draggable, pos])

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setPos({ x: posStart.current.x + dx, y: posStart.current.y + dy })
  }, [isDragging])

  const handlePointerUp = useCallback(() => { setIsDragging(false) }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
      return () => {
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('pointerup', handlePointerUp)
      }
    }
  }, [isDragging, handlePointerMove, handlePointerUp])

  const emoji = MOODS[emotion] || MOODS.happy

  return (
    <div
      className="fixed bottom-20 left-4 z-[90] select-none"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex flex-col items-start gap-2"
          >
            {message && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="relative mb-1">
                <div
                  className="rounded-2xl px-4 py-3 text-sm font-semibold leading-snug shadow-lg max-w-[220px] border"
                  style={{
                    background: darkMode ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.95)',
                    borderColor: darkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)',
                    color: darkMode ? '#f8fafc' : '#0f172a',
                  }}
                >{message}</div>
                <div
                  className="absolute -bottom-1.5 left-6 w-3 h-3 rotate-45"
                  style={{
                    background: darkMode ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.95)',
                    borderRight: `1px solid ${darkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'}`,
                    borderBottom: `1px solid ${darkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'}`,
                  }}
                />
                {onDismiss && (
                  <button onClick={onDismiss} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-700 text-white text-[10px] flex items-center justify-center hover:bg-slate-600">✕</button>
                )}
              </motion.div>
            )}
            <motion.div
              className="text-5xl ml-2"
              animate={
                emotion === 'celebrating' ? { rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.15, 1] }
                : emotion === 'excited' ? { y: [0, -6, 0], scale: [1, 1.08, 1] }
                : emotion === 'sad' ? { rotate: [0, -5, 0] }
                : { y: [0, -4, 0] }
              }
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
              onPointerDown={handlePointerDown}
            >{emoji}</motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Mascot