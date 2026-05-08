# 30-Day Language Learning Journey — Master Implementation Plan

## 📋 Executive Summary

Build a complete gamified 30-Day Language Learning Journey for Telugu, Tamil, and Hindi.
Users already know alphabets, vowels, consonants, and gunithalu/matras.
Goal: progress from words → phrases → sentences → conversations → real-life fluency.

---

## 🏗️ Existing Architecture Verified

### Data Layer (`src/data/`)
| Layer | Status | Notes |
|-------|--------|-------|
| `alphabets/` | ✅ Complete | Vowels, consonants, compounds per language |
| `lessons/` | ✅ Complete | Word categories (greetings, numbers, family, food, colors, days, phrases, body) |
| `sentences/` | ✅ Complete | ~98 sentences per language by category |
| `dialogues/` | ✅ Complete | 5 conversation scenarios per language |
| `journey/` | ⚠️ EMPTY | `index.ts` exists but language files missing — this is our target |

### Store (`src/store/useAppStore.ts`)
- ✅ Journey state already exists: `currentJourneyDay`, `completedJourneyDays`, `journeyXP`, `journeyStreak`, `journeyStartDate`
- ✅ Actions: `startJourney()`, `completeDay(day, xp)`, `getJourneyProgress()`

### Types (`src/types/index.ts`)
- ✅ `JourneyDay`, `JourneyActivity`, `QuizQuestion` interfaces fully defined

### Pages (`src/pages/`)
- ✅ 11 pages exist, no Journey or DayLesson pages yet

### Components (`src/components/`)
- ✅ Reusable: `SpeechButton`, `FlashcardMode`, `MatchGame`, `AnimatedFeedback`, `ui/` helpers
- ❌ Need: `WritingCanvas`, `SpeakingChallenge`, `TapListenActivity`, `ArrangeSentenceActivity`, `ListenFillActivity`, `DialogueActivity`
- ❌ Need UI: `ProgressRing`, `JourneyCard`, `DayCard`

---

## 📅 Full 30-Day Curriculum (All 3 Languages)

### WEEK 1 — WORD FOUNDATION (Days 1-7)
| Day | Theme | Focus | XP |
|-----|-------|-------|-----|
| 1 | 🎨 Colors | Object recognition, reading words | 50 |
| 2 | 🍎 Fruits | Food vocabulary, pronunciation | 50 |
| 3 | 🦁 Animals | Animal names + sounds + actions | 50 |
| 4 | 👨‍👩‍👧‍👦 Family | Family members + relationships | 50 |
| 5 | 🔢 Numbers 1-10 | Counting, quantity basics | 50 |
| 6 | 🦴 Body Parts | Body vocabulary + simple descriptions | 50 |
| 7 | 📚 Common Objects | Everyday items + "this is/that is" | 50 |

**Week 1 Difficulty Model:**
- Vocabulary: 6 words per day
- Activities: tap-listen, match, write (trace), speak (single words)
- Quiz: 3 MCQ questions
- Sentence: 1 simple sentence using Day 1-3 vocabulary
- Revision: Words from previous 2 days

### WEEK 2 — BASIC SENTENCES (Days 8-14)
| Day | Theme | Focus | XP |
|-----|-------|-------|-----|
| 8 | 👋 Introductions | "My name is..." / "I am from..." | 60 |
| 9 | 🌅 Greetings | Hello, good morning, good night | 60 |
| 10 | 🚶 Daily Activities | "I am eating/going/reading" | 60 |
| 11 | 🍛 Food & Drinks | "I want water/rice" / "Give me tea" | 60 |
| 12 | 🔍 Describing Things | Big, small, beautiful, hot, cold | 60 |
| 13 | ❓ Asking Questions | What, where, how, who, when | 60 |
| 14 | 🗺️ Location | Here, there, near, far, in, on, under | 60 |

**Week 2 Difficulty Model:**
- Vocabulary: 6 words + 2 new grammar markers per day
- Activities: tap-listen, match, arrange (2-3 word phrases), speak (short phrases), write (copy sentence)
- Quiz: 4 MCQ questions
- Sentence: 1-2 sentences with word-by-word breakdown
- Dialogue: 2-line greeting exchange (Day 9+)
- Revision: Words from Week 1 + previous 2 days

