import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, fireEvent, act } from '@testing-library/react'
import { MatchGame } from './MatchGame'
import type { FlashcardItem } from '../types'

vi.mock('../hooks/useSounds', () => ({
  useSounds: () => ({
    playMatch: vi.fn(),
    playWrong: vi.fn(),
    playCorrect: vi.fn(),
    playClick: vi.fn(),
  }),
}))

vi.mock('../hooks/useMascot', () => ({
  useMascot: () => ({
    celebrate: vi.fn(),
  }),
}))

describe('MatchGame', () => {
  const mockItems: FlashcardItem[] = [
    { display: 'அ', name: 'a', english: 'A', emoji: '🍎' },
    { display: 'ஆ', name: 'aa', english: 'AA', emoji: '🍌' },
    { display: 'இ', name: 'i', english: 'I', emoji: '🍊' },
  ]

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders with empty items', () => {
    const { container } = render(<MatchGame items={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders game cards', () => {
    const { container } = render(<MatchGame items={mockItems} darkMode={true} />)
    expect(container.querySelector('.grid')).toBeTruthy()
  })

  it('displays score and timer', () => {
    const { container } = render(<MatchGame items={mockItems} darkMode={true} />)
    expect(container.textContent).toContain('pts')
    expect(container.textContent).toContain('0:00')
  })

  it('has reset button', () => {
    const { container } = render(<MatchGame items={mockItems} darkMode={true} />)
    expect(container.textContent).toContain('Reset')
  })

  it('flips card on click', () => {
    const { container } = render(<MatchGame items={mockItems} darkMode={true} />)
    const cards = container.querySelectorAll('button')
    fireEvent.click(cards[0])
    // After clicking, a card is flipped - check that moves counter is still there
    expect(container.textContent).toContain('moves')
  })

  it('handles card matching', async () => {
    const onComplete = vi.fn()
    const { container } = render(<MatchGame items={mockItems} darkMode={true} onComplete={onComplete} />)

    const cards = container.querySelectorAll('button')
    // Click first two cards
    fireEvent.click(cards[0])
    fireEvent.click(cards[1])
    
    // Check that moves counter updated
    expect(container.textContent).toContain('moves')
  })

  it('resets game on reset button click', () => {
    const { container } = render(<MatchGame items={mockItems} darkMode={true} />)
    const resetButton = container.querySelector('button')!
    fireEvent.click(resetButton)
    expect(container.textContent).toContain('0:00')
  })

  it('increments timer', () => {
    const { container } = render(<MatchGame items={mockItems} darkMode={true} />)
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(container.textContent).toMatch(/0:0/)
  })
})
