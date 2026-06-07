import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'

// Route-level code splitting: each page becomes its own chunk.
// First paint ships ~150KB instead of 835KB; other routes load on demand.
const PracticePage = lazy(() => import('./pages/PracticePage').then(m => ({ default: m.PracticePage })))
const HomeworkPage = lazy(() => import('./pages/HomeworkPage').then(m => ({ default: m.HomeworkPage })))
const GunithaluPage = lazy(() => import('./pages/GunithaluPage').then(m => ({ default: m.GunithaluPage })))
const FlashcardPage = lazy(() => import('./pages/FlashcardPage').then(m => ({ default: m.FlashcardPage })))
const MatchPage = lazy(() => import('./pages/MatchPage').then(m => ({ default: m.MatchPage })))
const QuizPage = lazy(() => import('./pages/QuizPage').then(m => ({ default: m.QuizPage })))
const ProgressPage = lazy(() => import('./pages/ProgressPage').then(m => ({ default: m.ProgressPage })))
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })))
const ReviewPage = lazy(() => import('./pages/ReviewPage').then(m => ({ default: m.ReviewPage })))
const SentencesPage = lazy(() => import('./pages/SentencesPage').then(m => ({ default: m.SentencesPage })))
const DialoguesPage = lazy(() => import('./pages/DialoguesPage').then(m => ({ default: m.DialoguesPage })))
const AlphabetChartsPage = lazy(() => import('./pages/AlphabetChartsPage').then(m => ({ default: m.AlphabetChartsPage })))
const JourneyPage = lazy(() => import('./pages/JourneyPage').then(m => ({ default: m.JourneyPage })))
const DayLessonPage = lazy(() => import('./pages/DayLessonPage').then(m => ({ default: m.DayLessonPage })))

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-slate-400 text-sm">Loading…</div>
    </div>
  )
}

function lazyPage(Page: React.ComponentType) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageFallback />}>
        <Page />
      </Suspense>
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/akshara/">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
            <Route path="/practice" element={lazyPage(PracticePage)} />
            <Route path="/homework" element={lazyPage(HomeworkPage)} />
            <Route path="/gunithalu" element={lazyPage(GunithaluPage)} />
            <Route path="/review" element={lazyPage(ReviewPage)} />
            <Route path="/flashcard" element={lazyPage(FlashcardPage)} />
            <Route path="/match" element={lazyPage(MatchPage)} />
            <Route path="/quiz" element={lazyPage(QuizPage)} />
            <Route path="/progress" element={lazyPage(ProgressPage)} />
            <Route path="/profile" element={lazyPage(ProfilePage)} />
            <Route path="/sentences" element={lazyPage(SentencesPage)} />
            <Route path="/dialogues" element={lazyPage(DialoguesPage)} />
            <Route path="/charts" element={lazyPage(AlphabetChartsPage)} />
            <Route path="/journey" element={lazyPage(JourneyPage)} />
            <Route path="/journey/:day" element={lazyPage(DayLessonPage)} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
