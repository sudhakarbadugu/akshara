import React from 'react'
import { Home, RotateCcw } from 'lucide-react'

interface Props {
  children: React.ReactNode
  onGoHome?: () => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  handleGoHome = () => {
    this.setState({ hasError: false, error: null })
    if (this.props.onGoHome) this.props.onGoHome()
    else window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
          style={{ background: '#0f172a', color: '#f8fafc' }}
        >
          <div className="text-8xl mb-6 animate-bounce">🦜</div>
          <h2 className="text-2xl font-black mb-2">Oops! Something went wrong</h2>
          <p className="text-sm mb-8 max-w-sm" style={{ color: '#94a3b8' }}>
            Don't worry — our mascot bird will help you get back on track!
          </p>

          <div className="flex gap-3">
            <button
              onClick={this.handleReset}
              aria-label="Try again"
              className="px-5 py-3 rounded-xl font-bold text-sm text-white flex items-center gap-2 transition-colors hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              <RotateCcw size={16} /> Try Again
            </button>
            <button
              onClick={this.handleGoHome}
              aria-label="Go home"
              className="px-5 py-3 rounded-xl font-bold text-sm border-2 border-indigo-500/30 text-indigo-400 flex items-center gap-2 hover:bg-indigo-500/10 transition-colors"
            >
              <Home size={16} /> Go Home
            </button>
          </div>

          {this.state.error && (
            <details className="mt-6 text-left">
              <summary className="text-xs cursor-pointer" style={{ color: '#64748b' }}>Error details</summary>
              <pre className="mt-2 text-xs p-3 rounded-lg overflow-auto max-w-sm" style={{ background: 'rgba(30,41,59,0.8)', color: '#ef4444' }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
