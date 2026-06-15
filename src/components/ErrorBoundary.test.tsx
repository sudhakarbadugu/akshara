import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from './ErrorBoundary'

// Component that throws error
const ThrowError = () => {
  throw new Error('Test error')
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Hello</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Hello')).toBeTruthy()
  })

  it('renders fallback UI on error', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(screen.getByText('Oops! Something went wrong')).toBeTruthy()
    consoleSpy.mockRestore()
  })

  it('shows error details in fallback', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(screen.getByText('Oops! Something went wrong')).toBeTruthy()
    expect(screen.getByText(/Test error/)).toBeTruthy()
    consoleSpy.mockRestore()
  })

  it('has a reset button', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(screen.getByText('Try Again')).toBeTruthy()
    consoleSpy.mockRestore()
  })

  it('has a go home button', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(screen.getByText('Go Home')).toBeTruthy()
    consoleSpy.mockRestore()
  })
})
