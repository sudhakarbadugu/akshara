import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useSpeech, useSpeechRecognition } from './useSpeech'

describe('useSpeech', () => {
  let speechSynthesisMock: any
  let utteranceMock: any

  beforeEach(() => {
    utteranceMock = {
      onstart: null,
      onend: null,
      onerror: null,
      lang: '',
      rate: 1,
      pitch: 1,
      voice: null,
    }

    speechSynthesisMock = {
      speak: vi.fn((u: any) => {
        setTimeout(() => u.onend?.(), 10)
      }),
      cancel: vi.fn(),
      getVoices: vi.fn(() => [
        { lang: 'ta-IN', name: 'Tamil' },
        { lang: 'hi-IN', name: 'Hindi' },
        { lang: 'en-US', name: 'English' },
      ]),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }

    vi.stubGlobal('speechSynthesis', speechSynthesisMock)
    vi.stubGlobal('SpeechSynthesisUtterance', vi.fn(() => utteranceMock))
  })

  it('initializes with not speaking', () => {
    const { result } = renderHook(() => useSpeech())
    expect(result.current.isSpeaking).toBe(false)
    expect(result.current.muted).toBe(false)
  })

  it('speaks text with default language', async () => {
    const { result } = renderHook(() => useSpeech())
    act(() => {
      result.current.speak('hello')
    })
    expect(speechSynthesisMock.speak).toHaveBeenCalled()
  })

  it('does not speak when muted', () => {
    const { result } = renderHook(() => useSpeech())
    act(() => {
      result.current.setMuted(true)
    })
    act(() => {
      result.current.speak('hello')
    })
    expect(speechSynthesisMock.speak).not.toHaveBeenCalled()
  })

  it('stops speaking', () => {
    const { result } = renderHook(() => useSpeech())
    act(() => {
      result.current.stop()
    })
    expect(speechSynthesisMock.cancel).toHaveBeenCalled()
  })

  it('sets speaking state while speaking', async () => {
    const { result } = renderHook(() => useSpeech())
    act(() => {
      result.current.speak('hello')
    })
    await waitFor(() => {
      expect(result.current.isSpeaking).toBe(false)
    })
  })
})

describe('useSpeechRecognition', () => {
  let recognitionMock: any

  beforeEach(() => {
    recognitionMock = {
      start: vi.fn(),
      stop: vi.fn(),
      continuous: false,
      interimResults: false,
      lang: 'ta-IN',
      maxAlternatives: 3,
      onresult: null,
      onstart: null,
      onend: null,
      onerror: null,
    }

    const RecognitionCtor = vi.fn(() => recognitionMock)
    vi.stubGlobal('SpeechRecognition', RecognitionCtor)
    vi.stubGlobal('webkitSpeechRecognition', RecognitionCtor)
  })

  it('initializes with not listening', () => {
    const { result } = renderHook(() => useSpeechRecognition())
    expect(result.current.isListening).toBe(false)
    expect(result.current.notSupported).toBe(false)
  })

  it('sets not supported when SpeechRecognition unavailable', () => {
    vi.stubGlobal('SpeechRecognition', undefined)
    vi.stubGlobal('webkitSpeechRecognition', undefined)
    const { result } = renderHook(() => useSpeechRecognition())
    expect(result.current.notSupported).toBe(true)
  })

  it('starts listening and returns results', async () => {
    const { result } = renderHook(() => useSpeechRecognition())
    
    let resolvePromise: (value: string[]) => void
    const promise = new Promise<string[]>((resolve) => {
      resolvePromise = resolve
    })

    act(() => {
      result.current.startListening().then(resolvePromise)
    })

    // Simulate recognition result
    const mockEvent = {
      results: [
        [
          { transcript: 'hello' },
          { transcript: 'halo' },
        ],
      ],
    }

    act(() => {
      recognitionMock.onresult(mockEvent)
    })

    const transcripts = await promise
    expect(transcripts).toContain('hello')
    expect(result.current.isListening).toBe(false)
  })

  it('stops listening', () => {
    const { result } = renderHook(() => useSpeechRecognition())
    act(() => {
      result.current.stopListening()
    })
    expect(recognitionMock.stop).toHaveBeenCalled()
    expect(result.current.isListening).toBe(false)
  })

  it('checks match with exact text', () => {
    const { result } = renderHook(() => useSpeechRecognition())
    const match = result.current.checkMatch('hello', 'hello')
    expect(match).toBe(true)
  })

  it('checks match with similar text', () => {
    const { result } = renderHook(() => useSpeechRecognition())
    const match = result.current.checkMatch('hello', 'helo', 0.5)
    expect(match).toBe(true)
  })

  it('returns false for empty transcript', () => {
    const { result } = renderHook(() => useSpeechRecognition())
    const match = result.current.checkMatch('hello', '')
    expect(match).toBe(false)
  })

  it('handles Tamil text matching', () => {
    const { result } = renderHook(() => useSpeechRecognition())
    const match = result.current.checkMatch('வணக்கம்', 'வணக்கம்')
    expect(match).toBe(true)
  })

  it('resets transcript', () => {
    const { result } = renderHook(() => useSpeechRecognition())
    act(() => {
      result.current.resetTranscript()
    })
    expect(result.current.transcript).toBe('')
  })
})
