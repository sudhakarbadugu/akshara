# 30-Day Language Learning Journey - Implementation Plan

## 📋 Overview

Build a complete "30-Day Language Learning Journey" feature for the existing Language Learning App.

**Target Users:** English speakers learning Telugu, Tamil, or Hindi (already know alphabets, vowels, consonants, gunithalu/matras)

**Goal:** Progress from words → phrases → sentences → conversations over 30 days

**Experience:** Duolingo + Ling + Kids Learning App + AI Tutor, optimized for Indian languages

---

## 🏗️ Existing Architecture (What We Have)

### Data Layer (`src/data/`)
- `alphabets/` — Vowels, consonants, compounds per language
- `lessons/` — Word categories (greetings, numbers, family, food, colors, days, phrases, body)
- `sentences/` — 98 sentences per language by category
- `dialogues/` — 5 conversation scenarios per language
- `journey/` — **EMPTY** (we will fill this)

### Pages (`src/pages/`)
- `HomePage.tsx` — Learning paths hub
- `PracticePage.tsx` — Letter tracing practice
- `FlashcardPage.tsx` — Flashcard study mode
- `MatchPage.tsx` — Word-image matching game
- `QuizPage.tsx` — Multiple choice quizzes
- `GunithaluPage.tsx` — Compound letter practice
- `SentencesPage.tsx` — Sentence library with audio
- `DialoguesPage.tsx` — Conversation practice
- `ProgressPage.tsx` — Progress tracking
- `ProfilePage.tsx` — User settings
- `ReviewPage.tsx` — SRS review
- `HomeworkPage.tsx` — Daily assignments

### Components (`src/components/`)
- `SpeechButton.tsx` — TTS + speech recognition
- `FlashcardMode.tsx` — Reusable flashcard UI
- `MatchGame.tsx` — Matching game logic
- `AnimatedFeedback.tsx` — Correct/wrong animations
- `ui/` — LearningCard, SectionHeader, BottomNav, Confetti, Gamification, Mascot

### Hooks (`src/hooks/`)
- `useSpeech.ts` — TTS + speech recognition (Web Speech API)
- `useSpeechRecognition` — Mic input with matching
- `useSounds.ts` — Sound effects
- `useMascot.ts` — Mascot reactions
- `useAdaptiveLearning.ts` — Session tracking

### Store (`src/store/useAppStore.ts`)
**Journey state already exists:**
- `currentJourneyDay: number` (1-30)
- `completedJourneyDays: number[]`
- `journeyXP: number`
- `journeyStreak: number`
- `startJourney()` action
- `completeDay(day, xp)` action
- `getJourneyProgress()` helper

### Types (`src/types/index.ts`)
**Journey types already defined:**
```typescript
interface JourneyDay {
  day, week, theme, subtitle, icon, dailyGoal, xpReward
  vocabulary: WordItem[]
  learningCard: { native, english, pronunciation, meaning, tip }[]
  sentenceOfDay: { english, native, pronunciation, meaning, wordByWordBreakdown }
  dialogue?: { title, scenario, lines: DialogueLine[] }
  activities: JourneyActivity[]
  quiz: QuizQuestion[]
  realLifeUsage: string[]
  revisionWords: string[]
}

interface JourneyActivity {
  type: 'tap-listen' | 'match' | 'arrange' | 'speak' | 'write' | 'listen-fill' | 'dialogue'
  title, instruction, data, xpReward
}

interface QuizQuestion {
  question, options[], correct (index), correctAnswer
}
```

---

## 📅 30-Day Curriculum Structure

### WEEK 1 — WORD FOUNDATION (Days 1-7)
| Day | Theme | Focus | XP |
|-----|-------|-------|-----|
| 1 | 🎨 Colors | Object recognition, reading | 50 |
| 2 | 🍎 Fruits | Food vocabulary | 50 |
| 3 | 🦁 Animals | Animal names + sounds | 50 |
| 4 | 👨‍👩‍👧‍👦 Family | Family members | 50 |
| 5 | 🔢 Numbers 1-10 | Counting | 50 |
| 6 | 🦴 Body Parts | Body vocabulary | 50 |
| 7 | 📚 Common Objects | Everyday items | 50 |

