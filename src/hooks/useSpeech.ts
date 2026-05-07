import { useCallback, useEffect, useRef, useState } from 'react'

// Speech synthesis hook for TTS
export function useSpeech() {
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    synthRef.current = window.speechSynthesis
    const loadVoices = () => {
      const v = synthRef.current?.getVoices() || []
      setVoices(v)
    }
    loadVoices()
    synthRef.current?.addEventListener('voiceschanged', loadVoices)
    return () => synthRef.current?.removeEventListener('voiceschanged', loadVoices)
  }, [])

  const speak = useCallback((text: string, lang = 'ta-IN', rate = 0.8, pitch = 1): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!synthRef.current || muted) { resolve(); return }
      synthRef.current.cancel()
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = lang
      utter.rate = rate
      utter.pitch = pitch
      const langPrefix = lang.split('-')[0]
      const bestVoice = voices.find(v => v.lang.startsWith(lang))
        || voices.find(v => v.lang.startsWith(langPrefix))
        || voices.find(v => v.lang.startsWith('en'))
        || voices[0]
      if (bestVoice) utter.voice = bestVoice
      utter.onstart = () => setIsSpeaking(true)
      utter.onend = () => { setIsSpeaking(false); resolve() }
      utter.onerror = () => { setIsSpeaking(false); reject(new Error('Speech failed')) }
      synthRef.current.speak(utter)
    })
  }, [muted, voices])

  const stop = useCallback(() => {
    synthRef.current?.cancel()
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking, muted, setMuted }
}

// Speech recognition hook for mic input
export function useSpeechRecognition(lang = 'ta-IN') {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [notSupported, setNotSupported] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Ctor) { setNotSupported(true); return }
    const recognition = new Ctor()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = lang
    recognition.maxAlternatives = 3
    recognitionRef.current = recognition
  }, [lang])

  const startListening = useCallback((): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      if (!recognitionRef.current) { reject(new Error('Speech recognition not supported')); return }
      recognitionRef.current.onresult = (event) => {
        const results: string[] = []
        for (let i = 0; i < event.results.length; i++) {
          for (let j = 0; j < event.results[i].length; j++) {
            results.push(event.results[i][j].transcript)
          }
        }
        setTranscript(results[0] || '')
        resolve(results)
      }
      recognitionRef.current.onstart = () => setIsListening(true)
      recognitionRef.current.onend = () => setIsListening(false)
      recognitionRef.current.onerror = (e) => { setIsListening(false); reject(e) }
      recognitionRef.current.start()
    })
  }, [])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }, [])

  const checkMatch = useCallback((expected: string, transcriptText: string, threshold = 0.6): boolean => {
    if (!transcriptText) return false
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\u0d80-\u0dff\u0900-\u097f\u0c00-\u0c7f]/g, '').trim()
    const e = norm(expected)
    const t = norm(transcriptText)
    if (e === t) return true
    let matches = 0
    for (let i = 0; i < t.length; i++) {
      if (e.includes(t[i])) matches++
    }
    return matches / Math.max(e.length, t.length) >= threshold
  }, [])

  return { startListening, stopListening, isListening, transcript, notSupported, checkMatch, resetTranscript: () => setTranscript('') }
}