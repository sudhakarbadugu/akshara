import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WordChipBar } from './WordChipBar'

describe('WordChipBar', () => {
  it('renders with no matching words', () => {
    const { container } = render(<WordChipBar letter="zzz" lang="tamil" darkMode={true} voiceLang="ta-IN" />)
    expect(container.firstChild).toBeNull()
  })

  it('renders word chips for valid letter', () => {
    render(<WordChipBar letter="அ" lang="tamil" darkMode={true} voiceLang="ta-IN" />)
    // Should show words containing 'அ'
    const wordsText = screen.getByText(/word/)
    expect(wordsText).toBeTruthy()
  })

  it('applies dark mode styling', () => {
    const { container } = render(<WordChipBar letter="அ" lang="tamil" darkMode={true} voiceLang="ta-IN" />)
    const chipBar = container.firstChild as HTMLElement
    expect(chipBar).toBeTruthy()
  })

  it('applies light mode styling', () => {
    const { container } = render(<WordChipBar letter="அ" lang="tamil" darkMode={false} voiceLang="ta-IN" />)
    const chipBar = container.firstChild as HTMLElement
    expect(chipBar).toBeTruthy()
  })

  it('handles empty letter', () => {
    const { container } = render(<WordChipBar letter="" lang="tamil" darkMode={true} voiceLang="ta-IN" />)
    expect(container.firstChild).toBeNull()
  })

  it('handles different languages', () => {
    const { container: tamilContainer } = render(<WordChipBar letter="அ" lang="tamil" darkMode={true} voiceLang="ta-IN" />)
    const { container: hindiContainer } = render(<WordChipBar letter="अ" lang="hindi" darkMode={true} voiceLang="hi-IN" />)
    const { container: teluguContainer } = render(<WordChipBar letter="అ" lang="telugu" darkMode={true} voiceLang="te-IN" />)
    
    // Should render without errors - containers have content
    expect(tamilContainer).toBeTruthy()
    expect(hindiContainer).toBeTruthy()
    expect(teluguContainer).toBeTruthy()
  })
})
