import { useCallback, useEffect, useRef, useState } from 'react'

interface MascotState {
  visible: boolean
  message: string
  emotion: string
  position: { x: number; y: number }
}

const ENCOURAGEMENTS = [
  { msg: 'Great job! 🎉', emotion: 'celebrating' },
  { msg: "You're amazing! ✨", emotion: 'excited' },
  { msg: 'Keep it up! 🔥', emotion: 'happy' },
  { msg: 'Fantastic! 🌟', emotion: 'celebrating' },
  { msg: 'Super star! ⭐', emotion: 'excited' },
  { msg: 'Well done! 👏', emotion: 'happy' },
]

const SUPPORT = [
  { msg: 'You can do it! 💪', emotion: 'happy' },
  { msg: 'Try again — almost there! 🎯', emotion: 'teaching' },
  { msg: "Don't give up! 🌈", emotion: 'happy' },
  { msg: 'Practice makes perfect! 📖', emotion: 'teaching' },
  { msg: "You're learning so fast! 🚀", emotion: 'excited' },
]

const TIPS = [
  { msg: 'Tap the speaker to hear pronunciation! 🔊', emotion: 'teaching' },
  { msg: 'Try tracing the letters with your finger! ✍️', emotion: 'teaching' },
  { msg: 'Say the word out loud! 🎤', emotion: 'teaching' },
  { msg: 'Flip the card to see the meaning! 🃏', emotion: 'teaching' },
  { msg: 'Match the letter with its picture! 🖼️', emotion: 'teaching' },
]

export function useMascot() {
  const [state, setState] = useState<MascotState>({
    visible: false,
    message: '',
    emotion: 'happy',
    position: { x: 0, y: 0 },
  })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const show = useCallback((message: string, emotion = 'happy', duration = 3000) => {
    clearTimer()
    setState(prev => ({ ...prev, visible: true, message, emotion }))
    if (duration > 0) {
      timerRef.current = setTimeout(() => {
        setState(prev => ({ ...prev, visible: false }))
      }, duration)
    }
  }, [])

  const hide = useCallback(() => {
    clearTimer()
    setState(prev => ({ ...prev, visible: false }))
  }, [])

  const celebrate = useCallback(() => {
    const pick = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]
    show(pick.msg, pick.emotion, 2800)
  }, [show])

  const encourage = useCallback(() => {
    const pick = SUPPORT[Math.floor(Math.random() * SUPPORT.length)]
    show(pick.msg, pick.emotion, 3200)
  }, [show])

  const tip = useCallback(() => {
    const pick = TIPS[Math.floor(Math.random() * TIPS.length)]
    show(pick.msg, pick.emotion, 4000)
  }, [show])

  const reactToAnswer = useCallback((correct: boolean) => {
    if (correct) celebrate()
    else encourage()
  }, [celebrate, encourage])

  // Auto-tip on first visit
  useEffect(() => {
    const hasSeenTip = sessionStorage.getItem('langMascotTip')
    if (!hasSeenTip) {
      const t = setTimeout(() => {
        tip()
        sessionStorage.setItem('langMascotTip', '1')
      }, 2500)
      return () => clearTimeout(t)
    }
  }, [tip])

  return {
    ...state,
    show, hide, celebrate, encourage, tip, reactToAnswer,
  }
}

export default useMascot
