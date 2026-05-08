# 🌐 Language Learning — Interactive Multi-Language Web App

A multi-sensory language learning platform for beginners and kids. Supports **Tamil**, **Hindi**, and **Telugu**. Built with React 19, TypeScript, Vite, Tailwind CSS 4, and Framer Motion.

---

## ✨ Features

### 🌐 Multi-Language Support
- **Tamil** (தமிழ்) — 549+ words across 19 vocabulary categories, full alphabet with vowels, consonants, and Uyir Mei compounds
- **Hindi** (हिन्दी) — 537+ words across 19 vocabulary categories, full Devanagari alphabet with Swar, Vyanjan, and Matras
- **Telugu** (తెలుగు) — 476+ words across 19 vocabulary categories, full Telugu alphabet with Achchulu, Hallulu, and Gunithalu
- Instant language switcher in header — switches alphabets, lessons, TTS voice, sentences, and dialogues on the fly
- Fonts: Noto Sans Tamil, Noto Sans Devanagari, Noto Sans Telugu

### 🗣️ Speech & Audio
- **Text-to-Speech (TTS)** — Native pronunciation via Web Speech API with per-language voice selection
- **Speech-to-Text (STT)** — Mic button for pronunciation practice with fuzzy matching
- **Sound Effects** — Web Audio API synthesized chimes, boops, correct/wrong fanfares
- **Mute Toggle** — Master mute/unmute in the header

### 🎴 Learning Modes
| Mode | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Learning paths, progress, achievements, conversations hub |
| **Practice** | `/practice` | Canvas-based letter tracing with guide overlay and free-write mode |
| **Flashcards** | `/flashcard` | Flip cards for alphabets or vocabulary words with audio |
| **Study Cards** | `/match` | Grid review of words (large sets) or flashcard mode (small sets) |
| **Quiz** | `/quiz` | MCQ quiz — Alphabet Quiz (recognition) or Word Quiz (meaning & translation) |
| **Gunithalu** | `/gunithalu` | Compound letter explorer — consonant + vowel sign combos per language |
| **Review** | `/review` | SRS-powered review queue — flip cards with "Know It / Don't Know" ratings |
| **Sentences** | `/sentences` | 98 sentences per language grouped by category with audio playback |
| **Dialogues** | `/dialogues` | 5 conversation scenarios per language (A↔B roles) with audio playback |
| **Progress** | `/progress` | Overall stats, alphabet progress, word progress, achievements |
| **Profile** | `/profile` | XP, streak, level, quiz accuracy, achievements, reset progress |

### 🧠 Spaced Repetition System (SRS)
- **SM-2 Algorithm** — Adaptive review scheduling with ease factors, intervals, and repetition counts
- **4-Level Rating** — Again (1), Hard (2), Good (3), Easy (4)
- **Due Items** — Daily review queue based on calculated next-review dates
- **Mastery Tracking** — Percentage of items graduated to interval ≥ 1 day

### 🦜 Mascot
- Reacts to quiz answers — celebrates 🎉 on correct, encourages 💪 on wrong
- Draggable speech-bubble UI with contextual messages

### 🧩 Gamification
- **XP System** — Points for lessons, quizzes, and correct answers
- **Levels** — Auto-level up every 100 XP
- **Daily Streak** 🔥 — Consecutive-day tracking with streak break detection
- **Achievements** — 20 badges: First Word, Week Warrior, Alpha Master, Perfect Quiz, Trilingual, etc.
- **Confetti + Level-Up Modal** — Visual celebrations on milestones

### 🎨 UI/UX
- **Dark Mode Default** — Soft dark theme with indigo/amber/emerald accents; light mode toggle available
- **Animations** — Framer Motion page transitions, card flips, hover effects
- **Back Buttons** — Consistent `← Back` navigation on all nested pages
- **Responsive** — Mobile-first with bottom navigation and safe-area padding
- **Accessibility** — ARIA labels, focus-visible rings, live regions for score updates

---

## 🚀 Quick Start