### WEEK 3 — CONVERSATION & LISTENING (Days 15-21)
| Day | Theme | Focus | XP |
|-----|-------|-------|-----|
| 15 | 🥬 At the Market | Buying, prices, quantities | 70 |
| 16 | 🍽️ Restaurant | Ordering food, tastes, paying | 70 |
| 17 | 🏥 At the Doctor | Symptoms, advice, medicines | 70 |
| 18 | 🚉 Directions | Finding places, asking help | 70 |
| 19 | 📖 At School | Friends, studies, teacher | 70 |
| 20 | 📱 Phone Call | Answering, messages, plans | 70 |
| 21 | 💬 With a Friend | Casual chat, hobbies, plans | 70 |

**Week 3 Difficulty Model:**
- Vocabulary: 8 words per day (includes some review words)
- Activities: listen-fill, arrange (4-5 word sentences), dialogue (3-4 lines), speak (full sentences), write (fill-in-blanks)
- Quiz: 5 MCQ questions with sentence comprehension
- Sentence: 2-3 sentences, complex structures
- Dialogue: 4-6 line exchanges
- Revision: Spaced repetition from Weeks 1-2

### WEEK 4 — FLUENCY & CONFIDENCE (Days 22-30)
| Day | Theme | Focus | XP |
|-----|-------|-------|-----|
| 22 | 🌅 Daily Routine | Morning to night full routine | 80 |
| 23 | ☀️ Weather | Seasons, temperature, planning | 80 |
| 24 | ❤️ Emotions | Happy, sad, excited, angry, worried | 80 |
| 25 | ✈️ Travel | Tickets, transport, luggage | 80 |
| 26 | 🛍️ Shopping | Bargaining, clothes, sizes | 80 |
| 27 | 🆘 Emergency | Help, police, hospital, lost | 80 |
| 28 | 📖 Story Time | Reading comprehension (short story) | 80 |
| 29 | 🗣️ Free Conversation | All skills combined — open-ended | 80 |
| 30 | 🎉 Celebration | Review + achievement certificate | 100 |

**Week 4 Difficulty Model:**
- Vocabulary: 10 words per day (mix of new + review)
- Activities: All activity types combined, free-response speaking, full dialogue practice
- Quiz: 5-6 questions including comprehension
- Sentence: 3-4 connected sentences
- Dialogue: Full 5-6 line exchanges with role-play
- Revision: Comprehensive review — 10 words from across all weeks
- Story: Day 28 includes a 3-4 sentence mini-story to read

---

## 🎯 Daily Lesson Structure Template

Each day contains:

### 1. Opening Screen
- Day badge + theme icon + XP reward preview
- Animated mascot welcome message
- Daily objective statement

### 2. Vocabulary Section (6-10 words)
- Word cards: native script | pronunciation | English meaning
- Tap to hear audio (normal + slow)
- Image association hint
- Streak animation for first-time view

### 3. Learning Card (Featured Word/Phrase)
- Large native text display
- Pronunciation guide with syllable breaks
- English meaning + contextual usage
- Fun cultural tip/fact (e.g., "In Telugu, 'Akka' for older sister shows respect")

### 4. Sentence of the Day
- Full sentence in native script
- Word-by-word breakdown: `[word] = [meaning]`
- Audio playback (normal + slow)
- Visual highlight as audio plays

### 5. Interactive Activities (4-6 per day)
| # | Type | Week Introduced | Description |
|---|------|----------------|-------------|
| 1 | tap-listen | Week 1 | Hear audio → tap correct word from 4 options |
| 2 | match | Week 1 | Match native word to English meaning or image |
| 3 | arrange | Week 2 | Arrange shuffled word tiles into correct sentence |
| 4 | speak | Week 1-4 | Speak sentence/word → get accuracy score |
| 5 | write | Week 1 | Trace/write word on canvas, compare to target |
| 6 | listen-fill | Week 3 | Listen to sentence, fill in the missing word |
| 7 | dialogue | Week 3 | Read/speak dialogue lines alternately |

