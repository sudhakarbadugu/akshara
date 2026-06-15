import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FlashcardMode } from './FlashcardMode'
import type { FlashcardItem } from '../types'

vi.mock('../hooks/useSounds', () => ({
  useSounds: () => ({
    playFlip: vi.fn(),
    playCorrect: vi.fn(),
    playClick: vi.fn(),
  }),
}))

vi.mock('../hooks/useSpeech', () => ({
  useSpeech: () => ({
    speak: vi.fn(),
    isSpeaking: false,
  }),
}))

vi.mock('../hooks/useMascot', () => ({
  useMascot: () => ({
    celebrate: vi.fn(),
  }),
}))

describe('FlashcardMode', () => {
  const mockItems: FlashcardItem[] = [
    { display: 'அ', name: 'a', english: 'A', emoji: '🍎', keyword: 'apple', keywordNative: 'ஆப்பிள்' },
    { display: 'ஆ', name: 'aa', english: 'AA', emoji: '🍌', keyword: 'banana', keywordNative: 'வாழைப்பழம்' },
  ]

  it('renders with empty items', () => {
    const { container } = render(<FlashcardMode items={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders flashcard with item', () => {
    render(<FlashcardMode items={mockItems} darkMode={true} groupName="Vowels" />)
    expect(screen.getByText('1 / 2')).toBeTruthy()
    expect(screen.getByText('Vowels')).toBeTruthy()
  })

  it('displays current item display', () => {
    render(<FlashcardMode items={mockItems} darkMode={true} />)
    expect(screen.getByText('அ')).toBeTruthy()
  })

  it('has mark learned button', () => {
    render(<FlashcardMode items={mockItems} darkMode={true} />)
    expect(screen.getByText('✓ Mark Learned')).toBeTruthy()
  })

  it('marks item as learned', () => {
    const onMarkLearned = vi.fn()
    render(<FlashcardMode items={mockItems} darkMode={true} onMarkLearned={onMarkLearned} />)
    fireEvent.click(screen.getByText('✓ Mark Learned'))
    expect(onMarkLearned).toHaveBeenCalledWith(0)
  })

  it('shows learned state after marking', () => {
    render(<FlashcardMode items={mockItems} darkMode={true} />)
    fireEvent.click(screen.getByText('✓ Mark Learned'))
    expect(screen.getByText('✅ Learned')).toBeTruthy()
  })

  it('shows learned count', () => {
    render(<FlashcardMode items={mockItems} darkMode={true} />)
    expect(screen.getByText(/learned/)).toBeTruthy()
  })

  it('has navigation buttons', () => {
    render(<FlashcardMode items={mockItems} darkMode={true} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('displays progress indicator', () => {
    render(<FlashcardMode items={mockItems} darkMode={true} />)
    expect(screen.getByText('1 / 2')).toBeTruthy()
  })
})