```bash
cd /root/Projects/language-learning

# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type check
npx tsc --noEmit

# Build for production (outputs to dist/)
npm run build
```

---

## 📁 Project Structure

```
language-learning/
├── scripts/
│   ├── patch.js                # Auto-bump version + build timestamp
│   └── deploy.sh               # Build → deploy to nginx → reload
├── src/
│   ├── App.tsx                 # React Router routes with ErrorBoundary
│   ├── main.tsx                # React 19 entry point
│   ├── index.css               # Tailwind 4 + Google Fonts imports
│   ├── vite-env.d.ts           # TypeScript env declarations
│   ├── version.ts              # Auto-generated: APP_VERSION, APP_BUILD
│   ├── types/
│   │   └── index.ts            # All TypeScript interfaces + helper fns
│   ├── i18n/
│   │   └── languages.ts        # Language configs (BCP-47, flags, voice codes)
│   ├── store/
│   │   └── useAppStore.ts      # Zustand store with persist middleware
│   ├── hooks/
│   │   ├── useAdaptiveLearning.ts   # Weak-item tracking for quiz prioritization
│   │   ├── useMascot.ts        # Mascot state, messages, emotions
│   │   ├── useSounds.ts        # Web Audio API sound effects + mute
│   │   └── useSpeech.ts        # TTS + STT speech hooks
│   ├── data/
│   │   ├── alphabets/
│   │   │   ├── index.ts        # getAlphabets(), countAlphabets()
│   │   │   ├── tamil.ts        # Vowels, consonants, Uyir Mei
│   │   │   ├── hindi.ts        # Swar, Vyanjan, Matras
│   │   │   └── telugu.ts       # Achchulu, Hallulu, Gunithalu
│   │   ├── lessons/
│   │   │   ├── index.ts        # getLessons(), countLessons()
│   │   │   ├── tamil.ts        # 19 categories, 549 words
│   │   │   ├── hindi.ts        # 19 categories, 537 words
│   │   │   └── telugu.ts       # 19 categories, 476 words
│   │   ├── sentences/
│   │   │   ├── index.ts        # getSentences()
│   │   │   ├── tamil.ts        # 98 sentences
│   │   │   ├── hindi.ts        # 98 sentences
│   │   │   └── telugu.ts       # 98 sentences
│   │   └── dialogues/
│   │       ├── index.ts        # getDialogues()
│   │       ├── tamil.ts        # 5 scenarios
│   │       ├── hindi.ts        # 5 scenarios
│   │       └── telugu.ts       # 5 scenarios
│   ├── components/
│   │   ├── AnimatedFeedback.tsx     # Correct/wrong shake + feedback UI
│   │   ├── ErrorBoundary.tsx        # React error boundary with recovery
│   │   ├── FlashcardMode.tsx        # Flip-card component (front/back)
│   │   ├── MatchGame.tsx            # Letter↔image matching grid
│   │   ├── SpeechButton.tsx         # TTS play + STT mic button
│   │   ├── Layout.tsx               # App shell: header, nav, mascot, lang switcher
│   │   └── ui/
│   │       ├── BottomNav.tsx        # Mobile bottom tab bar
│   │       ├── Confetti.tsx         # Confetti burst + level-up modal
│   │       ├── Gamification.tsx     # XP badge, streak badge, level badge
│   │       ├── LearningCard.tsx     # Learning path card with progress
│   │       ├── Mascot.tsx           # Draggable emoji mascot
│   │       └── SectionHeader.tsx    # Page titles + continue banner
│   └── pages/
│       ├── HomePage.tsx        # Hero, paths, achievements, conversations
│       ├── PracticePage.tsx    # Canvas tracing (trace/write modes)
│       ├── FlashcardPage.tsx   # Alphabet or word flashcards
│       ├── MatchPage.tsx       # Study grid / flashcard mode
│       ├── QuizPage.tsx        # Alphabet Quiz + Word Quiz
│       ├── GunithaluPage.tsx   # Compound letter explorer
│       ├── ReviewPage.tsx      # SRS review queue
│       ├── SentencesPage.tsx   # Sentence browser by category
│       ├── DialoguesPage.tsx   # Conversation scenarios
│       ├── ProgressPage.tsx    # Stats + achievement grid
│       └── ProfilePage.tsx     # XP, streak, level, reset
├── dist/                       # Production build (auto-generated)
├── vite.config.ts              # Vite config: base=/language-learning/
├── package.json                # Dependencies + scripts
└── README.md                   # This file
```

