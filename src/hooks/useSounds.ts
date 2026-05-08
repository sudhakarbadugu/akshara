import { useCallback, useRef, useState } from 'react'

export function useSounds() {
  const ctxRef = useRef<AudioContext | null>(null)
  const [muted, setMuted] = useState(() => {
    try { return localStorage.getItem('langMuted') === 'true' } catch { return false }
  })

  const getCtx = () => {
    if (!ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch { return null }
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      const next = !prev
      try { localStorage.setItem('langMuted', String(next)) } catch {}
      return next
    })
  }, [])

  const beep = useCallback((freq: number, duration: number, type: OscillatorType = 'sine', vol = 0.2) => {
    if (muted) return
    try {
      const ctx = getCtx()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = type
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      gain.gain.setValueAtTime(vol, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + duration)
    } catch {}
  }, [muted])

  const playCorrect = useCallback(() => {
    const notes = [523.25, 659.25, 783.99, 1046.50]
    notes.forEach((f, i) => setTimeout(() => beep(f, 0.12, 'sine', 0.22), i * 90))
  }, [beep])

  const playWrong = useCallback(() => {
    beep(320, 0.18, 'triangle', 0.15)
    setTimeout(() => beep(260, 0.22, 'triangle', 0.12), 140)
  }, [beep])

  const playClick = useCallback(() => {
    beep(1000, 0.04, 'sine', 0.08)
  }, [beep])

  const playLevelUp = useCallback(() => {
    const notes = [523.25, 659.25, 783.99, 1046.50]
    notes.forEach((f, i) => setTimeout(() => beep(f, 0.1, 'sine', 0.22), i * 100))
  }, [beep])

  const playStar = useCallback(() => {
    beep(880, 0.06, 'sine', 0.18)
    setTimeout(() => beep(1108, 0.08, 'sine', 0.18), 50)
    setTimeout(() => beep(1320, 0.1, 'sine', 0.15), 120)
  }, [beep])

  const playAchievement = useCallback(() => {
    const notes = [523, 659, 784, 1047, 784, 1047, 1319]
    notes.forEach((f, i) => setTimeout(() => beep(f, 0.12, 'square', 0.12), i * 90))
  }, [beep])

  const playLetterHighlight = useCallback(() => {
    beep(660, 0.08, 'sine', 0.15)
  }, [beep])

  const playMatch = useCallback(() => {
    beep(587, 0.1, 'sine', 0.18)
    setTimeout(() => beep(880, 0.14, 'sine', 0.18), 80)
  }, [beep])

  const playFlip = useCallback(() => {
    beep(400, 0.06, 'sine', 0.06)
  }, [beep])

  const playStreak = useCallback(() => {
    const notes = [440, 554, 659, 880]
    notes.forEach((f, i) => setTimeout(() => beep(f, 0.08, 'sine', 0.16), i * 60))
  }, [beep])

  return {
    muted, setMuted: toggleMute,
    playCorrect, playWrong, playClick, playLevelUp,
    playStar, playAchievement, playLetterHighlight,
    playMatch, playFlip, playStreak,
    beep,
  }
}

export default useSounds
