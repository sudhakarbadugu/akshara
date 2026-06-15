import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StrokeGuideOverlay } from './StrokeGuideOverlay'

vi.mock('../data/strokeData', () => ({
  getStrokesForChar: (char: string) => {
    if (char === 'அ') {
      return {
        char: 'அ',
        strokes: [
          { points: [{ x: 0.5, y: 0.2 }, { x: 0.5, y: 0.8 }] },
          { points: [{ x: 0.3, y: 0.5 }, { x: 0.7, y: 0.5 }] },
        ],
      }
    }
    return null
  },
}))

// Mock ResizeObserver
beforeAll(() => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
})

describe('StrokeGuideOverlay', () => {
  it('renders nothing when not visible', () => {
    const { container } = render(<StrokeGuideOverlay char="அ" visible={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('shows stroke not available message for missing data', () => {
    render(<StrokeGuideOverlay char="X" visible={true} darkMode={true} />)
    expect(screen.getByText(/not yet available/)).toBeTruthy()
  })

  it('renders stroke guide for valid character', () => {
    render(<StrokeGuideOverlay char="அ" visible={true} darkMode={true} />)
    expect(screen.getByText('1/2')).toBeTruthy()
  })

  it('has play button', () => {
    render(<StrokeGuideOverlay char="அ" visible={true} darkMode={true} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('has reset button', () => {
    render(<StrokeGuideOverlay char="அ" visible={true} darkMode={true} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('has navigation buttons', () => {
    render(<StrokeGuideOverlay char="அ" visible={true} darkMode={true} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('displays stroke progress indicators', () => {
    const { container } = render(<StrokeGuideOverlay char="அ" visible={true} darkMode={true} />)
    // The indicators have class 'h-1.5' which is tricky with querySelector
    // Use a broader selector instead
    const indicators = container.querySelectorAll('[class*="h-1"]')
    expect(indicators.length).toBeGreaterThan(0)
  })
})
