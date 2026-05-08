# CLAUDE.md — AI Assistant Guide for Language Learning App

This file helps Claude Code (and other AI assistants) work effectively with this codebase.

---

## Project Overview

A React 19 + TypeScript + Vite + Tailwind 4 SPA for learning Indian languages (Tamil, Hindi, Telugu). Deployed to nginx at `/language-learning/`.

**Key characteristics:**
- Single-language-at-a-time learning (switchable via header dropdown)
- All data is static TypeScript files (no API/database)
- State persisted in localStorage via Zustand
- SPA routing with React Router (basename: `/language-learning`)

---

## Architecture

### File Organization
```
src/
  pages/           — Route-level components (11 pages)
  components/      — Shared components + ui/ subdirectory
  store/           — Single Zustand store (useAppStore.ts)
  hooks/           — Custom React hooks
  data/            — Static data: alphabets/, lessons/, sentences/, dialogues/
  types/           — All TypeScript interfaces
  i18n/            — Language configurations
```

### Routing (App.tsx)
All routes wrapped in `<Layout />` with `<ErrorBoundary>`:
```
/               → HomePage
/practice       → PracticePage
/flashcard      → FlashcardPage
/match          → MatchPage
/quiz           → QuizPage
/gunithalu      → GunithaluPage
/review         → ReviewPage
/sentences      → SentencesPage
/dialogues      → DialoguesPage
/progress       → ProgressPage
/profile        → ProfilePage
```

### State Management
**One store to rule them all:** `src/store/useAppStore.ts`

Key patterns:
- Uses Zustand with `persist` middleware → auto-saves to localStorage
- Actions are defined inline in the store creator `(set, get) => ({...})`
- Computed helpers (e.g., `getOverallPct`) use `get()` to read current state
- Never call `useAppStore.getState()` in React render — use selectors instead

**Critical store sections:**
```typescript
// Quiz state
quizActive, quizWord, quizOptions, selectedAnswer, quizFeedback, quizType, selectedCategory

// Learning progress
learnedAlphabets: string[]   // array of char strings
learnedWords: string[]       // array of english keys
learnedGunithalu: string[]   // compound keys
srsItems: SRSItem[]          // spaced repetition queue

// Gamification
xp, level, streak, score: {correct, wrong}
```

---

## Data Patterns

### Adding Language Data
All language data follows the same 3-file pattern:

**1. Alphabets** (`src/data/alphabets/<lang>.ts`)
```typescript
export const tamilAlphabets: AlphabetData = {
  vowels:    { name: 'Uyir — Vowels', chars: [...] },
  consonants:{ name: 'Mei — Consonants', chars: [...] },
  uyirMei:   { name: 'Uyir Mei — Compounds', chars: [...] },  // Tamil only
  gunihalu:  { name: 'Gunithalu', chars: [...] },              // Telugu only
}
```

**2. Lessons** (`src/data/lessons/<lang>.ts`)
```typescript
export const tamilLessons: LessonCategory[] = [
  { id: 1, category: 'Greetings & Basics', words: [
    { english: 'Hello', native: 'வணக்கம்', pronunciation: 'Vanakkam', meaning: 'Hello / Greetings' },
  ]},
]
```
Category IDs must be unique per language. IDs 1–8 are reserved for the core paths (greetings, numbers, family, food, colors, days, phrases, body).

**3. Register** (`src/data/alphabets/index.ts` and `src/data/lessons/index.ts`)
Add the new language export to the `LESSONS` / `ALPHABETS` record.

### Data Helper Functions
Always use these — never import raw data directly:
```typescript
import { getAlphabets, countAlphabets } from '../data/alphabets'
import { getLessons, countLessons } from '../data/lessons'
import { getSentences } from '../data/sentences'
import { getDialogues } from '../data/dialogues'
```

---

## Component Patterns

### Page Components
- Import `SectionHeader` for consistent page titles
- Use `useAppStore(s => s.darkMode)` for theme-aware styling
- Define colors inline with conditional objects:
```typescript
const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
```
- Add `← Back` button on nested pages (use `useNavigate()` + `navigate(-1)`)

### Reusable UI Components
```
components/ui/
  SectionHeader.tsx    — Page title + subtitle + icon
  LearningCard.tsx     — Learning path card (used on HomePage)
  BottomNav.tsx        — Mobile navigation (6 tabs)
  Confetti.tsx         — Celebration effects
  Gamification.tsx     — XP, streak, level badges
  Mascot.tsx           — Floating mascot with speech bubble
```

### Sound + Mascot Hooks
Pages that need feedback should use:
```typescript
const sounds = useSounds()
const mascot = useMascot()
// On correct: sounds.playCorrect(); mascot.celebrate()
// On wrong:   sounds.playWrong(); mascot.encourage()
```

---

## Styling Conventions

