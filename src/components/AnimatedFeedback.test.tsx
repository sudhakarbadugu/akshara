import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AnimatedFeedback } from './AnimatedFeedback'

describe('AnimatedFeedback', () => {
  it('renders nothing when not visible', () => {
    const { container } = render(<AnimatedFeedback type="correct" message="Good!" visible={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders correct feedback', () => {
    render(<AnimatedFeedback type="correct" message="Correct!" visible={true} />)
    expect(screen.getByText('✅')).toBeTruthy()
    expect(screen.getByText('Correct!')).toBeTruthy()
  })

  it('renders wrong feedback', () => {
    render(<AnimatedFeedback type="wrong" message="Try again!" visible={true} />)
    expect(screen.getByText('❌')).toBeTruthy()
    expect(screen.getByText('Try again!')).toBeTruthy()
  })

  it('renders hint feedback', () => {
    render(<AnimatedFeedback type="hint" message="Hint here" visible={true} />)
    expect(screen.getByText('💡')).toBeTruthy()
    expect(screen.getByText('Hint here')).toBeTruthy()
  })

  it('renders star feedback', () => {
    render(<AnimatedFeedback type="star" message="Star!" visible={true} />)
    expect(screen.getByText('⭐')).toBeTruthy()
    expect(screen.getByText('Star!')).toBeTruthy()
  })

  it('has correct styling for correct type', () => {
    const { container } = render(<AnimatedFeedback type="correct" message="Good!" visible={true} />)
    const element = container.firstChild as HTMLElement
    expect(element.className).toContain('bg-emerald-500/20')
    expect(element.className).toContain('border-emerald-500/50')
  })

  it('has correct styling for wrong type', () => {
    const { container } = render(<AnimatedFeedback type="wrong" message="Oops!" visible={true} />)
    const element = container.firstChild as HTMLElement
    expect(element.className).toContain('bg-red-500/20')
    expect(element.className).toContain('border-red-500/50')
  })

  it('has correct styling for hint type', () => {
    const { container } = render(<AnimatedFeedback type="hint" message="Hint" visible={true} />)
    const element = container.firstChild as HTMLElement
    expect(element.className).toContain('bg-amber-500/20')
    expect(element.className).toContain('border-amber-500/50')
  })

  it('has correct styling for star type', () => {
    const { container } = render(<AnimatedFeedback type="star" message="Star!" visible={true} />)
    const element = container.firstChild as HTMLElement
    expect(element.className).toContain('bg-yellow-500/20')
    expect(element.className).toContain('border-yellow-500/50')
  })

  it('falls back to hint styling for unknown type', () => {
    const { container } = render(<AnimatedFeedback type={"unknown" as any} message="Test" visible={true} />)
    const element = container.firstChild as HTMLElement
    expect(element.className).toContain('bg-amber-500/20')
  })
})