---

## 🎯 Vocabulary Categories (per language)

| Category | Tamil | Hindi | Telugu |
|----------|-------|-------|--------|
| 🔤 Alphabets | ✅ | ✅ | ✅ |
| 👋 Greetings & Basics | ✅ | ✅ | ✅ |
| 🔢 Numbers 1–100 | ✅ | ✅ | ✅ |
| 🔢 Numbers 1K–100K | ✅ | ✅ | ✅ |
| 🔢 Lakhs & Crores | ✅ | ✅ | ✅ |
| 👨‍👩‍👧‍👦 Family Words | ✅ | ✅ | ✅ |
| 🍛 Food & Drinks | ✅ | ✅ | ✅ |
| 🎨 Colors | ✅ | ✅ | ✅ |
| 📅 Days & Time | ✅ | ✅ | ✅ |
| 💬 Common Phrases | ✅ | ✅ | ✅ |
| 🦴 Body Parts | ✅ | ✅ | ✅ |
| 🏠 Places & Travel | ✅ | ✅ | ✅ |
| 🌦️ Weather & Nature | ✅ | ✅ | ✅ |
| 🐦 Animals & Birds | ✅ | ✅ | ✅ |
| 👕 Clothing | ✅ | ✅ | ✅ |
| 💼 Occupations | ✅ | ✅ | ✅ |
| 😊 Emotions & Feelings | ✅ | ✅ | ✅ |
| 🏠 Household Items | ✅ | ✅ | ✅ |
| 💻 Technology & Communication | ✅ | ✅ | ✅ |
| ⏰ Time & Dates | ✅ | ✅ | ✅ |
| 🏃 Actions & Verbs | ✅ | ✅ | ✅ |

**Total words:** Tamil (549) · Hindi (537) · Telugu (476)

---

## 💬 Sentences & Dialogues

### Sentences
- 98 sentences per language across 16+ categories
- Each: native script, English, pronunciation, meaning
- Grouped by category with TTS playback per sentence

### Dialogues
- 5 conversation scenarios per language
- Scenarios: At the Market, Meeting a Friend, At the Restaurant, At the Doctor, Asking for Directions
- 4–6 alternating lines (Speaker A / Speaker B) with TTS playback

---

## 📦 Tech Stack

| Layer | Technology |
|------|------------|
| Language | TypeScript ~5.7 |
| Framework | React ^19 + Vite ^6 |
| Styling | Tailwind CSS ^4 (via `@tailwindcss/vite`) |
| Animations | Framer Motion ^12 |
| Icons | Lucide React ^0.474 |
| Routing | React Router DOM ^7 |
| State | Zustand ^5 + persist middleware |
| Backend | Firebase ^12 (ready for auth/cloud) |
| Speech | Web Speech API (TTS + STT) |
| Audio | Web Audio API (synthesized sounds) |
| Fonts | Noto Sans Tamil, Devanagari, Telugu |
| Storage | localStorage (progress, SRS, preferences) |

---

## 🔧 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev | `npm run dev` | Vite dev server on `localhost:5173` |
| Build | `npm run build` | Patch version → type-check → vite build |
| Patch | `npm run patch` | Bump patch version + generate build timestamp |
| Lint | `npm run lint` | ESLint |
| Preview | `npm run preview` | Vite preview server |
| Test | `npm run test` | Vitest |
| Deploy | `./scripts/deploy.sh` | Full build → nginx deploy → reload |