### 6. Mini Quiz (3-6 questions, increasing)
- Multiple choice: native→English or English→native
- Sentence comprehension questions (Week 3+)
- 10 XP per correct answer
- Instant animated feedback (confetti on perfect score)

### 7. Real-Life Usage (3-5 practical examples)
- Context: Where/when you'd use these words
- Example dialogues or scenarios
- Cultural notes where relevant

### 8. Revision Challenge
- Spaced repetition: words from previous days
- 5 review items, mix of tap-listen + match
- Bonus XP for streak of correct reviews

### 9. Day Complete Screen
- XP earned summary
- Progress ring animation
- Streak update
- Share/continue buttons

---

## 📊 Vocabulary Roadmap (Cumulative)

| Week | New Words/Day | Cumulative New | Review Pool |
|------|---------------|----------------|-------------|
| 1 | 6 | 42 | 42 |
| 2 | 6 (+2 grammar) | 84 (+14 grammar) | 98 |
| 3 | 8 | 140 | 140 |
| 4 | 10 | 230 | 230 |

**Grammar Markers Introduced:**
- Week 2: "is/am/are" equivalents, possessives, basic question words
- Week 3: Tense markers (present continuous, past), postpositions (in, on, at)
- Week 4: Complex connectors, polite forms, imperative forms

---

## 🔄 Revision Strategy (Spaced Repetition)

### Built-in SRS Integration
- Every word learned in journey is auto-added to SRS
- Review schedule: Day 1→Day 2→Day 4→Day 7→Day 14→Day 30
- Difficulty ratings affect next review interval:
  - "Again" (1): review next day
  - "Hard" (2): review in 2 days
  - "Good" (3): review in interval × 1.3
  - "Easy" (4): review in interval × 2.0

### Daily Revision Challenge Rules
- Day N always includes 3-5 words from Day N-1 and Day N-2
- Every 7th day (Day 7, 14, 21, 28) includes a "Week Review" with 10 items
- Day 30 is 100% review — a comprehensive final test

---

## 📈 Difficulty Progression Model

| Dimension | Week 1 | Week 2 | Week 3 | Week 4 |
|-----------|--------|--------|--------|--------|
| **Vocab/day** | 6 words | 6 words + grammar | 8 words | 10 words |
| **Sentence length** | 2-3 words | 3-5 words | 5-8 words | 8-12 words |
| **Activities/day** | 4 simple | 4-5 mixed | 5-6 complex | 6 all types |
| **Quiz questions** | 3 | 4 | 5 | 5-6 |
| **Speaking** | Single words | Short phrases | Full sentences | Open response |
| **Listening** | Word recognition | Phrase comprehension | Sentence fill-in | Full dialogue |
| **Writing** | Letter tracing | Word copying | Fill blanks | Free writing |
| **Dialogue** | None | 2-line greeting | 4-6 lines | Full role-play |
| **XP reward** | 50/day | 60/day | 70/day | 80/day |
| **Total XP** | 350 | 420 | 490 | 730 |
| **Grand Total** | | | | **1,990 XP** |

---

## 🧩 Implementation Phases

### Phase 1: Data Foundation (WEEKS 1-2 DATA)
**Files to create:**
- `src/data/journey/telugu.ts` — Days 1-14
- `src/data/journey/hindi.ts` — Days 1-14
- `src/data/journey/tamil.ts` — Days 1-14
- Update `src/data/journey/index.ts` (already exists)

**Content per language file:**
- 14 `JourneyDay` objects with full vocabulary, activities, quiz, sentences, dialogue
- Activities: tap-listen, match, arrange, speak, write
- Quiz: 3-4 MCQ questions per day
- Real-life usage: 3-5 examples per day

**Deliverable:** Type-safe journey data that compiles. Test with `npm run build`.

---

### Phase 2: Data Foundation (WEEKS 3-4 DATA)
**Files to update:**
- Extend `src/data/journey/telugu.ts` — Days 15-30
- Extend `src/data/journey/hindi.ts` — Days 15-30
- Extend `src/data/journey/tamil.ts` — Days 15-30

