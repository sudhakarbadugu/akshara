import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSounds } from './useSounds'

describe('useSounds', () => {
  let audioContextMock: any
  let oscillatorMock: any
  let gainMock: any

  beforeEach(() => {
    // Mock AudioContext
    oscillatorMock = {
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      type: 'sine',
      frequency: { setValueAtTime: vi.fn() },
    }
    gainMock = {
      connect: vi.fn(),
      gain: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
    }
    audioContextMock = {
      createOscillator: vi.fn(() => oscillatorMock),
      createGain: vi.fn(() => gainMock),
      destination: {},
      currentTime: 0,
      state: 'running',
      resume: vi.fn(),
    }
    vi.stubGlobal('AudioContext', vi.fn(() => audioContextMock))
    vi.stubGlobal('webkitAudioContext', vi.fn(() => audioContextMock))
    
    // Mock localStorage
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('initializes with unmuted state', () => {
    const { result } = renderHook(() => useSounds())
    expect(result.current.muted).toBe(false)
  })

  it('toggles mute state', () => {
    const { result } = renderHook(() => useSounds())
    act(() => {
      result.current.setMuted()
    })
    expect(result.current.muted).toBe(true)
  })

  it('does not play when muted', () => {
    const { result } = renderHook(() => useSounds())
    act(() => {
      result.current.setMuted()
    })
    act(() => {
      result.current.beep(440, 0.1)
    })
    expect(audioContextMock.createOscillator).not.toHaveBeenCalled()
  })

  it('plays correct sound with multiple notes', () => {
    const { result } = renderHook(() => useSounds())
    vi.useFakeTimers()
    act(() => {
      result.current.playCorrect()
    })
    vi.advanceTimersByTime(500)
    expect(audioContextMock.createOscillator).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('plays wrong sound with error tone', () => {
    const { result } = renderHook(() => useSounds())
    vi.useFakeTimers()
    act(() => {
      result.current.playWrong()
    })
    vi.advanceTimersByTime(500)
    expect(audioContextMock.createOscillator).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('plays click sound', () => {
    const { result } = renderHook(() => useSounds())
    act(() => {
      result.current.playClick()
    })
    expect(audioContextMock.createOscillator).toHaveBeenCalled()
  })

  it('plays level up sound', () => {
    const { result } = renderHook(() => useSounds())
    vi.useFakeTimers()
    act(() => {
      result.current.playLevelUp()
    })
    vi.advanceTimersByTime(500)
    expect(audioContextMock.createOscillator).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('plays achievement sound', () => {
    const { result } = renderHook(() => useSounds())
    vi.useFakeTimers()
    act(() => {
      result.current.playAchievement()
    })
    vi.advanceTimersByTime(1000)
    expect(audioContextMock.createOscillator).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('plays match sound', () => {
    const { result } = renderHook(() => useSounds())
    vi.useFakeTimers()
    act(() => {
      result.current.playMatch()
    })
    vi.advanceTimersByTime(500)
    expect(audioContextMock.createOscillator).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('plays flip sound', () => {
    const { result } = renderHook(() => useSounds())
    act(() => {
      result.current.playFlip()
    })
    expect(audioContextMock.createOscillator).toHaveBeenCalled()
  })

  it('plays streak sound', () => {
    const { result } = renderHook(() => useSounds())
    vi.useFakeTimers()
    act(() => {
      result.current.playStreak()
    })
    vi.advanceTimersByTime(500)
    expect(audioContextMock.createOscillator).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('handles AudioContext not supported gracefully', () => {
    vi.stubGlobal('AudioContext', undefined)
    vi.stubGlobal('webkitAudioContext', undefined)
    const { result } = renderHook(() => useSounds())
    act(() => {
      result.current.playClick()
    })
    // Should not throw
    expect(result.current.muted).toBe(false)
  })

  it('persists mute state to localStorage', () => {
    const { result } = renderHook(() => useSounds())
    act(() => {
      result.current.setMuted()
    })
    expect(localStorage.setItem).toHaveBeenCalledWith('langMuted', 'true')
  })

  it('loads muted state from localStorage', () => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => 'true'),
      setItem: vi.fn(),
    })
    const { result } = renderHook(() => useSounds())
    expect(result.current.muted).toBe(true)
  })
})