### Version Auto-Bumping
`npm run build` runs `npm run patch` first. `scripts/patch.js`:
1. Reads `package.json` version (e.g., `1.1.43`)
2. Bumps patch → `1.1.44`
3. Generates build timestamp → `20260508-1244`
4. Writes back to `package.json`
5. Writes `src/version.ts` with `APP_VERSION` and `APP_BUILD`

---

## 🌐 Adding a New Language

1. **Alphabet data** — `src/data/alphabets/<lang>.ts`
   ```typescript
   export const kannadaAlphabets: AlphabetData = {
     vowels: { name: 'Swar — Vowels', chars: [...] },
     consonants: { name: 'Vyanjan — Consonants', chars: [...] },
   }
   ```

2. **Lesson data** — `src/data/lessons/<lang>.ts`
   ```typescript
   export const kannadaLessons: LessonCategory[] = [
     { id: 1, category: 'Greetings', words: [...] },
   ]
   ```

3. **Register** — Add exports to `data/alphabets/index.ts` and `data/lessons/index.ts`

4. **Language config** — `src/i18n/languages.ts`
   ```typescript
   kannada: { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'ltr', flag: '🇮🇳', voiceLang: 'kn-IN' }
   ```

5. **Types** — Add `'kannada'` to `Language` union in `src/types/index.ts`

6. **Font** — Add Noto Sans import in `src/index.css`

---

## 🚀 Build & Deploy to Nginx

### Deploy Script (recommended)

```bash
cd /root/Projects/language-learning

# Full pipeline: build → deploy → reload → verify
./scripts/deploy.sh

# Build only
./scripts/deploy.sh --build

# Deploy existing dist only
./scripts/deploy.sh --copy

# Help
./scripts/deploy.sh --help
```

### Manual

```bash
cd /root/Projects/language-learning
npm run build
rm -rf /var/www/apps/language-learning/*
cp -r dist/* /var/www/apps/language-learning/
systemctl reload nginx
```

### Nginx Setup

Config: `/etc/nginx/sites-available/apps.conf`

```nginx
location ^~ /language-learning/ {
    alias /var/www/apps/language-learning/;
    index index.html;
    try_files $uri $uri/ /language-learning/index.html;
}
```

Features:
- **SPA fallback** — all routes → `index.html`
- **Gzip** — JS, CSS, fonts, SVG
- **Asset caching** — 1 year for hashed assets
- **No-cache HTML** — fresh on every request
- **Security headers** — X-Frame-Options, X-Content-Type-Options

---

## 📱 Routes

| Page | Path | From |
|------|------|------|
| Home | `/language-learning/` | Bottom nav |
| Practice | `/language-learning/practice` | Home path / bottom nav |
| Flashcard | `/language-learning/flashcard` | Home path / bottom nav |
| Study | `/language-learning/match` | Home path / bottom nav |
| Quiz | `/language-learning/quiz` | Home path / bottom nav |
| Gunithalu | `/language-learning/gunithalu` | Home path |
| Review | `/language-learning/review` | Bottom nav |
| Sentences | `/language-learning/sentences` | Home Conversations |
| Dialogues | `/language-learning/dialogues` | Home Conversations |
| Progress | `/language-learning/progress` | Bottom nav |
| Profile | `/language-learning/profile` | Bottom nav |

---

## 🎨 Color Palette (Dark Mode)

| Element | Color |
|--------|-------|
| Background | `#0f172a` (slate-900) |
| Card BG | `rgba(30,41,59,0.7)` |
| Primary | `#6366f1` (indigo-500) |
| Secondary | `#8b5cf6` (violet-500) |
| Accent | `#fbbf24` (amber-400) |
| Success | `#10b981` (emerald-500) |
| Error | `#ef4444` (red-500) |

---

## 🧠 Adaptive Learning

- Tracks wrong answers per letter in localStorage
- Items with 2+ wrong answers flagged as "weak"
- Quiz prioritizes weak items
- Session persistence — resume where you left off

---

## 📄 License

Private — built for language learning 🌊