### WEEK 2 — BASIC SENTENCES (Days 8-14)
| Day | Theme | Focus | XP |
|-----|-------|-------|-----|
| 8 | 👋 Introductions | "My name is..." | 60 |
| 9 | 🌅 Greetings | Hello, good morning | 60 |
| 10 | 🚶 Daily Activities | "I am eating/going" | 60 |
| 11 | 🍛 Food & Drinks | "I want water" | 60 |
| 12 | 🔍 Describing Things | Big, small, beautiful | 60 |
| 13 | ❓ Asking Questions | What, where, how | 60 |
| 14 | 🗺️ Location | Here, there, near, far | 60 |

### WEEK 3 — CONVERSATION & LISTENING (Days 15-21)
| Day | Theme | Focus | XP |
|-----|-------|-------|-----|
| 15 | 🥬 At the Market | Buying, prices | 70 |
| 16 | 🍽️ Restaurant | Ordering food | 70 |
| 17 | 🏥 At the Doctor | Symptoms, advice | 70 |
| 18 | 🚉 Directions | Finding places | 70 |
| 19 | 📖 At School | Friends, studies | 70 |
| 20 | 📱 Phone Call | Answering, messages | 70 |
| 21 | 💬 With a Friend | Casual chat | 70 |

### WEEK 4 — FLUENCY & CONFIDENCE (Days 22-30)
| Day | Theme | Focus | XP |
|-----|-------|-------|-----|
| 22 | 🌅 Daily Routine | Morning to night | 80 |
| 23 | ☀️ Weather | Seasons, temperature | 80 |
| 24 | ❤️ Emotions | Happy, sad, excited | 80 |
| 25 | ✈️ Travel | Tickets, transport | 80 |
| 26 | 🛍️ Shopping | Bargaining, clothes | 80 |
| 27 | 🆘 Emergency | Help, police, hospital | 80 |
| 28 | 📖 Story Time | Reading comprehension | 80 |
| 29 | 🗣️ Free Conversation | All skills combined | 80 |
| 30 | 🎉 Celebration | Review + certificate | 100 |

---

## 🎯 Daily Lesson Structure

Each day contains:

### 1. Vocabulary Section (5-8 words)
- Word cards with native script, pronunciation, English
- Tap to hear audio (normal + slow)
- Image association

### 2. Learning Card
- Large native text display
- Pronunciation guide
- English meaning
- Fun tip/fact

### 3. Sentence of the Day
- Full sentence in native script
- Word-by-word breakdown
- Audio playback

### 4. Interactive Activities (4-6 per day)
| Type | Description | Component |
|------|-------------|-----------|
| tap-listen | Hear audio, tap correct word | `TapListenActivity` |
| match | Match word to image | `MatchActivity` |
| arrange | Arrange shuffled words | `ArrangeSentenceActivity` |
| speak | Speak sentence, get scored | `SpeakingChallenge` |
| write | Trace/write word | `WritingCanvas` |
| listen-fill | Listen, fill missing word | `ListenFillActivity` |
| dialogue | Read/speak dialogue lines | `DialogueActivity` |

### 5. Quiz (5 questions)
- Multiple choice
- 10 XP per correct answer
- Instant feedback

### 6. Real-Life Usage
- 3-5 practical sentences
- Context examples

### 7. Revision
- Spaced repetition from previous days

---

## 🧩 Component Architecture

### New Components to Build

```
src/components/
├── WritingCanvas.tsx          # Touch drawing/tracing
├── SpeakingChallenge.tsx      # Speech practice + scoring
├── TapListenActivity.tsx      # Tap correct word when heard
├── ArrangeSentenceActivity.tsx # Arrange words in order
├── ListenFillActivity.tsx     # Listen and fill blanks
├── DialogueActivity.tsx       # Interactive dialogue reader
└── ui/
    ├── ProgressRing.tsx       # Circular progress indicator
    ├── JourneyCard.tsx        # Journey overview card
    └── DayCard.tsx            # Day progress card (grid)

src/pages/
├── JourneyPage.tsx            # Journey hub (week tabs, day grid)
└── DayLessonPage.tsx          # Daily lesson experience
```