**Content additions:**
- Listen-fill activities
- Dialogue activities (3-6 lines)
- Complex sentence structures
- Story content for Day 28
- Celebration content for Day 30

**Deliverable:** Complete 30-day data for all 3 languages.

---

### Phase 3: Core UI Components
**Files to create:**
- `src/components/ui/ProgressRing.tsx` — Circular progress with animation
- `src/components/ui/DayCard.tsx` — Day grid card (locked/active/completed states)
- `src/components/ui/JourneyCard.tsx` — Journey overview for HomePage
- `src/components/WritingCanvas.tsx` — Touch/mouse drawing with comparison
- `src/components/SpeakingChallenge.tsx` — Speech practice with scoring UI

**Deliverable:** Reusable components with Framer Motion animations, dark mode support.

---

### Phase 4: Activity Components
**Files to create:**
- `src/components/TapListenActivity.tsx` — Audio playback + word selection
- `src/components/ArrangeSentenceActivity.tsx` — Drag/sort word tiles
- `src/components/ListenFillActivity.tsx` — Audio + blank fill
- `src/components/DialogueActivity.tsx` — Interactive dialogue reader with role-play

**Deliverable:** All activity types working with sample data.

---

### Phase 5: Journey Pages
**Files to create:**
- `src/pages/JourneyPage.tsx` — Journey hub with week tabs, day grid, progress overview
- `src/pages/DayLessonPage.tsx` — Full daily lesson experience (all sections in sequence)

**Files to update:**
- `src/App.tsx` — Add `/journey` and `/journey/:day` routes
- `src/components/ui/BottomNav.tsx` — Add Journey nav item
- `src/pages/HomePage.tsx` — Add Journey entry card with CTA

**Deliverable:** Complete user flow from Home → Journey Hub → Day Lesson → Completion.

---

### Phase 6: Gamification & Polish
**Files to update:**
- Store integration: `completeDay()` wired to all activities
- Mascot reactions per activity type
- Sound effects via `useSounds.ts`
- Confetti + level-up animations
- Streak visualization
- Achievement unlocks for milestones (7-day streak, half-way, completion)

**Deliverable:** Fully gamified experience.

---

### Phase 7: Build & Deploy
- `npm run build` verification
- Deploy to `/var/www/apps/language-learning/`
- Update nginx if needed
- Test on mobile + desktop

---

## 🎨 Design System Notes

### Colors (existing app)
- Background (dark): #0f172a
- Card BG (dark): rgba(30,41,59,0.7)
- Primary: #6366f1
- Accent: #fbbf24
- Success: #10b981
- Error: #ef4444

### Animations
- Fade in up: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
- Tap/hover: `whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}`
- Progress ring: Framer Motion `pathLength` animation

### Fonts
- Telugu: "Noto Sans Telugu", serif
- Hindi: "Noto Sans Devanagari", serif
- Tamil: "Noto Sans Tamil", serif

---

## 🗓️ Model Usage Plan

When generating language content (vocabulary, sentences, dialogues):
1. **Primary:** `ollama/kimi-k2.6:cloud` — best quality for structured content
2. **Fallback:** GLM from ollama
3. **Emergency fallback:** `minimax2.7` if timeouts occur

For code generation (components, pages):
- Use available model directly (no special switching needed)

---

## ✅ Phase Completion Checklist

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Weeks 1-2 data (all 3 languages) | ⏳ Ready to start |
| 2 | Weeks 3-4 data (all 3 languages) | ⏳ Blocked on Phase 1 |
| 3 | Core UI components | ⏳ Blocked on Phase 2 |
| 4 | Activity components | ⏳ Blocked on Phase 3 |
| 5 | Journey pages + routing | ⏳ Blocked on Phase 4 |
| 6 | Gamification & polish | ⏳ Blocked on Phase 5 |
| 7 | Build & deploy | ⏳ Blocked on Phase 6 |

---

*Plan created: 2026-05-08*
*Next Step: Begin Phase 1 — Create Telugu Week 1-2 journey data*
