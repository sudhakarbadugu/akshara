# GitHub Copilot Instructions — Language Learning App

## Project Context

React 19 + TypeScript + Vite + Tailwind CSS 4 SPA for learning Indian languages (Tamil, Hindi, Telugu). All data is static TypeScript. State managed by Zustand with localStorage persistence. Deployed to nginx at `/language-learning/`.

---

## Code Style

### TypeScript
- Strict mode enabled. No `any` unless absolutely necessary.
- Use explicit return types on store actions and complex functions.
- Prefer interfaces over types for object shapes.
- Use `as const` for arrays/objects that should not be mutated.

### Naming
- Components: PascalCase (`QuizPage.tsx`, `LearningCard.tsx`)
- Hooks: camelCase starting with `use` (`useSounds.ts`, `useMascot.ts`)
- Store actions: camelCase (`startWordQuiz`, `markAlphabetLearned`)
- Types/Interfaces: PascalCase (`WordItem`, `AlphabetData`)
- Constants: UPPER_SNAKE_CASE for true constants

### Imports
Group imports in this order:
1. React/core imports
2. Third-party libraries (framer-motion, lucide-react, etc.)
3. Internal components
4. Hooks
5. Store
6. Data helpers
7. Types
8. Utils

Example:
```typescript
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useSounds } from '../hooks/useSounds'
import { useAppStore } from '../store/useAppStore'
import { getLessons } from '../data/lessons'
import type { WordItem } from '../types'
```

---

## Store Usage (Critical)

### Reading State
Always use selectors — never the full store:
```typescript
// ✅ Good
const darkMode = useAppStore(s => s.darkMode)
const score = useAppStore(s => s.score)

// ❌ Bad — causes re-renders on any state change
const state = useAppStore()
```

### Calling Actions
Import the action selector, not the whole store:
```typescript
// ✅ Good
const startWordQuiz = useAppStore(s => s.startWordQuiz)
startWordQuiz(categoryId)

// ❌ Bad
useAppStore.getState().startWordQuiz(categoryId) // Only in non-React contexts
```

### State Updates
Store actions handle all state updates. Don't update state directly from components:
```typescript
// ✅ Good — store action handles everything
const correct = handleQuizAnswer(option)

// ❌ Bad — bypassing store logic
useAppStore.setState({ score: { correct: score.correct + 1, wrong: score.wrong } })
```

### Computed Values
Use store helpers, not manual calculation:
```typescript
// ✅ Good
const overallPct = useAppStore(s => s.getOverallPct())

// ❌ Bad — duplicated logic
const pct = Math.round((learned.length / total) * 100)
```

---

## Component Patterns

### Page Structure
Every page should follow this pattern:
```typescript
export function PageName() {
  const navigate = useNavigate()
  const darkMode = useAppStore(s => s.darkMode)
  
  // Theme-aware colors
  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  
  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Back button on nested pages */}
      <button onClick={() => navigate(-1)}>← Back</button>
      
      <SectionHeader title="Title" subtitle="Subtitle" icon="📝" darkMode={darkMode} />
      
      {/* Page content */}
    </div>
  )
}
```

### Props Interface
Always define props as an interface:
```typescript
interface MyComponentProps {
  items: FlashcardItem[]
  darkMode: boolean
  onComplete?: (count: number) => void
}

export function MyComponent({ items, darkMode, onComplete }: MyComponentProps) {
  // ...
}
```

### Conditional Classes
Use template literals with clsx-style patterns:
```typescript
className={`rounded-xl p-4 border transition-all ${
  isActive 
    ? 'bg-indigo-500 text-white border-indigo-400' 
    : darkMode 
      ? 'bg-slate-800 border-slate-700 text-slate-300' 
      : 'bg-white border-slate-200 text-slate-700'
}`}
```

---

## Data Layer

### Adding Words to a Language
Edit the appropriate `src/data/lessons/<lang>.ts` file:
```typescript
{
  english: 'Hello',
  native: 'வணக்கம்',
  pronunciation: 'Vanakkam',
  meaning: 'Hello / Greetings'
}
```
All four fields are required. Pronunciation should be romanized.

### Adding Alphabets
Edit `src/data/alphabets/<lang>.ts`. Each character needs:
```typescript
{
  char: 'அ',
  name: 'a',
  english: 'a as in apple',
  emoji: '🍎',
  keyword: 'apple',
  keywordTamil: 'ஆப்பிள்',
  example: 'அம்மா (mother)',
  tip: 'Open your mouth wide'
}
```
Only `char`, `name`, and `english` are required. Others are optional.

### Data Registry
After adding a new language, update:
1. `src/data/alphabets/index.ts` — add to `ALPHABETS` record
2. `src/data/lessons/index.ts` — add to `LESSONS` record
3. `src/data/sentences/index.ts` — add to `SENTENCES` record
4. `src/data/dialogues/index.ts` — add to `DIALOGUES` record
5. `src/i18n/languages.ts` — add language config
6. `src/types/index.ts` — add to `Language` union type

