import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { PracticePage } from './pages/PracticePage'
import { HomeworkPage } from './pages/HomeworkPage'
import { GunithaluPage } from './pages/GunithaluPage'
import { FlashcardPage } from './pages/FlashcardPage'
import { MatchPage } from './pages/MatchPage'
import { QuizPage } from './pages/QuizPage'
import { ProgressPage } from './pages/ProgressPage'
import { ProfilePage } from './pages/ProfilePage'
import { ReviewPage } from './pages/ReviewPage'
import { SentencesPage } from './pages/SentencesPage'
import { DialoguesPage } from './pages/DialoguesPage'

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/language-learning">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
            <Route path="/practice" element={<ErrorBoundary><PracticePage /></ErrorBoundary>} />
            <Route path="/homework" element={<ErrorBoundary><HomeworkPage /></ErrorBoundary>} />
            <Route path="/gunithalu" element={<ErrorBoundary><GunithaluPage /></ErrorBoundary>} />
            <Route path="/review" element={<ErrorBoundary><ReviewPage /></ErrorBoundary>} />
            <Route path="/flashcard" element={<ErrorBoundary><FlashcardPage /></ErrorBoundary>} />
            <Route path="/match" element={<ErrorBoundary><MatchPage /></ErrorBoundary>} />
            <Route path="/quiz" element={<ErrorBoundary><QuizPage /></ErrorBoundary>} />
            <Route path="/progress" element={<ErrorBoundary><ProgressPage /></ErrorBoundary>} />
            <Route path="/profile" element={<ErrorBoundary><ProfilePage /></ErrorBoundary>} />
            <Route path="/sentences" element={<ErrorBoundary><SentencesPage /></ErrorBoundary>} />
            <Route path="/dialogues" element={<ErrorBoundary><DialoguesPage /></ErrorBoundary>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
