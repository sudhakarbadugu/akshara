import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMascot } from './useMascot'

describe('useMascot', () => {
  beforeEach(() => {
    vi.stubGlobal('sessionStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
    })
  })

  it('initializes with hidden state', () => {
    const { result } = renderHook(() => useMascot())
    expect(result.current.visible).toBe(false)
    expect(result.current.message).toBe('')
    expect(result.current.emotion).toBe('happy')
  })

  it('shows mascot with message', () => {
    const { result } = renderHook(() => useMascot())
    act(() => {
      result.current.show('Hello!', 'happy')
    })
    expect(result.current.visible).toBe(true)
    expect(result.current.message).toBe('Hello!')
    expect(result.current.emotion).toBe('happy')
  })

  it('hides mascot', () => {
    const { result } = renderHook(() => useMascot())
    act(() => {
      result.current.show('Hello!', 'happy')
    })
    act(() => {
      result.current.hide()
    })
    expect(result.current.visible).toBe(false)
  })

  it('celebrates with random encouragement', () => {
    const { result } = renderHook(() => useMascot())
    act(() => {
      result.current.celebrate()
    })
    expect(result.current.visible).toBe(true)
    expect(result.current.message).toMatch(/🎉|✨|🔥|🌟|⭐|👏/)
    expect(result.current.emotion).toMatch(/celebrating|excited|happy/)
  })

  it('encourages with random support message', () => {
    const { result } = renderHook(() => useMascot())
    act(() => {
      result.current.encourage()
    })
    expect(result.current.visible).toBe(true)
    expect(result.current.message).toMatch(/💪|🎯|🌈|📖|🚀/)
    expect(result.current.emotion).toMatch(/happy|teaching|excited/)
  })

  it('shows tip with random tip message', () => {
    const { result } = renderHook(() => useMascot())
    act(() => {
      result.current.tip()
    })
    expect(result.current.visible).toBe(true)
    expect(result.current.message).toMatch(/🔊|✍️|🎤|🃏|🖼️/)
    expect(result.current.emotion).toBe('teaching')
  })

  it('reacts to correct answer with celebration', () => {
    const { result } = renderHook(() => useMascot())
    act(() => {
      result.current.reactToAnswer(true)
    })
    expect(result.current.visible).toBe(true)
    expect(['celebrating', 'excited', 'happy']).toContain(result.current.emotion)
  })

  it('reacts to wrong answer with encouragement', () => {
    const { result } = renderHook(() => useMascot())
    act(() => {
      result.current.reactToAnswer(false)
    })
    expect(result.current.visible).toBe(true)
    expect(['happy', 'teaching', 'excited']).toContain(result.current.emotion)
  })

  it('auto-hides after duration', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useMascot())
    act(() => {
      result.current.show('Test', 'happy', 1000)
    })
    expect(result.current.visible).toBe(true)
    act(() => {
      vi.advanceTimersByTime(1500)
    })
    expect(result.current.visible).toBe(false)
    vi.useRealTimers()
  })
})