---

## Quiz Implementation

### Correct Answer Logic
Alphabet quiz compares `char`, word quiz compares `english`:
```typescript
const isCorrect = quizType === 'alpha'
  ? (opt as AlphabetChar).char === (quizWord as AlphabetChar).char
  : (opt as WordItem).english === (quizWord as WordItem).english
```

### Option Generation
Always include exactly 4 options (1 correct + 3 wrong), shuffled:
```typescript
const wrongOptions = allWords.filter(w => w.english !== correctWord.english).slice(0, 3)
const options = [correctWord, ...wrongOptions].sort(() => Math.random() - 0.5)
```

### Next Question Flow
```typescript
const nextQuestion = () => {
  if (quizType === 'alpha') {
    startAlphaQuiz()
  } else if (selectedCategory) {
    startWordQuiz(selectedCategory)
  }
}
```

---

## Styling Rules

### Tailwind 4
- No arbitrary values in classes — use inline styles for dynamic values
- Use Tailwind for: layout (flex, grid, gap), spacing (p-4, m-2), sizing (w-full, h-12), rounded (rounded-xl, rounded-2xl), borders (border, border-2)
- Use inline styles for: dynamic colors, conditional backgrounds, font sizes with rem

### Color Scheme (Dark Mode Default)
```
Background:      #0f172a
Card:            rgba(30,41,59,0.7)
Primary:         #6366f1
Secondary:       #8b5cf6
Accent/Text:     #fbbf24
Success:         #10b981
Error:           #ef4444
Text Primary:    #f8fafc
Text Secondary:  #94a3b8
```

### Dark Mode Pattern
Always use the store value, not media queries:
```typescript
const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
```

---

## Sound & Feedback

### Play Sounds
```typescript
const sounds = useSounds()
sounds.playCorrect()  // On correct answer
sounds.playWrong()    // On wrong answer
sounds.playClick()    // On button click
sounds.playLevelUp()  // On level up
```

### Mascot Feedback
```typescript
const mascot = useMascot()
mascot.celebrate()   // Confetti + happy message
mascot.encourage()   // Supportive message
mascot.tip()         // Learning tip
```

---

## Common Mistakes to Avoid

1. **Don't use `useAppStore()` without selectors** — causes unnecessary re-renders
2. **Don't call `useAppStore.getState()` in render** — use selectors or `useEffect`
3. **Don't duplicate store logic in components** — use store actions
4. **Don't forget to add `← Back` button** on new pages
5. **Don't hardcode language-specific strings** — use `currentLanguage` from store
6. **Don't forget to handle `quizActive=false` state** in QuizPage
7. **Don't use `window.location` for navigation** — use `useNavigate()` from react-router
8. **Don't mutate arrays directly** — always return new arrays for state updates
9. **Don't forget aria-labels** on interactive elements
10. **Don't use `Math.random()` in render without memoization** — causes flicker

---

## Testing Workflow

After any code change:
1. Run `npm run build` to catch TypeScript errors
2. If build succeeds, test with `./scripts/deploy.sh --copy`
3. Verify at `http://<server>/language-learning/`
4. Check browser console for runtime errors

---

## Adding New Features

### New Page
1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add nav item in `src/components/ui/BottomNav.tsx` (if needed)
4. Add page key in `src/components/Layout.tsx` `pageToRoute`/`routeToPage` maps
5. Add `← Back` button

### New Component
1. Create in `src/components/` or `src/components/ui/`
2. Export from file
3. Import where needed
4. Add prop interface

### New Store Action
1. Add to `useAppStore.ts` in the `(set, get) => ({...})` creator
2. If it persists, add field to `partialize`
3. Use in component via selector

---

## Performance Tips

- Memoize expensive computations with `useMemo`
- Memoize callbacks with `useCallback` when passed to child components
- Use `React.memo()` for pure components that re-render often
- Lazy load heavy pages with `React.lazy()` + `Suspense`
- Don't log state in render — use `useEffect` for debugging

---

## Accessibility Requirements

- All buttons must have `aria-label` or visible text
- Use `focus-visible:ring-2 focus-visible:ring-indigo-400` on interactive elements
- Use `role="status"` and `aria-live="polite"` for dynamic score updates
- Ensure color is not the only indicator (use icons + text for correct/wrong)
- Native script text must have proper `fontFamily` for rendering

---

## Deployment Checklist

Before deploying:
- [ ] `npm run build` passes without errors
- [ ] No `console.log` statements left in production code
- [ ] All routes work correctly in built app (not just dev)
- [ ] Back buttons work on all nested pages
- [ ] Language switcher works on all pages
- [ ] Sound effects play correctly
- [ ] No broken images or missing assets

---

*Last updated: 2026-05-08*