### Updated Files
```
src/data/journey/
├── index.ts                   # Export getJourney(lang)
├── telugu.ts                  # 30-day Telugu curriculum
├── hindi.ts                   # 30-day Hindi curriculum
└── tamil.ts                   # 30-day Tamil curriculum

src/App.tsx                    # Add /journey, /journey/:day routes
src/components/ui/BottomNav.tsx # Add Journey nav item
src/pages/HomePage.tsx         # Add Journey entry card
```

---

## 📝 Implementation Phases

### Phase 1: Data Foundation (CURRENT)
- [ ] Create `src/data/journey/index.ts`
- [ ] Create `src/data/journey/telugu.ts` (30 days, Week 1-2 first)
- [ ] Create `src/data/journey/hindi.ts` (30 days, Week 1-2 first)
- [ ] Create `src/data/journey/tamil.ts` (30 days, Week 1-2 first)

### Phase 2: Core Components
- [ ] `src/components/ui/ProgressRing.tsx`
- [ ] `src/components/ui/DayCard.tsx`
- [ ] `src/components/WritingCanvas.tsx`
- [ ] `src/components/SpeakingChallenge.tsx`

### Phase 3: Activity Components
- [ ] `src/components/TapListenActivity.tsx`
- [ ] `src/components/ArrangeSentenceActivity.tsx`
- [ ] `src/components/ListenFillActivity.tsx`
- [ ] `src/components/DialogueActivity.tsx`

### Phase 4: Pages
- [ ] `src/pages/JourneyPage.tsx`
- [ ] `src/pages/DayLessonPage.tsx`

### Phase 5: Integration
- [ ] Update `src/App.tsx` (routes)
- [ ] Update `src/components/ui/BottomNav.tsx` (nav item)
- [ ] Update `src/pages/HomePage.tsx` (journey entry)

### Phase 6: Polish & Deploy
- [ ] Test all activities
- [ ] Build verification
- [ ] Deploy to nginx

---

## 🎨 Design System

### Colors (from existing app)
```
Background (dark): #0f172a
Card BG (dark): rgba(30,41,59,0.7)
Primary: #6366f1 (indigo-500)
Accent: #fbbf24 (amber-400)
Success: #10b981 (emerald-500)
Error: #ef4444 (red-500)
```

### Animations (Framer Motion)
```tsx
// Fade in up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: i * 0.06 }}

// Tap/hover
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.97 }}
```

### Native Fonts
```tsx
style={{ fontFamily: '"Noto Sans Telugu", "Noto Sans Devanagari", "Noto Sans Tamil", serif' }}
```

---

## 🔧 Technical Patterns

### Store Usage
```tsx
const currentLanguage = useAppStore(s => s.currentLanguage)
const darkMode = useAppStore(s => s.darkMode)
const completeDay = useAppStore(s => s.completeDay)
const getJourneyProgress = useAppStore(s => s.getJourneyProgress)
```

### Speech Hook Usage
```tsx
const { speak, speakSlow, stop } = useSpeech()
const { startListening, isListening, checkMatch } = useSpeechRecognition(lang)
```

### Data Access
```tsx
import { getJourney } from '../data/journey'
const journey = getJourney(currentLanguage)
const dayData = journey[day - 1] // 0-indexed
```

### Dark Mode Pattern
```tsx
const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
const textSecondary = darkMode ? '#94a3b8' : '#475569'
```

---

## 🚀 Next Steps

1. **Start with Phase 1** — Create journey data files (Telugu Week 1-2 first)
2. **Test data structure** — Verify types compile
3. **Build incrementally** — One phase at a time
4. **Build & deploy** — After each phase, verify

---

*Plan created: 2026-05-08*
*Status: Ready to begin Phase 1*