### Tailwind 4
- No `tailwind.config.js` — uses CSS-based config in `index.css`
- Utility classes for layout: `grid`, `flex`, `gap-3`, `rounded-2xl`, `p-4`
- Conditional dark mode: always check `darkMode` store value, don't rely on `dark:` variants alone

### Color Tokens (use these values)
```
Background (dark):  #0f172a
Card BG (dark):      rgba(30,41,59,0.7)
Primary:             #6366f1 (indigo-500)
Accent:              #fbbf24 (amber-400)
Success:             #10b981 (emerald-500)
Error:               #ef4444 (red-500)
Text primary:        #f8fafc (dark) / #0f172a (light)
Text secondary:      #94a3b8 (dark) / #475569 (light)
```

### Native Script Fonts
Always apply via inline style:
```typescript
style={{ fontFamily: '"Noto Sans Tamil", "Noto Sans Devanagari", "Noto Sans Telugu", serif' }}
```

---

## Quiz System

### Two Quiz Types
1. **Alphabet Quiz** (`quizType = 'alpha'`)
   - Shows: `quizWord.name` (romanized)
   - Options: `(opt as AlphabetChar).char`
   - Correct check: `opt.char === quizWord.char`

2. **Word Quiz** (`quizType = 'words'`)
   - Shows: `(quizWord as WordItem).english` + `.meaning`
   - Options: `(opt as WordItem).native`
   - Correct check: `opt.english === quizWord.english`

### Answer Flow
Always use the store action — don't duplicate logic:
```typescript
const handleQuizAnswer = useAppStore(s => s.handleQuizAnswer)
const correct = handleQuizAnswer(option) // returns boolean
if (correct) { sounds.playCorrect(); mascot.celebrate() }
else { sounds.playWrong(); mascot.encourage() }
```

The store handles: score update, XP, feedback state, selected answer.

---

## SRS (Spaced Repetition)

### Adding Items to SRS
```typescript
addSRSItem({
  id: `word:${word.english}`,
  type: 'word',
  content: word.native,
  meaning: word.english,
})
```

### Rating Items
```typescript
rateSRSItem(item.id, 3) // 1=Again, 2=Hard, 3=Good, 4=Easy
```

The SM-2 algorithm updates `easeFactor`, `interval`, `repetitions`, and `nextReview` automatically.

---

## Build & Deploy

### Automatic Version Bump
Every `npm run build` triggers `scripts/patch.js`:
- Bumps patch version in `package.json`
- Generates `YYYYMMDDDD-HHMM` build timestamp
- Writes both to `src/version.ts`

### Deploy Script
```bash
./scripts/deploy.sh        # Full pipeline
./scripts/deploy.sh --build # Build only
./scripts/deploy.sh --copy  # Deploy existing dist
```

### Manual Deploy
```bash
npm run build
rm -rf /var/www/apps/language-learning/*
cp -r dist/* /var/www/apps/language-learning/
systemctl reload nginx
```

---

## Common Gotchas

1. **Base path** — Vite config sets `base: '/language-learning/'`. All assets and routes are relative to this.

2. **Router state** — HomePage passes `wordCategoryId` via `navigate('/quiz', { state: { wordCategoryId: 4 } })`. QuizPage reads it with `useLocation().state`.

3. **Language switching** — `setCurrentLanguage()` resets quiz, practice, and card indices. Don't try to preserve quiz state across language changes.

4. **Store persistence** — Only specific fields are persisted (see `partialize` in `useAppStore.ts`). Transient UI state (e.g., `quizActive`) is NOT persisted.

5. **Gunithalu/UyirMei naming** — Different languages use different terms:
   - Tamil: `uyirMei` (in alphabets data)
   - Telugu: `gunihalu` (in alphabets data)
   - Hindi: compounds generated from consonants + matras (no separate group)

6. **MatchPage vs FlashcardPage** — Both use `FlashcardMode` component. MatchPage shows grid for large sets (>20 items), flashcard mode for small sets.

---

## File Inventory

### Pages (11)
HomePage, PracticePage, FlashcardPage, MatchPage, QuizPage, GunithaluPage, ReviewPage, SentencesPage, DialoguesPage, ProgressPage, ProfilePage

### Components (12)
AnimatedFeedback, ErrorBoundary, FlashcardMode, MatchGame, SpeechButton, Layout, BottomNav, Confetti, Gamification, LearningCard, Mascot, SectionHeader

### Hooks (4)
useAdaptiveLearning, useMascot, useSounds, useSpeech

### Data (12 files)
alphabets: index, tamil, hindi, telugu
lessons: index, tamil, hindi, telugu
sentences: index, tamil, hindi, telugu
dialogues: index, tamil, hindi, telugu

---

## Testing Changes

After any code change:
1. `cd /root/Projects/language-learning`
2. `npm run build` (catches TypeScript errors)
3. `./scripts/deploy.sh --copy` (if build succeeded)
4. Verify at `http://<server>/language-learning/`

---

*Last updated: 2026-05-08*
